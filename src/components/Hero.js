import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { fadeInUp, staggerContainer } from '../animations';
import { actionVariants, badgeColors, pick } from '../theme';
import { useTheme } from '../themes/ThemeContext';
import { Panel, RichText, SvgIcon, externalProps, useTilt } from './Common';
import MonitorChart from './MonitorChart';
import Db3DVisual from './visuals/Db3DVisual';
import InfraVisual from './visuals/InfraVisual';
import KpiVisual from './visuals/KpiVisual';
import NetworkVisual from './visuals/NetworkVisual';
import SecurityVisual from './visuals/SecurityVisual';
import TerminalVisual, { TerminalLines, TerminalWindow } from './visuals/TerminalVisual';
import { useTypedLines } from './visuals/useTypedLines';

// The hero's layout and visual follow the active theme (theme.hero.layout / theme.hero.visual).

const firstParagraph = (about) => (about || '').split(/\n\s*\n/)[0] || '';

function Badges({ badges, className = '' }) {
  if (!badges.length) return null;
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {badges.map((badge) => (
        <span key={badge.id} className={`inline-flex items-center gap-2 rounded-md border px-2.5 py-1 text-xs font-medium ${pick(badgeColors, badge.color, 'blue')}`}>
          {/* green = live status, shown as a pulsing dot */}
          {badge.color === 'green' ? <span className="status-dot" /> : <SvgIcon svg={badge.icon_svg} className="h-3.5 w-3.5" />}
          {badge.label}
        </span>
      ))}
    </div>
  );
}

