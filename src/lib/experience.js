// Experience length is calculated from the job dates in the `experiences` table and substituted
// into the content wherever these placeholders appear:
//   {experience}        "1+ Years" / "8+ Months"
//   {experience_value}  "1+" / "8+"
//   {experience_unit}   "Years" / "Months" (singular when the value is 1)

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const parseDate = (d) => {
  if (!d) return null;
  const [y, m, day] = d.split('-').map(Number);
  return new Date(y, m - 1, day || 1);
};

const monthsBetween = (a, b) => (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth()) - (b.getDate() < a.getDate() ? 1 : 0);

// Total months worked, merging overlapping jobs so parallel roles are not double counted
export function totalExperienceMonths(experiences, today = new Date()) {
  const ranges = experiences
    .map((e) => ({ start: parseDate(e.start_date), end: parseDate(e.end_date) ?? today }))
    .filter((r) => r.start && r.end >= r.start)
    .sort((a, b) => a.start - b.start);

  const merged = [];
  for (const r of ranges) {
    const last = merged[merged.length - 1];
    if (last && r.start <= last.end) {
      if (r.end > last.end) last.end = r.end;
    } else {
      merged.push({ ...r });
    }
  }
  return merged.reduce((sum, r) => sum + Math.max(monthsBetween(r.start, r.end), 0), 0);
}

export function experienceTokens(experiences, today) {
  const months = totalExperienceMonths(experiences, today);
  const years = Math.floor(months / 12);
  const [n, unit] = years >= 1 ? [years, years === 1 ? 'Year' : 'Years'] : [Math.max(months, 1), months <= 1 ? 'Month' : 'Months'];
  const value = `${n}+`;
  return {
    '{experience}': `${value} ${unit}`,
    '{experience_value}': value,
    '{experience_unit}': unit,
  };
}

// "July 2025 - Present" style period from a job's dates
export function formatPeriod(start, end) {
  const s = parseDate(start);
  if (!s) return null;
  const e = parseDate(end);
  const fmt = (d) => `${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
  return `${fmt(s)} - ${e ? fmt(e) : 'Present'}`;
}

// Replaces the placeholders in every string of the portfolio content and fills in job periods
export function resolveExperience(data, today = new Date()) {
  const tokens = experienceTokens(data.experiences || [], today);
  const pattern = /\{experience(?:_value|_unit)?\}/g;

  const walk = (v) => {
    if (typeof v === 'string') return v.includes('{experience') ? v.replace(pattern, (m) => tokens[m]) : v;
    if (Array.isArray(v)) return v.map(walk);
    if (v && typeof v === 'object') return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, walk(x)]));
    return v;
  };

  const resolved = walk(data);
  resolved.experiences = (resolved.experiences || []).map((e) => ({
    ...e,
    period: e.period || formatPeriod(e.start_date, e.end_date),
  }));
  return resolved;
}
