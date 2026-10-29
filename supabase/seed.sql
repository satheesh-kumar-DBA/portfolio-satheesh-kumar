-- Seed content for the portfolio (run after all migrations). Safe to re-run: it clears and reloads every table.
-- Asset URLs point at the public "portfolio" Storage bucket.

begin;

truncate public.profile, public.sections, public.site_text, public.social_links, public.hero_badges,
         public.hero_actions, public.stats, public.experiences, public.technologies, public.skills,
         public.projects, public.education, public.certifications, public.achievements
         restart identity;

-- ---------------------------------------------------------------------------
-- Profile
-- ---------------------------------------------------------------------------
insert into public.profile (full_name, headline, greeting, avatar_url, avatar_position, resume_url, email, location, about, contact_message, footer_text, meta_title)
values (
  'Satheesh Kumar K',
  'Database Administrator',
  'Hi, I''m',
  'https://zkawjbnijhfmlebuawga.supabase.co/storage/v1/object/public/portfolio/profile.jpg',
  '50% 20%',
  'https://zkawjbnijhfmlebuawga.supabase.co/storage/v1/object/public/portfolio/resume.pdf',
  'satheeshkumar2k4@gmail.com',
  'Tiruppur, Tamil Nadu, India',
$t$I'm a passionate Database Administrator specializing in **PostgreSQL and MySQL** with expertise in building efficient, secure, and scalable database systems. My focus is on ensuring reliability and optimizing performance through comprehensive database administration, advanced performance tuning techniques including **query optimization, indexing strategies, and EXPLAIN analysis**, along with robust backup automation solutions.

I excel in **monitoring and troubleshooting** database performance using tools like pg_stat_statements and custom logging mechanisms. My expertise extends to implementing **comprehensive backup and recovery strategies** including pg_dump, pg_basebackup, Point-in-Time Recovery (PITR), and WAL archiving, coupled with both logical and physical replication setups. I'm proficient in **security and auditing** through pgAudit implementation, audit logging, and access control management to ensure compliance with security standards.

Additionally, I bring strong **automation and scripting capabilities** using pgAgent for job scheduling and batch scripting for automated workflows. My skillset includes **data visualization and reporting** through Power BI dashboard design, DAX measures, and data modeling to transform complex database insights into actionable business intelligence. I also possess solid **database development** experience in schema design, stored procedures, functions, and SQL development to create efficient and maintainable database architectures.

Currently working as **Junior Database Administrator** at **TBS Technologies Private Limited**, where I apply my skills in real-world production environments, managing development, testing, and production databases while collaborating with development and DevOps teams to deliver optimal database solutions.

Graduated with B.E. in Computer Science and Engineering with a CGPA of 8.2, I combine strong academic foundation with hands-on industry experience to deliver robust, high-performance database solutions that ensure data integrity, business continuity, and operational efficiency.$t$,
  'I''m always open to discussing new opportunities, exciting projects, and database challenges!',
  '© {year} {name}. All rights reserved.',
  'Satheesh Kumar K - Database Administrator Portfolio'
);

-- ---------------------------------------------------------------------------
-- Sections (navbar + headings)
-- ---------------------------------------------------------------------------
insert into public.sections (slug, nav_label, title, show_in_nav, sort_order) values
  ('home',       'Home',       null,                        true,  1),
  ('about',      'About',      'About Me',                  true,  2),
  ('experience', 'Experience', 'Professional Experience',   true,  3),
  ('skills',     'Skills',     'Skills & Expertise',        true,  4),
  ('projects',   'Projects',   'Featured Projects',         true,  5),
  ('education',  'Education',  'Education & Achievements',  false, 6),
  ('contact',    'Contact',    'Get In Touch',              true,  7);

insert into public.site_text (key, value) values
  ('experience.strengths_heading',    'Key Strengths & Expertise'),
  ('skills.technologies_heading',     'Technologies & Tools'),
  ('skills.skills_heading',           'Technical Skills'),
  ('education.certifications_heading','Certifications'),
  ('education.achievements_heading',  'Key Achievements'),
  ('hero.chart_title',                'Query Response Times');

