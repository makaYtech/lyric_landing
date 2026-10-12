/**
 * Возвращает корректный URL для файла из папки public/.
 * Учитывает base из vite.config.ts (нужно для GitHub Pages).
 */
export function asset(path: string): string {
  const clean = path.replace(/^\//, '')
  return `${import.meta.env.BASE_URL}${clean}`
}