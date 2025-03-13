/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",  
    "./src/**/*.{js,ts,jsx,tsx}" // ✅ Ensure it scans all subfolders and file types
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
