/**
 * Site-wide appearance defaults.
 * Users can override at runtime via the theme switcher — these values
 * are used server-side (html attributes) and as the localStorage fallback.
 */

/** Color theme. One of: 'ocean' | 'aurora' | 'ember' | 'forest' | 'rose' */
export const defaultTheme = 'ocean' as const;

/** Color mode. 'light' | 'dark' */
export const defaultMode = 'light' as const;

export const themes = [
  { id: 'ocean',  label: 'Ocean',  color: '#22d3ee' },
  { id: 'aurora', label: 'Aurora', color: '#a78bfa' },
  { id: 'ember',  label: 'Ember',  color: '#fbbf24' },
  { id: 'forest', label: 'Forest', color: '#34d399' },
  { id: 'rose',   label: 'Rose',   color: '#fb7185' },
] as const;

export type ThemeId = typeof themes[number]['id'];
export type ModeId = 'light' | 'dark';
