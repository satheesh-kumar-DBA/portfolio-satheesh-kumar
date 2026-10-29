# Satheesh Kumar K — Portfolio

All site content (profile, about, experience, skills, projects, education, certifications, achievements, links, images and resume) is stored in **Supabase**. The React app holds no content, only layout and styling.

## Setup

1. Copy `.env.example` to `.env.local` and fill in the project URL and **anon** key (Supabase Dashboard → Project Settings → API).
2. `npm install`
3. `npm start`

## Editing content

Use the Supabase Dashboard **Table Editor**. Changes appear on the next page load, with no rebuild or redeploy.

| Table | What it controls |
|---|---|
| `profile` | Name, headline, greeting, avatar, resume link, about text (blank line = new paragraph, `**text**` = highlight), contact message, footer (`{year}`, `{name}` placeholders), page title |
| `sections` | Navbar labels, section headings, order (`sort_order`), visibility |
| `site_text` | Sub-headings such as "Technical Skills" |
| `social_links` | GitHub / LinkedIn / Email, and where each one appears (hero, contact, footer) |
| `hero_badges`, `hero_actions` | Badges and buttons in the hero |
| `stats` | The four stat cards under About |
| `experiences` | Jobs, responsibilities and strengths (text arrays) |
| `technologies`, `skills` | Skills section |
| `projects` | Project cards; `tags` is JSON such as `[{"name":"PostgreSQL","color":"blue"}]` |
| `education`, `certifications`, `achievements` | Education section |
| `themes`, `site_settings` | The 12 website themes (catalogue shown in the admin app) and the active one. See **Themes** below |
| `messages` | Contact form submissions. Visitors can only insert; read them in the admin app's Inbox |

**Experience length is calculated, not typed.** Give each job a start month (and an end month once it ends) in the app. Anywhere in the content, `{experience}` becomes e.g. "1+ Year" / "2+ Years" / "8+ Months", `{experience_value}` becomes "1+" and `{experience_unit}` becomes "Year". The hero badge and the About stat use these, so they stay correct over time. A job's period text ("July 2025 - Present") is generated from its dates when left empty (`src/lib/experience.js`).

Every list table has `sort_order` and `is_visible` columns. Icons are stored as SVG markup in `icon_svg` columns. Color keys (`blue`, `green`, `purple`, ...) map to styles in `src/theme.js`.

Images and the resume are in the public Storage bucket `portfolio`. To replace one, upload a file there and paste its public URL into the matching column.

## Themes

The site ships 12 complete themes from `portfolio_theme_list.pdf`. Each changes colors, fonts, layout, hero visual and background:

| # | Theme | Hero | Notes |
|---|---|---|---|
| 1 | Dark Database Engineer (default) | Animated psql terminal querying your real data | Grid background |
| 2 | Premium Corporate Blue | Headline + large portrait card | Light, no glow |
| 3 | Bento Grid | Tiles: intro, stats, stack, status, featured project | Bento project grid |
| 4 | Terminal / CLI | Full shell session (whoami, ls ./stack ...) | Monospace everywhere, ./menu |
| 5 | Cyber Tech | Neon node graph with moving packets | Clipped-corner glowing panels |
| 6 | Cloud & Infrastructure | Replication / WAL / backup topology + status cards | Circuit background |
| 7 | Minimal Editorial | Oversized serif name, text-led intro | Case-study project list |
| 8 | Glassmorphism | Monitoring chart on frosted glass | Animated gradient blobs |
| 9 | Data Analytics | KPI tiles, trend chart, before/after comparison | Light, KPI stat cards |
| 10 | Enterprise Security | pgAudit log stream + access-control matrix | Navy + emerald |
| 11 | Split Light + Dark | Light intro with a dark terminal | Skills and projects in dark sections |
| 12 | Interactive 3D | Floating database with orbiting stack, pointer tilt | Perspective floor, tilting cards |

- Pick the live theme in the admin app (**Appearance → Theme**).
- Preview any theme without saving: add `?theme=<key>`, e.g. `/?theme=terminal`.
- Code: `src/themes/registry.js` (per-theme settings), `src/themes/palette.js` (palette → CSS variables), theme-specific CSS at the end of `src/App.css`, hero visuals in `src/components/visuals/`.
- Animations respect the reduced-motion setting.

## Database

- `supabase/migrations/001_portfolio_schema.sql`: tables, read-only RLS policies, and `get_portfolio()`, which returns all content as JSON in one request.
- `002_admin_write_access.sql`: admin login and write policies for the mobile admin app (`../portfolio-admin`).
- `003_contact_messages.sql`: contact form table (insert-only for visitors, length checks, 30 messages/hour flood limit).
- `004_themes.sql`: theme catalogue, active-theme setting (admin-only update), and `get_portfolio()` returning the active theme.
- `005_experience_dates.sql`: job start/end dates; the experience badge and stat switched to `{experience}` placeholders.
- `supabase/seed.sql`: initial content. Re-running it resets every table.

The frontend uses only the anon key, so it can read but not write. Never put the `service_role` key or a personal access token (`sbp_...`) in the frontend.

---

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
