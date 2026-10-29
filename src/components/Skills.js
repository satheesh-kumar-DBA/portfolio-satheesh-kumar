import { motion } from 'framer-motion';
import { scaleIn, staggerContainer } from '../animations';
import { barColors } from '../theme';
import { Panel, SectionHeading, SvgIcon } from './Common';
import { useSectionScheme } from '../themes/ThemeContext';

export default function Skills({ slug, title, eyebrow, index, technologies, skills, text }) {
  const scheme = useSectionScheme(slug);
  if (technologies.length === 0 && skills.length === 0) return null;

  return (
    <section id={slug} className={`px-4 py-20 sm:px-6 lg:px-8 ${scheme}`}>
      <div className="mx-auto max-w-7xl space-y-6">
        <SectionHeading title={title} eyebrow={eyebrow} index={index} />

        {technologies.length > 0 && (
          <Panel title={text['skills.technologies_heading']} hover={false} bodyClassName="p-5">
            <motion.div
              className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {technologies.map((tech) => (
                <motion.div
                  key={tech.id}
                  variants={scaleIn}
                  className="group flex flex-col items-center gap-3 rounded-xl border border-line/5 bg-ink-950/50 px-3 py-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-glow"
                >
                  <SvgIcon svg={tech.icon_svg} className="h-10 w-10 text-accent transition-transform duration-300 group-hover:scale-110" />
                  <p className="text-xs font-medium text-fg-300 group-hover:text-accent-200">{tech.name}</p>
                </motion.div>
              ))}
            </motion.div>
          </Panel>
        )}

        {skills.length > 0 && (
          <Panel title={text['skills.skills_heading']} accent="amber" hover={false} bodyClassName="grid gap-x-8 px-5 py-2 md:grid-cols-2">
            {skills.map((item, idx) => (
              <div key={item.id} className="flex items-start gap-3 border-b border-line/5 py-4">
                <span className={`mt-1.5 inline-block h-3.5 w-1 flex-shrink-0 rounded-sm ${barColors[idx % barColors.length]}`} />
                <div>
                  <h4 className="text-[15px] font-semibold text-fg-100">{item.name}</h4>
                  <p className="mt-1 text-sm leading-relaxed text-fg-400">{item.description}</p>
                </div>
              </div>
            ))}
          </Panel>
        )}
      </div>
    </section>
  );
}
