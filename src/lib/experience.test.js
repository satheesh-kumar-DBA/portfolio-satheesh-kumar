import { experienceTokens, formatPeriod, resolveExperience, totalExperienceMonths } from './experience';

const today = new Date(2026, 9, 24); // 24 Oct 2026

test('counts months from start date to today for a current job', () => {
  expect(totalExperienceMonths([{ start_date: '2025-07-01', end_date: null }], today)).toBe(15);
});

test('merges overlapping jobs instead of double counting', () => {
  const jobs = [
    { start_date: '2024-01-01', end_date: '2024-12-31' },
    { start_date: '2024-06-01', end_date: '2025-03-01' },
  ];
  expect(totalExperienceMonths(jobs, today)).toBe(14);
});

test('formats as years once past 12 months, months before that', () => {
  expect(experienceTokens([{ start_date: '2025-07-01' }], today)['{experience}']).toBe('1+ Year');
  expect(experienceTokens([{ start_date: '2024-01-01' }], today)['{experience}']).toBe('2+ Years');
  expect(experienceTokens([{ start_date: '2026-02-01' }], today)['{experience}']).toBe('8+ Months');
});

test('formats a period from dates', () => {
  expect(formatPeriod('2025-07-01', null)).toBe('July 2025 - Present');
  expect(formatPeriod('2023-01-01', '2024-03-01')).toBe('January 2023 - March 2024');
});

test('replaces placeholders throughout the content and fills missing periods', () => {
  const data = {
    experiences: [{ start_date: '2025-07-01', end_date: null, period: null }],
    heroBadges: [{ label: '{experience} Experience' }],
    stats: [{ value: '{experience_value}', label: '{experience_unit}', sublabel: 'Experience' }],
    profile: { footer_text: '© {year} {name}' },
  };
  const out = resolveExperience(data, today);
  expect(out.heroBadges[0].label).toBe('1+ Year Experience');
  expect(out.stats[0]).toMatchObject({ value: '1+', label: 'Year' });
  expect(out.experiences[0].period).toBe('July 2025 - Present');
  expect(out.profile.footer_text).toBe('© {year} {name}');
});
