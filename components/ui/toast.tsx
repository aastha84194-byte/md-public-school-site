"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((message: string, type: ToastType = "info") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev: Toast[]) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev: Toast[]) => prev.filter((t: Toast) => t.id !== id));
    }, 5000);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev: Toast[]) => prev.filter((t: Toast) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`
                pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl border min-w-[300px] max-w-md
                ${t.type === "success" ? "bg-white border-green-100 text-green-800" : ""}
                ${t.type === "error" ? "bg-white border-red-100 text-red-800" : ""}
                ${t.type === "info" ? "bg-white border-sky-100 text-sky-800" : ""}
              `}
            >
              {t.type === "success" && <CheckCircle className="h-5 w-5 text-green-500" />}
              {t.type === "error" && <AlertCircle className="h-5 w-5 text-red-500" />}
              {t.type === "info" && <Info className="h-5 w-5 text-sky-500" />}
              
              <p className="text-sm font-medium flex-1">{t.message}</p>
              
              <button 
                onClick={() => removeToast(t.id)}
                className="hover:bg-zinc-100 p-1 rounded-md transition-colors"
              >
                <X className="h-4 w-4 text-zinc-400" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
