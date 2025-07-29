import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import { ToastProvider } from './hooks/use-toast';

/**
 * The root component for the application. It sets up routing, the site
 * layout (header, footer and main content area) and provides a toast
 * context. External dependencies like React Query and shadcn UI toasters
 * from the original project have been removed for simplicity.
 */
const App: React.FC = () => {
  return (
    <ToastProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/index" element={<Index />} />
              {/* add more routes here as you build additional pages */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </ToastProvider>
  );
};

export default App;