function Actions({ actions, className = '' }) {
  if (!actions.length) return null;
  return (
    <div className={`flex flex-col gap-3 sm:flex-row sm:flex-wrap ${className}`}>
      {actions.map((action) => (
        <a
          key={action.id}
          href={action.href}
          {...(action.new_tab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className={`inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${pick(actionVariants, action.variant, 'primary')}`}
        >
          <SvgIcon svg={action.icon_svg} className="h-4 w-4" />
          {action.label}
        </a>
      ))}
    </div>
  );
}

function SocialIcons({ links, className = '' }) {
  if (!links.length) return null;
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {links.map((link) => (
        <a
          key={link.id}
          href={link.url}
          aria-label={link.label}
          {...externalProps(link.url)}
          className="rounded-lg border border-line/10 bg-line/[0.02] p-2.5 text-fg-400 transition-colors hover:border-accent/40 hover:text-accent-300"
        >
          <SvgIcon svg={link.icon_svg} className="h-5 w-5" />
        </a>
      ))}
    </div>
  );
}

function Avatar({ profile, className = '' }) {
  if (!profile.avatar_url) return null;
  return (
    <div className={`relative flex-shrink-0 ${className}`}>
      <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-accent to-accent2 opacity-70 blur-[6px]" />
      <img
        src={profile.avatar_url}
        alt={profile.full_name}
        className="relative h-full w-full rounded-full border-2 border-ink-800 object-cover"
        style={{ objectPosition: profile.avatar_position }}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Split: identity panel + themed visual panel
// ---------------------------------------------------------------------------

const VISUAL_TITLES = {
  network: 'Connected stack',
  infra: 'Replication topology',
  kpi: 'Performance overview',
  security: 'Security & audit',
};

function VisualPanel({ visual, data }) {
  const legend = data.technologies.slice(0, 4);
  const legendColors = ['bg-accent', 'bg-accent2', 'bg-fg-200', 'bg-accent-300'];

  if (visual === 'terminal') return <TerminalVisual data={data} />;

  const live = (
    <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-ok">
      <span className="status-dot" /> live
    </span>
  );

  if (visual === 'chart') {
    return (
      <Panel title={data.text['hero.chart_title']} hover={false} className="flex h-full flex-col" bodyClassName="flex flex-1 flex-col p-4 sm:p-5" right={live}>
        {legend.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-x-4 gap-y-1.5 self-end rounded-md border border-line/5 bg-ink-950/50 px-3 py-2">
            {legend.map((tech, idx) => (
              <span key={tech.id} className="flex items-center gap-1.5 text-xs text-fg-400">
                <span className={`h-2.5 w-2.5 rounded-sm ${legendColors[idx]}`} />
                {tech.name}
              </span>
            ))}
          </div>
        )}
        <div className="relative min-h-[220px] flex-1 overflow-hidden rounded-lg border border-line/5 bg-ink-950/40">
          <MonitorChart className="absolute inset-0 h-full w-full" />
        </div>
      </Panel>
    );
  }

  const body = {
    network: <NetworkVisual data={data} className="h-full min-h-[280px] w-full" />,
    infra: <InfraVisual />,
    kpi: <KpiVisual data={data} />,
    security: <SecurityVisual />,
    db3d: <Db3DVisual data={data} />,
  }[visual];

  return (
    <Panel title={VISUAL_TITLES[visual]} hover={false} className="flex h-full flex-col" bodyClassName="flex flex-1 flex-col p-4 sm:p-5" right={VISUAL_TITLES[visual] ? live : null}>
      {body}
    </Panel>
  );
}

function SplitHero({ data, heroLinks }) {
  const theme = useTheme();
  const { profile, heroBadges, heroActions } = data;
  return (
    <motion.div className="mx-auto grid w-full max-w-7xl items-stretch gap-6 lg:grid-cols-5" initial="hidden" animate="visible" variants={staggerContainer}>
      <motion.div variants={fadeInUp} className="lg:col-span-2">
        <Panel title={profile.headline} hover={false} className="h-full" bodyClassName="p-6 sm:p-8">
          <div className="flex items-center gap-5">
            <Avatar profile={profile} className="h-24 w-24 sm:h-28 sm:w-28 lg:h-24 lg:w-24" />
            <div className="min-w-0">
              {profile.greeting && <p className="font-mono text-sm text-accent">{profile.greeting}</p>}
              <h1 className="hero-name mt-1 font-display text-3xl font-bold leading-tight tracking-tight text-fg-50 sm:text-4xl lg:text-[1.75rem] xl:text-[2rem]">
                {profile.full_name}
              </h1>
            </div>
          </div>
          <Badges badges={heroBadges} className="mt-6" />
          <Actions actions={heroActions} className="mt-8" />
          <SocialIcons links={heroLinks} className="mt-8 border-t border-line/5 pt-5" />
        </Panel>
      </motion.div>

      <motion.div variants={fadeInUp} className={`lg:col-span-3 ${theme.hero.visualScheme ? `scheme-${theme.hero.visualScheme} rounded-theme` : ''}`}>
        <VisualPanel visual={theme.hero.visual} data={data} />
      </motion.div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Corporate: headline copy + large portrait card
// ---------------------------------------------------------------------------

function CorporateHero({ data, heroLinks }) {
  const { profile, heroBadges, heroActions, stats } = data;
  const lead = firstParagraph(profile.about);
  return (
    <motion.div className="mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-2" initial="hidden" animate="visible" variants={staggerContainer}>
      <motion.div variants={fadeInUp}>
        <Badges badges={heroBadges} />
        {profile.greeting && <p className="mt-8 text-lg font-semibold text-accent">{profile.greeting}</p>}
        <h1 className="mt-2 font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-fg-50 md:text-6xl">{profile.full_name}</h1>
        <p className="mt-4 text-xl font-semibold text-fg-200">{profile.headline}</p>
        {lead && (
          <p className="mt-6 max-w-xl text-base leading-7 text-fg-400">
            <RichText text={lead} highlightClassName="font-semibold text-fg-100" />
          </p>
        )}
        <Actions actions={heroActions} className="mt-9" />
        <SocialIcons links={heroLinks} className="mt-8" />
      </motion.div>

      <motion.div variants={fadeInUp} className="relative mx-auto w-full max-w-md">
        <div className="absolute right-0 top-0 h-full w-full rounded-[28px] bg-accent/10 sm:-right-6 sm:-top-6" />
        <div className="absolute -bottom-6 left-0 h-40 w-40 rounded-[28px] border-2 border-dashed border-accent/30 sm:-left-6" />
        {profile.avatar_url && (
          <div className="relative overflow-hidden rounded-[28px] border border-line/10 bg-ink-700 shadow-[0_30px_60px_-30px_rgb(15_23_42/0.45)]">
            <img src={profile.avatar_url} alt={profile.full_name} className="aspect-[4/5] w-full object-cover" style={{ objectPosition: profile.avatar_position }} />
          </div>
        )}
        {stats[0] && (
          <div className="panel absolute -bottom-8 left-4 right-4 flex items-center gap-3 px-5 py-4 sm:left-6 sm:right-auto">
            <span className="font-display text-3xl font-extrabold text-accent">{stats[0].value}</span>
            <span className="text-sm leading-tight text-fg-300">
              {stats[0].label}
              <br />
              {stats[0].sublabel}
            </span>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Editorial: oversized serif name, text-led introduction
// ---------------------------------------------------------------------------

function EditorialHero({ data, heroLinks }) {
  const { profile, heroBadges, heroActions } = data;
  const lead = firstParagraph(profile.about);
  return (
    <motion.div className="mx-auto w-full max-w-6xl" initial="hidden" animate="visible" variants={staggerContainer}>
      <motion.p variants={fadeInUp} className="text-xs uppercase tracking-[0.3em] text-fg-500">
        {profile.headline}
        {profile.location ? ` — ${profile.location}` : ''}
      </motion.p>
      <motion.h1 variants={fadeInUp} className="mt-6 font-display text-6xl font-semibold leading-[0.95] tracking-tight text-fg-50 sm:text-7xl md:text-8xl">
        {profile.full_name}
      </motion.h1>
      <motion.div variants={fadeInUp} className="mt-14 grid gap-10 border-t border-fg-200/30 pt-10 md:grid-cols-12">
        <div className="md:col-span-8">
          {lead && (
            <p className="font-display text-2xl leading-snug text-fg-200 md:text-[1.7rem]">
              <RichText text={lead} highlightClassName="italic text-accent" />
            </p>
          )}
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
            {heroActions.map((action) => (
              <a
                key={action.id}
                href={action.href}
                {...(action.new_tab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="group inline-flex items-center gap-2 border-b border-fg-200/40 pb-1 text-base font-medium text-fg-100 transition-colors hover:border-accent hover:text-accent"
              >
                {action.label}
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-6 md:col-span-4">
          {profile.avatar_url && (
            <img
              src={profile.avatar_url}
              alt={profile.full_name}
              className="aspect-square w-40 object-cover grayscale"
              style={{ objectPosition: profile.avatar_position }}
            />
          )}
          <div className="space-y-1 text-sm text-fg-400">
            {heroBadges.map((b) => (
              <p key={b.id}>{b.label}</p>
            ))}
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {heroLinks.map((l) => (
              <a key={l.id} href={l.url} {...externalProps(l.url)} className="text-fg-300 underline decoration-fg-200/40 underline-offset-4 hover:text-accent">
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Bento: modular tiles summarising the whole profile
// ---------------------------------------------------------------------------

function Tile({ className = '', children }) {
  const tilt = useTilt(6);
  return (
    <motion.div variants={fadeInUp} className={`panel panel-hover shadow-panel p-5 ${className}`} {...tilt}>
      {children}
    </motion.div>
  );
}

function BentoHero({ data, heroLinks }) {
  const { profile, heroBadges, heroActions, stats, technologies, projects } = data;
  const featured = projects.find((p) => p.image_url) || projects[0];
  const status = heroBadges.find((b) => b.color === 'green');
  return (
    <motion.div
      className="mx-auto grid w-full max-w-7xl auto-rows-[minmax(140px,auto)] grid-flow-dense gap-4 sm:grid-cols-2 lg:grid-cols-4"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      <Tile className="flex flex-col gap-6 sm:col-span-2 lg:row-span-2">
        <div className="flex items-center gap-4">
          <Avatar profile={profile} className="h-20 w-20" />
          <div>
            {profile.greeting && <p className="text-sm text-accent">{profile.greeting}</p>}
            <h1 className="font-display text-3xl font-bold leading-tight text-fg-50 sm:text-4xl">{profile.full_name}</h1>
          </div>
        </div>
        <div className="flex flex-1 flex-col">
          <p className="font-display text-xl font-semibold text-fg-200">{profile.headline}</p>
          <Badges badges={heroBadges.filter((b) => b !== status)} className="mt-4" />
          <Actions actions={heroActions} className="mt-auto pt-6" />
        </div>
      </Tile>

      {stats.slice(0, 2).map((s, i) => (
        <Tile key={s.id} className="flex flex-col justify-between">
          <span className="text-xs font-medium uppercase tracking-wider text-fg-500">{s.sublabel}</span>
          <div>
            <p className={`font-display text-5xl font-bold ${i ? 'text-accent2' : 'text-accent'}`}>{s.value}</p>
            <p className="mt-1 text-sm text-fg-300">{s.label}</p>
          </div>
        </Tile>
      ))}

      {status && (
        <Tile className="flex flex-col justify-between">
          <span className="flex items-center gap-2 text-sm font-medium text-ok">
            <span className="status-dot" /> {status.label}
          </span>
          <div>
            {profile.location && <p className="text-sm text-fg-300">{profile.location}</p>}
            <SocialIcons links={heroLinks} className="mt-3" />
          </div>
        </Tile>
      )}

      {technologies.length > 0 && (
        <Tile className={status ? '' : 'sm:col-span-2'}>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-fg-500">{data.text['skills.technologies_heading']}</p>
          <div className="grid grid-cols-4 gap-3">
            {technologies.slice(0, 8).map((t) => (
              <div key={t.id} title={t.name} className="flex aspect-square items-center justify-center rounded-xl bg-ink-950/60">
                <SvgIcon svg={t.icon_svg} className="h-7 w-7 text-accent" />
              </div>
            ))}
          </div>
        </Tile>
      )}

      {featured && (
        <Tile className="overflow-hidden sm:col-span-2 lg:row-span-2">
          <p className="text-xs font-medium uppercase tracking-wider text-fg-500">{featured.category}</p>
          <h2 className="mt-1 font-display text-xl font-semibold text-fg-50">{featured.title}</h2>
          {featured.image_url && (
            <img src={featured.image_url} alt={featured.image_alt || featured.title} className="mt-4 w-full rounded-xl border border-line/10 object-cover" />
          )}
        </Tile>
      )}

      {stats.slice(2, 4).map((s, i) => (
        <Tile key={s.id} className="flex flex-col justify-between">
          <span className="text-xs font-medium uppercase tracking-wider text-fg-500">{s.sublabel}</span>
          <div>
            <p className={`font-display text-5xl font-bold ${i ? 'text-accent' : 'text-accent2'}`}>{s.value}</p>
            <p className="mt-1 text-sm text-fg-300">{s.label}</p>
          </div>
        </Tile>
      ))}
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Terminal: the whole hero is a shell session
// ---------------------------------------------------------------------------

function TerminalHero({ data, heroLinks }) {
  const { profile, heroBadges, heroActions, technologies } = data;
  const lines = useMemo(
    () => [
      { type: 'cmd', prompt: '$', text: 'whoami' },
      { type: 'out', text: profile.full_name, tone: 'head' },
      { type: 'cmd', prompt: '$', text: 'cat role.txt' },
      { type: 'out', text: profile.headline || '', tone: 'accent' },
      ...(heroBadges.length ? [{ type: 'cmd', prompt: '$', text: 'cat status.txt' }, { type: 'out', text: heroBadges.map((b) => b.label).join('  ·  ') }] : []),
      ...(technologies.length
        ? [{ type: 'cmd', prompt: '$', text: 'ls ./stack' }, { type: 'out', text: technologies.map((t) => t.name.replace(/\s+/g, '_')).join('   '), tone: 'accent' }]
        : []),
      { type: 'cmd', prompt: '$', text: './contact --list' },
    ],
    [profile, heroBadges, technologies]
  );
  const { shown, typing, done } = useTypedLines(lines, { charDelay: 45 });

  return (
    <motion.div className="mx-auto w-full max-w-5xl" initial="hidden" animate="visible" variants={fadeInUp}>
      <TerminalWindow title={`${profile.full_name.toLowerCase().replace(/\s+/g, '')}@portfolio: ~`} className="min-h-[440px] text-sm sm:text-[15px]">
        <div className="flex gap-6">
          <div className="min-w-0 flex-1 space-y-1">
            <TerminalLines shown={shown} typing={typing} />
          </div>
          {profile.avatar_url && (
            <img
              src={profile.avatar_url}
              alt={profile.full_name}
              className="hidden h-32 w-32 flex-shrink-0 border border-accent/40 object-cover grayscale sm:block"
              style={{ objectPosition: profile.avatar_position, filter: 'grayscale(1) sepia(1) hue-rotate(70deg) saturate(3) brightness(0.85)' }}
            />
          )}
        </div>
        <div className={`mt-4 flex flex-wrap gap-3 transition-opacity duration-500 ${done ? 'opacity-100' : 'opacity-0'}`}>
          {heroActions.map((a) => (
            <a
              key={a.id}
              href={a.href}
              {...(a.new_tab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="border border-accent/50 px-3 py-1.5 text-accent hover:bg-accent hover:text-on-accent"
            >
              [ {a.label} ]
            </a>
          ))}
          {heroLinks.map((l) => (
            <a key={l.id} href={l.url} {...externalProps(l.url)} className="px-1 py-1.5 text-fg-300 underline underline-offset-4 hover:text-accent">
              {l.label.toLowerCase()}
            </a>
          ))}
        </div>
      </TerminalWindow>
    </motion.div>
  );
}

export default function Hero({ slug, data }) {
  const { hero } = useTheme();
  const heroLinks = data.socialLinks.filter((l) => l.show_in_hero);
  const Layout = { split: SplitHero, corporate: CorporateHero, editorial: EditorialHero, bento: BentoHero, terminal: TerminalHero }[hero.layout] ?? SplitHero;
  return (
    <section id={slug} className="relative flex min-h-screen items-center px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <Layout data={data} heroLinks={heroLinks} />
    </section>
  );
}
