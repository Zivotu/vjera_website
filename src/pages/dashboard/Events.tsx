import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../hooks/use-toast';
import type { Event } from '../../lib/types';

const emptyEvent: Partial<Event> = { title: '', slug: '' };

const Events: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [events, setEvents] = React.useState<Event[]>([]);
  const [form, setForm] = React.useState<Partial<Event>>(emptyEvent);
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
    fetch('http://localhost:4000/events', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setEvents)
      .catch(() => toast({ title: 'Greška pri dohvaćanju događaja' }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const method = editing ? 'PUT' : 'POST';
    const url = editing
      ? `http://localhost:4000/events/${editing}`
      : 'http://localhost:4000/events';
      const payload = {
        title: form.title,
        slug: form.slug,
        description: (form as any).description || '',
        city: (form as any).city || '',
        country: (form as any).country || '',
      denomination: (form as any).denomination || 'katolicko',
      startsAt: (form as any).startsAt || new Date().toISOString(),
      endsAt: (form as any).endsAt || new Date().toISOString(),
      heroImage: (form as any).heroImage || {},
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
        setForm(emptyEvent);
        setEditing(null);
        load();
      })
      .catch(() => toast({ title: 'Greška pri spremanju' }));
  }

  function handleEdit(ev: Event) {
    setEditing(Number(ev.id));
    setForm(ev);
  }

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-semibold">Događaji</h1>
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
              setForm(emptyEvent);
              setEditing(null);
            }}
            className="px-3 py-1 bg-gray-300 ml-2 rounded"
          >
            Odustani
          </button>
        )}
      </form>
      <ul className="list-disc list-inside space-y-1">
        {events.map((ev) => (
          <li key={ev.id}>
            {ev.title}{' '}
            <button className="text-blue-600 ml-2" onClick={() => handleEdit(ev)}>
              Uredi
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Events;
