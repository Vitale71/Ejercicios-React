const API_URL = import.meta.env.VITE_API_URL

// Un error con el código HTTP: cada pantalla decide qué hacer (401, 403...).
export class ApiError extends Error {
  status: number
  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE'
  body?: unknown
}

// Qué hacer cuando el token deja de servir. Lo define AuthContext (paso 9).
let onUnauthorized = () => {}

export function setUnauthorizedHandler(handler: () => void) {
  onUnauthorized = handler
}

// Saca un mensaje legible del cuerpo de error de FastAPI.
function readDetail(text: string, status: number): string {
  try {
    const { detail } = JSON.parse(text)
    // HTTPException: {"detail": "User/password incorrect"}
    if (typeof detail === 'string') return detail
    // 422 de validación: {"detail": [{"loc": ["body", "age"], "msg": "..."}]}
    if (Array.isArray(detail)) {
      return detail.map((e) => `${e.loc.at(-1)}: ${e.msg}`).join(' · ')
    }
  } catch {
    // La respuesta no era JSON: por ejemplo "Internal Server Error".
  }
  return text || `Error ${status}`
}

export async function apiFetch<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const token = localStorage.getItem('token')
  const headers: Record<string, string> = {}
  if (options.body !== undefined) headers['Content-Type'] = 'application/json'
  if (token) headers.Authorization = `Bearer ${token}`

  let response: Response
  try {
    response = await fetch(`${API_URL}${path}`, {
      method: options.method ?? 'GET',
      headers,
      body: options.body === undefined
        ? undefined
        : JSON.stringify(options.body),
    })
  } catch {
    // fetch solo falla si no hubo respuesta: la API está apagada, o respondió
    // un 500 sin headers CORS y el navegador no deja leerlo.
    throw new ApiError(0, 'No se pudo conectar con la API. Miren la consola.')
  }

  const text = await response.text()
  if (!response.ok) {
    // Con token, un 401 es una sesión vencida. Sin token, es un login fallido.
    if (response.status === 401 && token) onUnauthorized()
    throw new ApiError(response.status, readDetail(text, response.status))
  }
  return JSON.parse(text) as T
}
