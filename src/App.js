import './App.css';
import { Fragment, useEffect, useMemo } from 'react';
import { usePortfolio } from './hooks/usePortfolio';
import Backdrop from './components/Backdrop';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { ErrorScreen, LoadingScreen } from './components/StatusScreen';
import { applyTheme, previewThemeKey } from './themes/applyTheme';
import { ThemeProvider } from './themes/ThemeContext';
import { getTheme } from './themes/registry';

// Section slugs from the `sections` table mapped to the component that renders them.
// Order and visibility come from the database. `h` holds the heading props (slug, title, eyebrow, index).
const SECTION_COMPONENTS = {
  home: (d, h) => <Hero slug={h.slug} data={d} />,
  about: (d, h) => <About {...h} profile={d.profile} stats={d.stats} />,
  experience: (d, h) => <Experience {...h} experiences={d.experiences} text={d.text} />,
  skills: (d, h) => <Skills {...h} technologies={d.technologies} skills={d.skills} text={d.text} />,
  projects: (d, h) => <Projects {...h} projects={d.projects} />,
  education: (d, h) => (
    <Education {...h} education={d.education} certifications={d.certifications} achievements={d.achievements} text={d.text} />
  ),
  contact: (d, h) => <Contact {...h} profile={d.profile} socialLinks={d.socialLinks} text={d.text} />,
};

function App() {
  const { data, error, loading, reload } = usePortfolio();

  // Active theme: ?theme=<key> preview wins, then the theme chosen in the admin app
  const themeKey = previewThemeKey() ?? data?.theme;
  const theme = useMemo(() => getTheme(themeKey), [themeKey]);

  useEffect(() => {
    if (data?.profile?.meta_title) document.title = data.profile.meta_title;
  }, [data]);

  useEffect(() => {
    if (data) applyTheme(theme.key);
  }, [data, theme]);

  if (loading) return <LoadingScreen />;
  if (error || !data?.profile) {
    return <ErrorScreen error={error || new Error('No profile found in the database.')} onRetry={reload} />;
  }

  // Sections with a heading get a running "01 / About" style index
  let counter = 0;

  return (
    <ThemeProvider value={theme}>
      {/* isolate: keeps the -z-10 backdrop above the body background */}
      <div className="relative isolate min-h-screen text-fg-300">
        <Backdrop />
        <Navbar profile={data.profile} sections={data.sections} />

        <main>
          {data.sections.map((section) => {
            const render = SECTION_COMPONENTS[section.slug];
            if (!render) return null;
            const heading = {
              slug: section.slug,
              title: section.title,
              eyebrow: section.nav_label,
              index: section.title ? String(++counter).padStart(2, '0') : undefined,
            };
            return <Fragment key={section.slug}>{render(data, heading)}</Fragment>;
          })}
        </main>

        <Footer profile={data.profile} socialLinks={data.socialLinks} />
      </div>
    </ThemeProvider>
  );
}

export default App;
