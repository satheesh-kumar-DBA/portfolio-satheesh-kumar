-- Experience length is calculated from job dates instead of being typed in several places.
-- The website replaces these placeholders anywhere in the content:
--   {experience}        e.g. "1+ Years" / "8+ Months"
--   {experience_value}  e.g. "1+"
--   {experience_unit}   e.g. "Years" / "Months"
-- A job's period text is generated from its dates when `period` is empty.

alter table public.experiences add column if not exists start_date date;
alter table public.experiences add column if not exists end_date date;   -- null = current job

alter table public.experiences drop constraint if exists experiences_dates_check;
alter table public.experiences add constraint experiences_dates_check
  check (end_date is null or start_date is null or end_date >= start_date);

-- Current job: July 2025 to present; let the period text be generated from the dates
update public.experiences
   set start_date = date '2025-07-01', end_date = null, period = null
 where role = 'Junior Database Administrator' and company = 'TBS Technologies Private Limited';

-- Use the calculated length in the hero badge and the About stat
update public.hero_badges set label = '{experience} Experience'
 where label ~* '^\s*\d+\+?\s*(months?|years?)\s+experience\s*$';

update public.stats set value = '{experience_value}', label = '{experience_unit}'
 where sublabel ilike 'experience' and value ~ '^\s*\d+\+?\s*$';
