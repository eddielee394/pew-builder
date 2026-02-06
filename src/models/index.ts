/**
 * Model registry - resolves model paths to URLs.
 * Uses Vite's import.meta.glob to bundle models from src/models.
 * Add new models by placing .glb files in guns/ or the root models/ folder.
 */

const modelModules = import.meta.glob<{ default: string }>('./**/*.glb', { query: '?url', eager: true })

/**
 * Get the resolved URL for a model file.
 * @param path - Relative path from src/models/ (e.g. "guns/cz_scorpion_evo_3_s1.glb")
 * @returns Resolved URL or empty string if not found
 */
export function getModelUrl(path: string): string {
  if (!path) return ''
  const key = `./${path}`.replace(/\/+/g, '/')
  const mod = modelModules[key]
  return mod?.default ?? ''
}
