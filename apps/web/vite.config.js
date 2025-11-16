import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist"
  },
  server: {
    proxy: {
      // encaminha chamadas /api para a API local na porta 3000
      "/api": {
        "target": "http://localhost:3000",
        "changeOrigin": true,
        "secure": false
      }
    }
  }
})
