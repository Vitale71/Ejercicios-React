import { createContext, useState, useRef, useEffect } from 'react'
import type { ReactNode } from 'react'

interface ToastContextType {
  message: string | null
  showSuccess: (msg: string) => void
}

export const ToastContext = createContext<ToastContextType | null>(null)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string | null>(null)
  const timeoutRef = useRef<number | null>(null)

  function showSuccess(msg: string) {
    setMessage(msg)

    // Si ya había un timeout corriendo, lo limpiamos
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Creamos el nuevo timeout de 3 segundos (3000 ms)
    timeoutRef.current = window.setTimeout(() => {
      setMessage(null)
    }, 3000)
  }

  // Limpieza por si el componente se desmonta (buena práctica)
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <ToastContext.Provider value={{ message, showSuccess }}>
      {children}
    </ToastContext.Provider>
  )
}