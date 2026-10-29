import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../animations';
import { pick, statColors } from '../theme';
import { useSectionScheme, useTheme } from '../themes/ThemeContext';
import Gauge, { gaugeFill } from './Gauge';
import { Panel, RichText, SectionHeading } from './Common';
import { Sparkline } from './visuals/KpiVisual';

// Stats render as gauges, big numbers, KPI tiles or a terminal table depending on the theme
function Stats({ stats, style }) {
  if (style === 'terminal') {
    return (
      <div className="font-mono text-sm">
        <p className="mb-3 text-fg-500">
          <span className="text-accent">$</span> SELECT label, value FROM stats;
        </p>
        <table className="w-full">
          <tbody>
            {stats.map((s) => (
              <tr key={s.id} className="border-b border-dashed border-accent/20">
                <td className="py-2 text-fg-300">
                  {s.label} {s.sublabel}
                </td>
                <td className="py-2 text-right text-lg font-bold text-accent">{s.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (style === 'numbers' || style === 'kpi') {
    return (
      <div className="grid grid-cols-2 content-start gap-4">
        {stats.map((s, i) => (
          <motion.div key={s.id} variants={fadeInUp} className="flex flex-col rounded-theme border border-line/10 bg-ink-950/40 p-5">
            <p className={`font-display text-4xl font-bold sm:text-5xl ${i % 2 ? 'text-accent2' : 'text-accent'}`}>{s.value}</p>
            <div className="mt-3">
              <p className="text-sm font-semibold text-fg-200">{s.label}</p>
              {s.sublabel && <p className="text-xs text-fg-500">{s.sublabel}</p>}
            </div>
            {style === 'kpi' && <Sparkline seed={i + 2} className="mt-3 h-8 w-full" />}
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid h-full grid-cols-2 content-center gap-x-4 gap-y-8">
      {stats.map((stat, idx) => {
        const color = pick(statColors, stat.color, 'sky');
        return (
          <motion.div key={stat.id} variants={fadeInUp}>
            <Gauge value={stat.value} label={stat.label} sublabel={stat.sublabel} stroke={color.stroke} glow={color.glow} fill={gaugeFill(stat.value, idx)} />
          </motion.div>
        );
      })}
    </div>
  );
}

export default function About({ slug, title, eyebrow, index, profile, stats }) {
  const theme = useTheme();
  const scheme = useSectionScheme(slug);
  const paragraphs = (profile.about || '').split(/\n\s*\n/).filter(Boolean);
  const editorial = theme.heading === 'editorial';

  return (
    <section id={slug} className={`px-4 py-20 sm:px-6 lg:px-8 ${scheme}`}>
      <div className="mx-auto max-w-7xl">
        <SectionHeading title={title} eyebrow={eyebrow} index={index} />

        <div className="grid gap-6 lg:grid-cols-5">
          <motion.div className="lg:col-span-3" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={fadeInUp}>
            {editorial ? (
              <div className="space-y-6">
                {paragraphs.map((paragraph, idx) => (
                  <p key={idx} className={idx === 0 ? 'font-display text-2xl leading-snug text-fg-100' : 'text-base leading-8 text-fg-400'}>
                    <RichText text={paragraph} highlightClassName={idx === 0 ? 'italic text-accent' : 'font-medium text-fg-100'} />
                  </p>
                ))}
              </div>
            ) : (
              <Panel title={profile.full_name} hover={false} className="h-full" bodyClassName="p-6 space-y-5">
                {paragraphs.map((paragraph, idx) => (
                  <p key={idx} className="text-[15px] leading-7 text-fg-400">
                    <RichText text={paragraph} />
                  </p>
                ))}
              </Panel>
            )}
          </motion.div>

          {stats.length > 0 && (
            <motion.div className="lg:col-span-2" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer}>
              {editorial ? (
                <Stats stats={stats} style={theme.stats} />
              ) : (
                <Panel hover={false} className="h-full" bodyClassName="h-full p-6">
                  <Stats stats={stats} style={theme.stats} />
                </Panel>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