-- ---------------------------------------------------------------------------
-- Social links
-- ---------------------------------------------------------------------------
insert into public.social_links (platform, label, url, display_text, show_in_hero, show_in_contact, show_in_footer, sort_order, icon_svg) values
  ('github', 'GitHub', 'https://github.com/satheesh-kumar-DBA', 'Check out my work', true, true, true, 1,
   $svg$<svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>$svg$),
  ('linkedin', 'LinkedIn', 'https://linkedin.com/in/satheesh-kumar-702b20308', 'Connect with me', true, true, true, 2,
   $svg$<svg fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>$svg$),
  ('email', 'Email', 'mailto:satheeshkumar2k4@gmail.com', 'satheeshkumar2k4@gmail.com', true, true, false, 3,
   $svg$<svg fill="currentColor" viewBox="0 0 24 24"><path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"/></svg>$svg$);

-- ---------------------------------------------------------------------------
-- Hero
-- ---------------------------------------------------------------------------
insert into public.hero_badges (label, color, sort_order, icon_svg) values
  ('Available for Work', 'green', 1,
   $svg$<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>$svg$),
  ('Certified Professional', 'blue', 2,
   $svg$<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>$svg$),
  ('{experience} Experience', 'purple', 3,
   $svg$<svg fill="currentColor" viewBox="0 0 20 20"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/></svg>$svg$);

insert into public.hero_actions (label, href, variant, new_tab, sort_order, icon_svg) values
  ('Get In Touch', '#contact',  'primary',   false, 1, null),
  ('View My Work', '#projects', 'secondary', false, 2, null),
  ('View CV', 'https://zkawjbnijhfmlebuawga.supabase.co/storage/v1/object/public/portfolio/resume.pdf', 'outline', true, 3,
   $svg$<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>$svg$);

insert into public.stats (value, label, sublabel, color, sort_order) values
  ('{experience_value}', '{experience_unit}', 'Experience', 'sky', 1),
  ('3',   'Projects',       'Completed',   'amber',  2),
  ('4',   'Certifications', 'Achieved',    'cyan',   3),
  ('60%', 'Efficiency',     'Improvement', 'orange', 4);

-- ---------------------------------------------------------------------------
-- Experience
-- ---------------------------------------------------------------------------
insert into public.experiences (role, company, company_short, location, start_date, period, responsibilities, strengths, sort_order) values (
  'Junior Database Administrator',
  'TBS Technologies Private Limited',
  'TBS',
  'Tiruppur, Tamil Nadu, India',
  date '2025-07-01',
  null,  -- period text is generated from the dates
  array[
    'Administer and maintain PostgreSQL databases to ensure optimal performance, availability, and data integrity across development, testing, and production environments',
    'Monitor database performance using pgAdmin, system logs, and performance metrics to proactively detect and resolve bottlenecks',
    'Perform database backups, restorations, and security audits with pgAgent and pgAudit, ensuring compliance with internal data protection and audit standards',
    'Develop and implement automated backup and monitoring solutions using batch scripting to enhance reliability and reduce manual workload',
    'Execute SQL query optimization and index tuning to improve response time, throughput, and overall database scalability',
    'Collaborate with application and development teams to design efficient data models and troubleshoot database-driven application issues'
  ],
  array[
    'Strong expertise in SQL performance tuning, query optimization, and database internals',
    'Skilled in performing regular backups, restorations, and recovery testing to ensure data integrity and business continuity',
    'Proven ability to collaborate effectively with development and DevOps teams for database optimization and troubleshooting',
    'Dedicated continuous learner, staying current with the latest PostgreSQL features, community releases, and best practices'
  ],
  1
);

-- ---------------------------------------------------------------------------
-- Skills
-- ---------------------------------------------------------------------------
insert into public.technologies (name, sort_order, icon_svg) values
  ('PostgreSQL', 1,
   $svg$<svg viewBox="0 0 432.071 445.383"><defs><linearGradient id="postgresqlGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#336791"/><stop offset="100%" stop-color="#5090c1"/></linearGradient></defs><path fill="url(#postgresqlGrad)" d="M323.205 324.227c2.833-23.601 1.984-27.062 19.563-23.239l4.463.392c13.517.615 31.199-2.174 41.587-7 22.362-10.376 35.622-27.7 13.572-23.148-50.297 10.376-53.755-6.655-53.755-6.655 53.111-78.803 75.313-178.836 56.149-203.322C352.514-5.534 262.036 26.049 260.522 26.869l-.482.089c-9.938-2.062-21.06-3.294-33.554-3.496-22.761-.374-40.032 5.967-53.133 15.904 0 0-161.408-66.498-153.899 83.628 1.597 31.936 45.777 241.655 98.47 178.31 19.259-23.163 37.871-42.748 37.871-42.748 9.242 6.14 20.307 9.272 31.912 8.147l.897-.765c-.281 2.876-.157 5.689.359 9.019-13.572 15.167-9.584 17.83-36.723 23.416-27.457 5.659-11.326 15.734-.797 18.367 12.768 3.193 42.305 7.716 62.268-20.224l-.795 3.188c5.325 4.26 4.965 30.619 5.72 49.452.756 18.834 1.468 36.108 4.156 46.13 2.688 10.022 6.548 34.34 35.098 27.283 23.922-5.892 36.701-24.029 38.059-51.974 1.004-15.863 2.478-12.942 2.739-26.409l2.302-3.877c1.775 22.395.976 58.013 6.572 83.932 4.035 18.686 12.244 48.189 52.638 38.655 31.188-7.354 47.208-25.078 13.937-22.395zM64.32 352.752c-15.873 19.015-34.052 31.878-48.894 32.812-22.479 1.416-35.937-10.962-38.222-30.435-7.992-68.016 36.933-146.766 102.663-93.26-8.098 9.29-1.842 74.786-15.547 90.884zm258.993 25.049c-13.572.956-22.027-8.768-22.773-24.975-1.196-25.958 3.581-58.478 9.242-73.79 2.837-7.688 12.403-28.535 29.778-20.224 17.453 8.768 4.641 28.535 1.804 43.848-3.58 15.312 4.173 73.302-18.051 75.141z"/></svg>$svg$),
  ('MySQL', 2,
   $svg$<svg viewBox="0 0 24 24"><defs><linearGradient id="mysqlGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#00758F"/><stop offset="50%" stop-color="#F29111"/><stop offset="100%" stop-color="#E48E00"/></linearGradient></defs><path fill="url(#mysqlGrad)" d="M16.405 5.501c-.115 0-.193.014-.274.033v.013h.014c.054.104.146.174.214.273.054.107.1.214.154.32l.014-.015c.094-.066.14-.172.14-.333-.04-.047-.046-.094-.08-.14-.04-.067-.126-.1-.18-.153zM5.77 18.695h-.927a50.854 50.854 0 00-.27-4.41h-.008l-1.41 4.41H2.45l-1.4-4.41h-.01a72.892 72.892 0 00-.195 4.41H0c.055-1.966.192-3.81.41-5.53h1.15l1.335 4.064h.008l1.347-4.064h1.095c.242 2.015.384 3.86.428 5.53zm4.017-4.08c-.378 2.045-.876 3.533-1.492 4.46-.482.716-1.01 1.073-1.583 1.073-.153 0-.34-.046-.566-.138v-.494c.11.017.24.026.386.026.268 0 .483-.075.647-.222.197-.18.295-.382.295-.605 0-.155-.077-.47-.23-.944L6.23 14.615h.91l.727 2.36c.164.536.233.91.205 1.123.4-1.064.678-2.227.835-3.483zm12.325 4.08h-2.63v-5.53h.885v4.85h1.745zm-3.32.135l-1.016-.5c.09-.076.177-.158.255-.25.433-.506.648-1.258.648-2.253 0-1.83-.718-2.746-2.155-2.746-.704 0-1.254.232-1.65.697-.43.508-.646 1.256-.646 2.245 0 .972.19 1.686.574 2.14.35.41.877.615 1.583.615.264 0 .506-.033.725-.098l1.325.772.36-.622zM15.5 17.588c-.225-.36-.337-.94-.337-1.736 0-1.393.424-2.09 1.27-2.09.443 0 .77.167.977.5.224.362.336.936.336 1.723 0 1.404-.424 2.108-1.27 2.108-.445 0-.774-.167-.978-.5zm-1.658-.425c0 .47-.172.856-.516 1.156-.344.3-.803.45-1.384.45-.543 0-1.064-.172-1.573-.515l.237-.476c.438.22.833.328 1.19.328.332 0 .593-.073.783-.22.188-.147.3-.355.3-.615 0-.33-.23-.61-.648-.83-.388-.205-1.163-.46-1.163-.46-.422-.168-.74-.377-.951-.628-.21-.25-.316-.555-.316-.912 0-.439.144-.803.43-1.091.286-.288.675-.433 1.16-.433.416 0 .83.1 1.24.3l-.213.476c-.352-.18-.67-.27-.957-.27-.315 0-.564.074-.748.22-.184.147-.277.347-.277.6 0 .33.234.61.648.83.388.205 1.163.46 1.163.46.422.168.74.377.951.628.21.25.316.555.316.912z"/></svg>$svg$),
  ('Power BI', 3,
   $svg$<svg viewBox="0 0 24 24"><defs><linearGradient id="powerbiGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#F2C811"/><stop offset="100%" stop-color="#FBBC04"/></linearGradient></defs><path fill="none" stroke="url(#powerbiGrad)" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>$svg$),
  ('pgAdmin', 4,
   $svg$<svg viewBox="0 0 24 24"><defs><linearGradient id="pgadminGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#3b82f6"/><stop offset="100%" stop-color="#8b5cf6"/></linearGradient></defs><g fill="none" stroke="url(#pgadminGrad)"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></g></svg>$svg$),
  ('pgAgent', 5,
   $svg$<svg viewBox="0 0 24 24"><defs><linearGradient id="pgagentGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#06b6d4"/><stop offset="100%" stop-color="#3b82f6"/></linearGradient></defs><path fill="none" stroke="url(#pgagentGrad)" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/></svg>$svg$),
  ('SQL', 6,
   $svg$<svg viewBox="0 0 24 24"><defs><linearGradient id="sqlGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#60a5fa"/><stop offset="100%" stop-color="#1e40af"/></linearGradient></defs><path fill="none" stroke="url(#sqlGrad)" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.790 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"/></svg>$svg$),
  ('Windows Server', 7,
   $svg$<svg viewBox="0 0 24 24"><defs><linearGradient id="windowsGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0078D4"/><stop offset="100%" stop-color="#00BCF2"/></linearGradient></defs><path fill="none" stroke="url(#windowsGrad)" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"/></svg>$svg$),
  ('Batch Scripting', 8,
   $svg$<svg viewBox="0 0 24 24"><defs><linearGradient id="batchGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#10b981"/><stop offset="100%" stop-color="#059669"/></linearGradient></defs><path fill="none" stroke="url(#batchGrad)" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>$svg$);

insert into public.skills (name, description, sort_order) values
  ('Database Administration',        'Installation, Configuration, Maintenance, and Production DBA Management (PostgreSQL & MySQL)', 1),
  ('Performance Tuning',             'Query Optimization, Indexing, EXPLAIN Analysis, and Execution Plan Review', 2),
  ('Monitoring & Troubleshooting',   'Database Monitoring, Performance Analysis, pg_stat_statements, and Custom Logging', 3),
  ('Backup, Recovery & Replication', 'pg_dump, pg_basebackup, PITR, WAL Archiving, Logical & Physical Replication', 4),
  ('Automation & Scripting',         'pgAgent Jobs, Automated Backups, Batch Scripting', 5),
  ('Security & Auditing',            'pgAudit, Audit Logging, Access Control, and Compliance Monitoring', 6),
  ('Data Visualization & Reporting', 'Power BI Dashboard Design, DAX, Data Modeling, and Reporting Automation', 7),
  ('Development',                    'Database Schema Design, Stored Procedures, Functions, and SQL Development', 8);

-- ---------------------------------------------------------------------------
-- Projects
-- ---------------------------------------------------------------------------
insert into public.projects (title, category, description, image_url, image_alt, tags, link_url, link_label, sort_order, icon_svg) values
  ('Auto Backup and Restore System', 'Database',
   'Designed and implemented batch-scripted automation for scheduled backups, data restoration, and storage path management using pg_dump and pg_restore. Integrated backup scheduling with pgAgent for real-time task execution and monitoring. Achieved a fully automated and reliable backup system, reducing manual maintenance time by over 60% and ensuring data consistency and disaster recovery readiness.',
   null, null,
   '[{"name":"PostgreSQL","color":"blue"},{"name":"pgAgent","color":"cyan"},{"name":"Batch Scripting","color":"emerald"},{"name":"Windows Server","color":"slate"}]',
   'https://github.com/satheesh-kumar-DBA', 'View on GitHub', 1,
   $svg$<svg viewBox="0 0 432.071 445.383"><defs><linearGradient id="postgresqlProjectGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#336791"/><stop offset="100%" stop-color="#5090c1"/></linearGradient></defs><path fill="url(#postgresqlProjectGrad)" d="M323.205 324.227c2.833-23.601 1.984-27.062 19.563-23.239l4.463.392c13.517.615 31.199-2.174 41.587-7 22.362-10.376 35.622-27.7 13.572-23.148-50.297 10.376-53.755-6.655-53.755-6.655 53.111-78.803 75.313-178.836 56.149-203.322C352.514-5.534 262.036 26.049 260.522 26.869l-.482.089c-9.938-2.062-21.06-3.294-33.554-3.496-22.761-.374-40.032 5.967-53.133 15.904 0 0-161.408-66.498-153.899 83.628 1.597 31.936 45.777 241.655 98.47 178.31 19.259-23.163 37.871-42.748 37.871-42.748 9.242 6.14 20.307 9.272 31.912 8.147l.897-.765c-.281 2.876-.157 5.689.359 9.019-13.572 15.167-9.584 17.83-36.723 23.416-27.457 5.659-11.326 15.734-.797 18.367 12.768 3.193 42.305 7.716 62.268-20.224l-.795 3.188c5.325 4.26 4.965 30.619 5.72 49.452.756 18.834 1.468 36.108 4.156 46.13 2.688 10.022 6.548 34.34 35.098 27.283 23.922-5.892 36.701-24.029 38.059-51.974 1.004-15.863 2.478-12.942 2.739-26.409l2.302-3.877c1.775 22.395.976 58.013 6.572 83.932 4.035 18.686 12.244 48.189 52.638 38.655 31.188-7.354 47.208-25.078 13.937-22.395zM64.32 352.752c-15.873 19.015-34.052 31.878-48.894 32.812-22.479 1.416-35.937-10.962-38.222-30.435-7.992-68.016 36.933-146.766 102.663-93.26-8.098 9.29-1.842 74.786-15.547 90.884zm258.993 25.049c-13.572.956-22.027-8.768-22.773-24.975-1.196-25.958 3.581-58.478 9.242-73.79 2.837-7.688 12.403-28.535 29.778-20.224 17.453 8.768 4.641 28.535 1.804 43.848-3.58 15.312 4.173 73.302-18.051 75.141z"/></svg>$svg$),
  ('Vehicle Model Analysis Dashboard', 'Analytics',
   'Designed interactive analytics dashboard for vehicle performance and trend visualization. Created DAX measures, data models, and integrated with PostgreSQL to deliver real-time insights. Improved decision-making through real-time insights on vehicle trends by fuel type, year, and brand.',
   'https://zkawjbnijhfmlebuawga.supabase.co/storage/v1/object/public/portfolio/powerbi-dashboard.png',
   'Vehicle Model Analysis Dashboard showing fuel type analysis, brand counts, and yearly trends',
   '[{"name":"Power BI","color":"amber"},{"name":"PostgreSQL","color":"blue"}]',
   'https://github.com/satheesh-kumar-DBA', 'Learn More', 2,
   $svg$<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>$svg$),
  ('Custom Audit Logging', 'Security',
   'Modified pgAudit extension and compiled custom DLL to implement comprehensive audit logging for security compliance requirements. Achieved full compliance with internal security audit standards.',
   'https://zkawjbnijhfmlebuawga.supabase.co/storage/v1/object/public/portfolio/pgaudit-project.png',
   'Custom Audit Logging implementation with pgAudit extension',
   '[{"name":"PostgreSQL","color":"blue"},{"name":"pgAudit","color":"purple"},{"name":"C/C++","color":"slate"},{"name":"Windows/Linux","color":"emerald"}]',
   'https://github.com/satheesh-kumar-DBA/pgaudit', 'View on GitHub', 3,
   $svg$<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>$svg$);

-- ---------------------------------------------------------------------------
-- Education, certifications, achievements
-- ---------------------------------------------------------------------------
insert into public.education (degree, institution, grade, period, sort_order) values
  ('Bachelor of Engineering – Computer Science', 'Dr. Mahalingam College of Engineering and Technology', 'CGPA: 8.2', '2021 – 2025', 1);

insert into public.certifications (name, provider, sort_order, icon_svg) values
  ('Python for Beginners', 'Udemy', 1,
   $svg$<svg viewBox="0 0 256 255" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="pythonBlue" x1="12.959%" y1="12.039%" x2="79.639%" y2="78.201%"><stop offset="0%" stop-color="#387EB8"/><stop offset="100%" stop-color="#366994"/></linearGradient><linearGradient id="pythonYellow" x1="19.128%" y1="20.579%" x2="90.742%" y2="88.429%"><stop offset="0%" stop-color="#FFE873"/><stop offset="100%" stop-color="#FFC331"/></linearGradient></defs><path d="M126.916.072c-64.832 0-60.784 28.115-60.784 28.115l.072 29.128h61.868v8.745H41.631S.145 61.355.145 126.77c0 65.417 36.21 63.097 36.21 63.097h21.61v-30.356s-1.165-36.21 35.632-36.21h61.362s34.475.557 34.475-33.319V33.97S194.67.072 126.916.072zM92.802 19.66a11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13 11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.13z" fill="url(#pythonBlue)"/><path d="M128.757 254.126c64.832 0 60.784-28.115 60.784-28.115l-.072-29.127H127.6v-8.745h86.441s41.486 4.705 41.486-60.712c0-65.416-36.21-63.096-36.21-63.096h-21.61v30.355s1.165 36.21-35.632 36.21h-61.362s-34.475-.557-34.475 33.32v56.013s-5.235 33.897 62.518 33.897zm34.114-19.586a11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.131 11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13z" fill="url(#pythonYellow)"/></svg>$svg$),
  ('Java (Basic)', 'HackerRank', 2,
   $svg$<svg viewBox="0 0 256 346" xmlns="http://www.w3.org/2000/svg"><path d="M82.554 267.473s-13.198 7.675 9.393 10.272c27.369 3.122 41.356 2.675 71.517-3.034 0 0 7.93 4.972 19.003 9.279-67.611 28.977-153.019-1.679-99.913-16.517M74.292 229.659s-14.803 10.958 7.805 13.296c29.236 3.016 52.324 3.263 92.276-4.43 0 0 5.526 5.602 14.215 8.666-81.747 23.904-172.798 1.885-114.296-17.532" fill="#5382A1"/><path d="M143.942 165.515c16.66 19.18-4.377 36.44-4.377 36.44s42.301-21.837 22.874-49.183c-18.144-25.5-32.059-38.172 43.268-81.858 0 0-118.238 29.53-61.765 94.6" fill="#E76F00"/><path d="M233.364 295.442s9.767 8.047-10.757 14.273c-39.026 11.823-162.432 15.393-196.714.471-12.323-5.36 10.787-12.8 18.056-14.362 7.581-1.644 11.914-1.337 11.914-1.337-13.705-9.655-88.583 18.957-38.034 27.15 137.853 22.356 251.292-10.066 215.535-26.195M88.9 190.48s-62.771 14.91-22.228 20.323c17.118 2.292 51.243 1.774 83.030-.89 25.978-2.19 52.063-6.85 52.063-6.85s-9.16 3.923-15.787 8.448c-63.744 16.765-186.886 8.966-151.435-8.183 29.981-14.492 54.358-12.848 54.358-12.848M201.506 253.422c64.8-33.672 34.839-66.03 13.927-61.67-5.126 1.066-7.428 1.99-7.428 1.990s1.91-2.998 5.551-4.293c41.486-14.584 73.424 42.938-13.355 65.647 0 0 .998-.895 1.305-1.674" fill="#5382A1"/><path d="M162.439.371s35.887 35.9-34.037 91.101c-56.071 44.282-12.786 69.53-.023 98.377-32.73-29.53-56.75-55.526-40.635-79.72C111.395 74.612 176.918 57.393 162.439.37" fill="#E76F00"/><path d="M95.268 344.665c62.199 3.982 157.712-2.209 159.974-31.64 0 0-4.348 11.158-51.404 20.018-53.088 9.990-118.564 8.824-157.399 2.421.001 0 7.95 6.58 48.83 9.201" fill="#5382A1"/></svg>$svg$),
  ('SQL for Beginners', 'Scaler', 3,
   $svg$<svg viewBox="0 0 24 24" fill="none"><defs><linearGradient id="sqlCertGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#00758F"/><stop offset="100%" stop-color="#336791"/></linearGradient></defs><path d="M12 3C7.58 3 4 4.79 4 7v10c0 2.21 3.59 4 8 4s8-1.79 8-4V7c0-2.21-3.58-4-8-4z" fill="url(#sqlCertGrad)" opacity="0.3"/><ellipse cx="12" cy="7" rx="8" ry="4" fill="none" stroke="url(#sqlCertGrad)" stroke-width="2"/><path d="M4 7v10c0 2.21 3.59 4 8 4s8-1.79 8-4V7" fill="none" stroke="url(#sqlCertGrad)" stroke-width="2"/><path d="M4 12c0 2.21 3.59 4 8 4s8-1.79 8-4" fill="none" stroke="url(#sqlCertGrad)" stroke-width="2"/><path d="M4 17c0 2.21 3.59 4 8 4s8-1.79 8-4" fill="none" stroke="url(#sqlCertGrad)" stroke-width="2"/></svg>$svg$),
  ('Machine Learning', 'Udemy', 4,
   $svg$<svg viewBox="0 0 24 24" fill="none"><defs><linearGradient id="mlGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#FF6B6B"/><stop offset="50%" stop-color="#4ECDC4"/><stop offset="100%" stop-color="#45B7D1"/></linearGradient></defs><circle cx="4" cy="6" r="2" fill="url(#mlGrad)"/><circle cx="4" cy="12" r="2" fill="url(#mlGrad)"/><circle cx="4" cy="18" r="2" fill="url(#mlGrad)"/><circle cx="12" cy="4" r="2" fill="url(#mlGrad)"/><circle cx="12" cy="12" r="2.5" fill="url(#mlGrad)"/><circle cx="12" cy="20" r="2" fill="url(#mlGrad)"/><circle cx="20" cy="8" r="2" fill="url(#mlGrad)"/><circle cx="20" cy="16" r="2" fill="url(#mlGrad)"/><path d="M6 6L10 4M6 12L10 12M6 18L10 20M14 4L18 8M14 12L18 8M14 12L18 16M14 20L18 16" stroke="url(#mlGrad)" stroke-width="1.5" opacity="0.4"/></svg>$svg$);

insert into public.achievements (title, date_label, icon, sort_order) values
  ('Developed pgAudit using Visual Studio Enterprise for PostgreSQL 17.6', 'October 2025', '🚀', 1),
  ('Presented paper on "IoT-Based Wearable Watch for Visually Impaired Persons" at Kongu Engineering College, Erode', 'April 28, 2023', '📝', 2),
  ('Runners-up in Cricket Tournament at Kumaraguru College of Engineering and Technology', 'February 2022', '🏆', 3);

commit;
