/* eslint-disable react-hooks/exhaustive-deps */
// Las dependencias las pasa quien llama, como en useEffect. El linter no puede
// verificarlas desde acá, por eso se apaga esa regla en este archivo.
import { useCallback, useEffect, useState } from 'react'
import type { DependencyList } from 'react'

// Los tres estados de cualquier pedido a la API: cargando, error y datos.
export function useFetch<T>(fetcher: () => Promise<T>, deps: DependencyList) {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [version, setVersion] = useState(0) // subirlo = volver a pedir

  useEffect(() => {
    // Si las dependencias cambian antes de que llegue la respuesta,
    // esa respuesta ya no sirve: la descartamos.
    let ignore = false
    setLoading(true)
    setError(null)
    fetcher()
      .then((result) => {
        if (!ignore) setData(result)
      })
      .catch((e: Error) => {
        if (!ignore) setError(e.message)
      })
      .finally(() => {
        if (!ignore) setLoading(false)
      })
    return () => {
      ignore = true
    }
  }, [...deps, version])

  const reload = useCallback(() => setVersion((v) => v + 1), [])

  return { data, error, loading, reload }
}
