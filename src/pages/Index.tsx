import React from "react";

/**
 * A simple landing page that appears at the root of the app. In the
 * original project this file is deliberately left simple as a fallback
 * when you forget to implement a home page. We keep it here so that
 * visiting `/` still renders something reasonable while you build out
 * the rest of the site.
 */
const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center space-y-4 px-4">
        <h1 className="text-4xl font-bold">Dobrodošli u Vjera Hub</h1>
        <p className="text-lg text-gray-600">
          Počnite graditi svoju aplikaciju prilagođenu vašoj zajednici.
        </p>
        <p className="text-sm text-gray-500">
          Ova početna stranica je samo privremena. Zamijenite je komponentom
          <code className="mx-1 px-1 bg-gray-200 rounded">HomePage</code> kada budete spremni.
        </p>
      </div>
    </div>
  );
};

export default Index;