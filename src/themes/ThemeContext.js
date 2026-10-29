import { createContext, useContext } from 'react';
import { DEFAULT_THEME_KEY, getTheme } from './registry';

const ThemeContext = createContext(getTheme(DEFAULT_THEME_KEY));

export const ThemeProvider = ThemeContext.Provider;

export function useTheme() {
  return useContext(ThemeContext);
}

// Class for a section that should render in a different color scheme than the page (Split Light + Dark)
export function useSectionScheme(slug) {
  const theme = useTheme();
  const scheme = theme.sectionSchemes[slug];
  return scheme ? `scheme-${scheme}` : '';
}
