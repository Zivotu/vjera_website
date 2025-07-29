import * as React from "react";

/**
 * Very simple toast implementation. In the original repository this file
 * manages toast notifications with actions, timeouts and reducers. For the
 * purposes of this exercise we implement a minimal API that allows
 * components to enqueue toast messages. Consumers can display them using
 * the returned `toasts` array.
 */
export interface Toast {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  timeout?: number;
}

const ToastContext = React.createContext<{
  toasts: Toast[];
  toast: (toast: Omit<Toast, "id">) => { id: string };
  dismiss: (id: string) => void;
}>({
  toasts: [],
  toast: () => ({ id: "" }),
  dismiss: () => {},
});

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  const toast = React.useCallback((opts: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, ...opts }]);
    if (opts.timeout && opts.timeout > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, opts.timeout);
    }
    return { id };
  }, []);

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
    </ToastContext.Provider>
  );
};

/**
 * Hook for accessing the toast context. Components can call
 * `toast({ title, description })` to enqueue a message and should render
 * the current toasts somewhere in the UI.
 */
export function useToast() {
  return React.useContext(ToastContext);
}