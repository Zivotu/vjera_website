import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '../hooks/use-toast';

/**
 * Simple admin landing page. It ensures the user is authenticated and
 * provides navigation links to manage all resources.
 */
const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  React.useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }


  function handleLogout() {
    localStorage.removeItem('token');
    toast({ title: 'Odjavljeni ste' });
    navigate('/login');
  }

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Nadzorna ploča</h1>
        <button
          onClick={handleLogout}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          Odjava
        </button>
      </div>
      <nav className="space-x-4">
        <Link className="text-blue-600 underline" to="/dashboard/articles">
          Članci
        </Link>
        <Link className="text-blue-600 underline" to="/dashboard/categories">
          Kategorije
        </Link>
        <Link className="text-blue-600 underline" to="/dashboard/authors">
          Autori
        </Link>
        <Link className="text-blue-600 underline" to="/dashboard/events">
          Događaji
        </Link>
      </nav>
      <p className="text-gray-700">Odaberite sekciju za uređivanje podataka.</p>
    </div>
  );
};

export default Dashboard;
