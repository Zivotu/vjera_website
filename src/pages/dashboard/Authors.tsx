import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../hooks/use-toast';
import type { Author } from '../../lib/types';

const emptyAuthor: Partial<Author> = { name: '', slug: '', bio: '' };

const Authors: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [authors, setAuthors] = React.useState<Author[]>([]);
  const [form, setForm] = React.useState<Partial<Author>>(emptyAuthor);
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
    fetch('http://localhost:4000/authors', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setAuthors)
      .catch(() => toast({ title: 'Greška pri dohvaćanju autora' }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const method = editing ? 'PUT' : 'POST';
    const url = editing
      ? `http://localhost:4000/authors/${editing}`
      : 'http://localhost:4000/authors';
    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: form.name, slug: form.slug, bio: form.bio }),
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(() => {
        toast({ title: 'Spremljeno' });
        setForm(emptyAuthor);
        setEditing(null);
        load();
      })
      .catch(() => toast({ title: 'Greška pri spremanju' }));
  }

  function handleEdit(a: Author) {
    setEditing(Number(a.id));
    setForm(a);
  }

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-semibold">Autori</h1>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          className="border px-2 py-1 rounded w-full"
          placeholder="Ime"
          value={form.name ?? ''}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="border px-2 py-1 rounded w-full"
          placeholder="Slug"
          value={form.slug ?? ''}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
        />
        <textarea
          className="border px-2 py-1 rounded w-full"
          placeholder="Bio"
          value={form.bio ?? ''}
          onChange={(e) => setForm({ ...form, bio: e.target.value })}
        />
        <button type="submit" className="px-3 py-1 bg-blue-600 text-white rounded">
          Spremi
        </button>
        {editing && (
          <button
            type="button"
            onClick={() => {
              setForm(emptyAuthor);
              setEditing(null);
            }}
            className="px-3 py-1 bg-gray-300 ml-2 rounded"
          >
            Odustani
          </button>
        )}
      </form>
      <ul className="list-disc list-inside space-y-1">
        {authors.map((a) => (
          <li key={a.id}>
            {a.name}{' '}
            <button className="text-blue-600 ml-2" onClick={() => handleEdit(a)}>
              Uredi
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Authors;
