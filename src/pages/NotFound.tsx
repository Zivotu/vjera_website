import React from "react";
import { useLocation, Link } from "react-router-dom";

/**
 * A 404 page that informs users that they have navigated to a non‑existent
 * route. It logs the invalid path in the console to aid debugging and
 * provides a link back to the home page.
 */
const NotFound: React.FC = () => {
  const location = useLocation();

  React.useEffect(() => {
    console.error(
      "404 Error: User attempted to access a non‑existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center space-y-4 px-4">
        <h1 className="text-5xl font-bold text-red-600">404</h1>
        <p className="text-xl text-gray-700">Stranica nije pronađena</p>
        <p className="text-gray-500">
          Oprosti, izgleda da tražena adresa <code className="px-1 bg-gray-200 rounded">{location.pathname}</code> ne postoji.
        </p>
        <Link to="/" className="text-blue-600 hover:underline">
          Vrati se na početnu stranicu
        </Link>
      </div>
    </div>
  );
};

export default NotFound;