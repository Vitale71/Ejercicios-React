# Frontend React - UTN Programación 4 (2026)

Interfaz en React para la API de `clase-1-sqlmodel`, del repo `utn-tup-2026-python`.
La guía paso a paso está en [`docs/guia-react-frontend.pdf`](docs/guia-react-frontend.pdf).
Su fuente en Markdown está en ese repo, en `clase-1-sqlmodel/docs/guia-react-frontend.md`.

## Cómo correrlo

Primero levanten la API en `http://localhost:8000`. Después:

```bash
npm install
npm run dev
```

Abran <http://localhost:5174>. El puerto tiene que coincidir con `allow_origins` en el
`main.py` de la API. La URL de la API está en `.env.development`.

Usuarios de prueba, ambos con contraseña `123`: `mgomez@email.com` (ADMIN) y
`sfer@email.com` (REGULAR).
