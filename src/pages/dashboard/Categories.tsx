import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../hooks/use-toast';
import type { Category } from '../../lib/types';

const emptyCategory: Partial<Category> = { name: '', slug: '', color: '' };

const Categories: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [form, setForm] = React.useState<Partial<Category>>(emptyCategory);
  const [editing, setEditing] = React.useState<number | null>(null);

  const token = localStorage.getItem('token');

  React.useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    load();
  }, [token, navigate]);

  function load() {
    fetch('http://localhost:4000/categories', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setCategories)
      .catch(() => toast({ title: 'Greška pri dohvaćanju kategorija' }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const method = editing ? 'PUT' : 'POST';
    const url = editing
      ? `http://localhost:4000/categories/${editing}`
      : 'http://localhost:4000/categories';
    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: form.name, slug: form.slug, color: form.color }),
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(() => {
        toast({ title: 'Spremljeno' });
        setForm(emptyCategory);
        setEditing(null);
        load();
      })
      .catch(() => toast({ title: 'Greška pri spremanju' }));
  }

  function handleEdit(cat: Category) {
    setEditing(Number(cat.id));
    setForm(cat);
  }

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-semibold">Kategorije</h1>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          className="border px-2 py-1 rounded w-full"
          placeholder="Naziv"
          value={form.name ?? ''}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="border px-2 py-1 rounded w-full"
          placeholder="Slug"
          value={form.slug ?? ''}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
        />
        <input
          className="border px-2 py-1 rounded w-full"
          placeholder="Boja"
          value={form.color ?? ''}
          onChange={(e) => setForm({ ...form, color: e.target.value })}
        />
        <button type="submit" className="px-3 py-1 bg-blue-600 text-white rounded">
          Spremi
        </button>
        {editing && (
          <button
            type="button"
            onClick={() => {
              setForm(emptyCategory);
              setEditing(null);
            }}
            className="px-3 py-1 bg-gray-300 ml-2 rounded"
          >
            Odustani
          </button>
        )}
      </form>
      <ul className="list-disc list-inside space-y-1">
        {categories.map((c) => (
          <li key={c.id}>
            {c.name}{' '}
            <button className="text-blue-600 ml-2" onClick={() => handleEdit(c)}>
              Uredi
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
