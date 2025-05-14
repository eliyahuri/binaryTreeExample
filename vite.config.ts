import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
/**
 * Vite configuration for React application with Tailwind CSS plugin.
 */
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
