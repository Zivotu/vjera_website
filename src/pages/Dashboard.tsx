import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../hooks/use-toast';
import type { Article } from '../lib/types';

/**
 * Simple dashboard that requires a JWT token to view. It lists articles
 * from the backend and provides a logout button.
 */
const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [articles, setArticles] = React.useState<Article[]>([]);

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    fetch('http://localhost:4000/articles', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setArticles(data))
      .catch((err) => {
        console.error(err);
        toast({ title: 'Greška pri dohvaćanju članaka' });
      });
  }, [navigate, toast]);

  function handleLogout() {
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Nadzorna ploča</h1>
        <button
          onClick={handleLogout}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          Odjava
        </button>
      </div>
      <section>
        <h2 className="text-xl font-semibold mb-2">Članci</h2>
        {articles.length === 0 ? (
          <p>Nema dostupnih članaka.</p>
        ) : (
          <ul className="list-disc list-inside space-y-1">
            {articles.map((article) => (
              <li key={article.id}>{article.title}</li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
