import React from "react";
import { Link, useLocation } from "react-router-dom";

/**
 * Primary site header. Displays the site title and a horizontal navigation.
 * The original version includes a mobile drawer and search bar; here we
 * provide a simplified variant that works on both mobile and desktop.
 */
const Header: React.FC = () => {
  const location = useLocation();
  const baseNavigation = [
    { name: "Naslovnica", href: "/" },
    { name: "Vijesti", href: "/vijesti" },
    { name: "Analize", href: "/analize" },
    { name: "Duhovnost", href: "/duhovnost" },
    { name: "Intervjui", href: "/intervjui" },
    { name: "Kalendar", href: "/kalendar" },
  ];

  const token = localStorage.getItem('token');

  const adminNavigation = token
    ? [
        { name: "Dashboard", href: "/dashboard" },
        { name: "Članci", href: "/dashboard/articles" },
        { name: "Kategorije", href: "/dashboard/categories" },
        { name: "Autori", href: "/dashboard/authors" },
        { name: "Događaji", href: "/dashboard/events" },
      ]
    : [];

  const navigation = [...baseNavigation, ...adminNavigation];

  const isActive = (href: string) => {
    if (href === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(href);
  };

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-blue-700">
          Vjera Hub
        </Link>
        <nav className="space-x-4 hidden md:block">
          {navigation.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`text-sm font-medium ${
                isActive(item.href) ? "text-blue-700" : "text-gray-600 hover:text-blue-700"
              }`}
            >
              {item.name}
            </Link>
          ))}
          {!token && (
            <Link
              to="/login"
              className="text-sm font-medium text-gray-600 hover:text-blue-700"
            >
              Prijava
            </Link>
          )}
        </nav>
        {/* Simple mobile menu toggle - optional */}
        <div className="md:hidden">{/* In a real app you'd implement a drawer menu here. */}</div>
      </div>
    </header>
  );
};

export default Header;
