import { render, screen } from '@testing-library/react';
import App from './App';
import { usePortfolio } from './hooks/usePortfolio';

jest.mock('./hooks/usePortfolio');

const emptyLists = {
  socialLinks: [],
  heroBadges: [],
  heroActions: [],
  stats: [],
  experiences: [],
  technologies: [],
  skills: [],
  projects: [],
  education: [],
  certifications: [],
  achievements: [],
  text: {},
};

test('renders content returned from the database', () => {
  usePortfolio.mockReturnValue({
    loading: false,
    error: null,
    reload: jest.fn(),
    data: {
      ...emptyLists,
      profile: { full_name: 'Test Person', headline: 'Test Headline', about: 'Hello **world**' },
      sections: [
        { slug: 'home', nav_label: 'Home', show_in_nav: true },
        { slug: 'about', nav_label: 'About', title: 'About Me', show_in_nav: true },
      ],
      projects: [{ id: 1, title: 'Project X', tags: [{ name: 'SQL', color: 'blue' }] }],
    },
  });

  render(<App />);
  expect(screen.getAllByText('Test Person').length).toBeGreaterThan(0);
  expect(screen.getByText('About Me')).toBeInTheDocument();
  expect(screen.getByText('world')).toBeInTheDocument();
});

test('shows an error screen when loading fails', () => {
  usePortfolio.mockReturnValue({ loading: false, error: new Error('boom'), data: null, reload: jest.fn() });
  render(<App />);
  expect(screen.getByText('Unable to load portfolio')).toBeInTheDocument();
});
