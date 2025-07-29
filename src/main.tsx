import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Create the root React node and render the application. This file is
// referenced in index.html and mirrors the entry point of a Vite React
// application.
const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);