import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../hooks/use-toast';

/**
 * Login form that posts credentials to `/auth/login`. On success the
 * returned JWT token is stored in `localStorage` and the user is
 * redirected to the dashboard.
 */
const Login: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        toast({ title: 'Neuspjela prijava' });
        return;
      }
      const data = await res.json();
      localStorage.setItem('token', data.token);
      toast({ title: 'Prijavljeni ste' });
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      toast({ title: 'Greška pri spajanju na server' });
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded shadow w-80"
      >
        <h1 className="text-xl font-semibold text-center">Prijava</h1>
        <div className="flex flex-col space-y-1">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border px-3 py-2 rounded"
            required
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="password" className="text-sm font-medium">
            Lozinka
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border px-3 py-2 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Prijavi se
        </button>
      </form>
    </div>
  );
};

export default Login;
