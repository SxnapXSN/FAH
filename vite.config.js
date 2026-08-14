import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/FAH/', // ต้องตรงกับชื่อ repo บน GitHub Pages เช่น https://SxnapXSN.github.io/FAH/
})
