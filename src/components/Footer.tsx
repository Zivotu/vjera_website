import React from "react";
import { Link } from "react-router-dom";

/**
 * A simple footer component inspired by the original project. It contains a
 * description of the portal, a few quick links and a copyright notice.
 * TailwindCSS classes are used for basic styling.
 */
const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-100 mt-12 py-8">
      <div className="max-w-6xl mx-auto px-4 grid gap-8 md:grid-cols-3">
        {/* About */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Vjera Hub</h3>
          <p className="text-sm text-gray-300">
            Vjera Hub je zajednica posvećena dijeljenju vijesti, analiza i
            duhovnih sadržaja za kršćane diljem Hrvatske. Ovdje možete
            pronaći članke, događaje i resurse koji pomažu da produbite
            svoju vjeru.
          </p>
        </div>
        {/* Quick links */}
        <div>
          <h4 className="text-lg font-semibold mb-2">Brze veze</h4>
          <ul className="space-y-1 text-sm">
            <li>
              <Link to="/vijesti" className="hover:underline">
                Vijesti
              </Link>
            </li>
            <li>
              <Link to="/analize" className="hover:underline">
                Analize
              </Link>
            </li>
            <li>
              <Link to="/duhovnost" className="hover:underline">
                Duhovnost
              </Link>
            </li>
            <li>
              <Link to="/kalendar" className="hover:underline">
                Kalendar događaja
              </Link>
            </li>
          </ul>
        </div>
        {/* Newsletter sign up - placeholder */}
        <div>
          <h4 className="text-lg font-semibold mb-2">Pretplatite se</h4>
          <p className="text-sm text-gray-300 mb-3">
            Primajte najnovije vijesti i članke izravno u vaš e‑mail sandučić.
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="vaš@email.com"
              className="flex-1 px-3 py-2 rounded-l bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-r text-white font-semibold"
            >
              Pretplati se
            </button>
          </form>
        </div>
      </div>
      <div className="mt-8 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Vjera Hub. Sva prava pridržana.
      </div>
    </footer>
  );
};

export default Footer;