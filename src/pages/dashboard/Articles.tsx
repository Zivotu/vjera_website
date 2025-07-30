import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../hooks/use-toast';
import type { Article } from '../../lib/types';

const emptyArticle: Partial<Article> = { title: '', slug: '' };

const Articles: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [articles, setArticles] = React.useState<Article[]>([]);
  const [form, setForm] = React.useState<Partial<Article>>(emptyArticle);
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
    fetch('http://localhost:4000/articles', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setArticles)
      .catch(() => toast({ title: 'Greška pri dohvaćanju članaka' }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const method = editing ? 'PUT' : 'POST';
    const url = editing
      ? `http://localhost:4000/articles/${editing}`
      : 'http://localhost:4000/articles';
    const payload = {
      slug: form.slug,
      title: form.title,
      summary: (form as any).summary || '',
      content: (form as any).content || '',
      status: (form as any).status || 'draft',
      type: (form as any).type || 'vijest',
      denomination: (form as any).denomination || 'katolicko',
      authorId: (form as any).authorId || 1,
      categoryId: (form as any).categoryId || 1,
      tags: (form as any).tags || [],
      sourceName: (form as any).sourceName || '',
      sourceUrl: (form as any).sourceUrl || '',
      publishedAt: (form as any).publishedAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      heroImage: (form as any).heroImage || {},
      featured: (form as any).featured || false,
      readingTime: (form as any).readingTime || 0,
      views: (form as any).views || 0,
    };
    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(() => {
        toast({ title: 'Spremljeno' });
        setForm(emptyArticle);
        setEditing(null);
        load();
      })
      .catch(() => toast({ title: 'Greška pri spremanju' }));
  }

  function handleEdit(a: Article) {
    setEditing(Number(a.id));
    setForm(a);
  }

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-semibold">Članci</h1>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          className="border px-2 py-1 rounded w-full"
          placeholder="Naslov"
          value={form.title ?? ''}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          className="border px-2 py-1 rounded w-full"
          placeholder="Slug"
          value={form.slug ?? ''}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
        />
        <button type="submit" className="px-3 py-1 bg-blue-600 text-white rounded">
          Spremi
        </button>
        {editing && (
          <button
            type="button"
            onClick={() => {
              setForm(emptyArticle);
              setEditing(null);
            }}
            className="px-3 py-1 bg-gray-300 ml-2 rounded"
          >
            Odustani
          </button>
        )}
      </form>
      <ul className="list-disc list-inside space-y-1">
        {articles.map((a) => (
          <li key={a.id}>
            {a.title}{' '}
            <button className="text-blue-600 ml-2" onClick={() => handleEdit(a)}>
              Uredi
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Articles;
