import { motion } from 'framer-motion';
import { scaleIn, staggerContainer } from '../animations';
import { BarItem, Panel, SectionHeading, SvgIcon } from './Common';
import { useSectionScheme } from '../themes/ThemeContext';

export default function Education({ slug, title, eyebrow, index, education, certifications, achievements, text }) {
  const scheme = useSectionScheme(slug);
  if (education.length === 0 && certifications.length === 0 && achievements.length === 0) return null;

  return (
    <section id={slug} className={`px-4 py-20 sm:px-6 lg:px-8 ${scheme}`}>
      <div className="mx-auto max-w-7xl space-y-6">
        <SectionHeading title={title} eyebrow={eyebrow} index={index} />

        <div className="grid gap-6 lg:grid-cols-5">
          {/* Degrees */}
          {education.length > 0 && (
            <div className="space-y-6 lg:col-span-2">
              {education.map((item) => (
                <Panel key={item.id} title={item.period} hover={false} bodyClassName="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent-300">
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-lg font-semibold leading-snug text-fg-50">{item.degree}</h3>
                      <p className="mt-1 text-sm text-accent-300">{item.institution}</p>
                    </div>
                  </div>
                  {item.grade && (
                    <div className="mt-5 flex items-end justify-between rounded-lg border border-line/5 bg-ink-950/50 px-4 py-3">
                      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-fg-500">{item.grade.split(':')[0]}</span>
                      <span className="font-display text-3xl font-semibold leading-none text-accent2-300">
                        {item.grade.includes(':') ? item.grade.split(':').slice(1).join(':').trim() : item.grade}
                      </span>
                    </div>
                  )}
                </Panel>
              ))}
            </div>
          )}

          {/* Achievements as a log table */}
          {achievements.length > 0 && (
            <Panel title={text['education.achievements_heading']} accent="amber" hover={false} className="lg:col-span-3" bodyClassName="px-5 py-2">
              {achievements.map((item, idx) => (
                <BarItem key={item.id} idx={idx}>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                    <span className="text-fg-200">
                      {item.icon && <span className="mr-2" aria-hidden="true">{item.icon}</span>}
                      {item.title}
                    </span>
                    {item.date_label && (
                      <span className="flex-shrink-0 font-mono text-xs text-fg-500 sm:pt-0.5">{item.date_label}</span>
                    )}
                  </div>
                </BarItem>
              ))}
            </Panel>
          )}
        </div>

        {/* Certifications */}
        {certifications.length > 0 && (
          <Panel title={text['education.certifications_heading']} hover={false} bodyClassName="p-5">
            <motion.div
              className="grid grid-cols-2 gap-3 lg:grid-cols-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {certifications.map((cert) => {
                const body = (
                  <>
                    <SvgIcon svg={cert.icon_svg} className="h-12 w-12" />
                    <div>
                      <h4 className="text-sm font-semibold text-fg-100">{cert.name}</h4>
                      <p className="mt-0.5 font-mono text-[11px] uppercase tracking-wider text-fg-500">{cert.provider}</p>
                    </div>
                  </>
                );
                const className =
                  'flex flex-col items-center gap-3 rounded-xl border border-line/5 bg-ink-950/50 px-3 py-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-glow';
                return cert.credential_url ? (
                  <motion.a key={cert.id} href={cert.credential_url} target="_blank" rel="noopener noreferrer" variants={scaleIn} className={className}>
                    {body}
                  </motion.a>
                ) : (
                  <motion.div key={cert.id} variants={scaleIn} className={className}>
                    {body}
                  </motion.div>
                );
              })}
            </motion.div>
          </Panel>
        )}
      </div>
    </section>
  );
}
