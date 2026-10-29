import { motion } from 'framer-motion';
import { fadeInUp } from '../animations';
import { BarItem, Panel, SectionHeading } from './Common';
import { useSectionScheme } from '../themes/ThemeContext';

export default function Experience({ slug, title, eyebrow, index, experiences, text }) {
  const scheme = useSectionScheme(slug);
  if (experiences.length === 0) return null;

  return (
    <section id={slug} className={`px-4 py-20 sm:px-6 lg:px-8 ${scheme}`}>
      <div className="mx-auto max-w-7xl space-y-6">
        <SectionHeading title={title} eyebrow={eyebrow} index={index} />

        {experiences.map((job) => (
          <motion.div
            key={job.id}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeInUp}
            className="grid gap-6 lg:grid-cols-5"
          >
            {/* Role summary */}
            <Panel title={job.period} hover={false} className="lg:col-span-2" bodyClassName="p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl border border-accent/30 bg-accent/10 shadow-glow">
                  {job.logo_url ? (
                    <img src={job.logo_url} alt={job.company} className="h-full w-full bg-[#fff] object-contain" />
                  ) : (
                    <span className="font-display text-xl font-semibold text-accent-300">{job.company_short}</span>
                  )}
                </div>
                <div className="min-w-0">
                  <h3 className="text-xl font-semibold leading-snug text-fg-50">{job.role}</h3>
                  <p className="mt-1 text-sm font-medium text-accent-300">{job.company}</p>
                  {job.location && <p className="mt-1 text-sm text-fg-500">{job.location}</p>}
                </div>
              </div>

              {job.strengths.length > 0 && (
                <div className="mt-6 border-t border-line/5 pt-5">
                  {text['experience.strengths_heading'] && (
                    <h4 className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-accent2-300">
                      {text['experience.strengths_heading']}
                    </h4>
                  )}
                  {job.strengths.map((item, idx) => (
                    <BarItem key={idx} idx={idx + 1}>
                      {item}
                    </BarItem>
                  ))}
                </div>
              )}
            </Panel>

            {/* Responsibilities as an "active sessions" list */}
            {job.responsibilities.length > 0 && (
              <Panel title={job.role} hover={false} className="lg:col-span-3" bodyClassName="px-5 py-2">
                {job.responsibilities.map((item, idx) => (
                  <BarItem key={idx} idx={idx} right={String(idx + 1).padStart(2, '0')}>
                    {item}
                  </BarItem>
                ))}
              </Panel>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
