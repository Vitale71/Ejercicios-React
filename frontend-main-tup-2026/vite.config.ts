import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  server: {
    // Tiene que coincidir con allow_origins en main.py.
    port: 5174,
    strictPort: true,
  },
})
