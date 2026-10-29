import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../animations';
import { pick, tagColors } from '../theme';
import { useSectionScheme, useTheme } from '../themes/ThemeContext';
import { ArrowIcon, SectionHeading, SvgIcon, externalProps, useTilt } from './Common';

function Tags({ tags }) {
  if (!tags.length) return null;
  return (
    <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 rounded-md border border-line/5 bg-ink-950/50 px-3 py-2">
      {tags.map((tag) => (
        <span key={tag.name} className="flex items-center gap-1.5 text-xs text-fg-400">
          <span className={`h-2.5 w-2.5 rounded-sm ${pick(tagColors, tag.color, 'slate')}`} />
          {tag.name}
        </span>
      ))}
    </div>
  );
}

function ProjectLink({ project, className = '' }) {
  if (!project.link_url) return null;
  return (
    <a
      href={project.link_url}
      {...externalProps(project.link_url)}
      className={`inline-flex items-center text-sm font-semibold text-accent-300 transition-colors hover:text-accent-200 ${className}`}
    >
      {project.link_label}
      <ArrowIcon />
    </a>
  );
}

function ProjectCard({ project, idx, featured }) {
  const tilt = useTilt(6);
  return (
    <motion.article
      variants={fadeInUp}
      className={`panel panel-hover shadow-panel group flex flex-col ${featured ? 'md:col-span-2 lg:row-span-2' : ''}`}
      {...tilt}
    >
      <div className="flex items-center justify-between gap-3 border-b border-line/5 px-5 py-3.5">
        <span className="flex items-center gap-2.5 text-sm font-semibold text-fg-200">
          <span className={`bar-item__bar inline-block h-3.5 w-1 rounded-sm ${idx % 2 ? 'bg-accent2' : 'bg-accent'}`} />
          {project.category}
        </span>
        <SvgIcon svg={project.icon_svg} className="h-6 w-6 text-accent" />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className={`font-display font-semibold leading-snug text-fg-50 transition-colors group-hover:text-accent-200 ${featured ? 'text-2xl md:text-3xl' : 'text-xl'}`}>
          {project.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-fg-400">{project.description}</p>

        {project.image_url && (
          <div className="mt-5 overflow-hidden rounded-lg border border-line/10 bg-ink-950">
            <img
              src={project.image_url}
              alt={project.image_alt || project.title}
              className="h-auto w-full opacity-90 transition-opacity duration-300 group-hover:opacity-100"
              loading="lazy"
            />
          </div>
        )}

        <Tags tags={project.tags} />
        <ProjectLink project={project} className="mt-auto pt-5" />
      </div>
    </motion.article>
  );
}

// Minimal Editorial: numbered, text-led case studies
function EditorialProject({ project, idx }) {
  return (
    <motion.article variants={fadeInUp} className="grid gap-8 border-t border-fg-200/30 py-12 md:grid-cols-12">
      <div className="md:col-span-7">
        <p className="text-xs uppercase tracking-[0.3em] text-fg-500">
          <span className="mr-3 text-accent">{String(idx + 1).padStart(2, '0')}</span>
          {project.category}
        </p>
        <h3 className="mt-4 font-display text-3xl font-semibold leading-tight text-fg-50 md:text-4xl">{project.title}</h3>
        <p className="mt-5 text-base leading-8 text-fg-400">{project.description}</p>
        {project.tags.length > 0 && <p className="mt-5 text-sm text-fg-500">{project.tags.map((t) => t.name).join(' · ')}</p>}
        <ProjectLink project={project} className="mt-6" />
      </div>
      {project.image_url && (
        <div className="md:col-span-5">
          <img src={project.image_url} alt={project.image_alt || project.title} className="w-full border border-fg-200/30" loading="lazy" />
        </div>
      )}
    </motion.article>
  );
}

export default function Projects({ slug, title, eyebrow, index, projects }) {
  const theme = useTheme();
  const scheme = useSectionScheme(slug);
  if (projects.length === 0) return null;

  // Bento features the first project that has a screenshot
  const featuredIdx = theme.projects === 'bento' ? Math.max(projects.findIndex((p) => p.image_url), 0) : -1;

  return (
    <section id={slug} className={`px-4 py-20 sm:px-6 lg:px-8 ${scheme}`}>
      <div className="mx-auto max-w-7xl">
        <SectionHeading title={title} eyebrow={eyebrow} index={index} />

        {theme.projects === 'editorial' ? (
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }} variants={staggerContainer}>
            {projects.map((project, idx) => (
              <EditorialProject key={project.id} project={project} idx={idx} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            className={`grid gap-6 md:grid-cols-2 lg:grid-cols-3 ${theme.projects === 'bento' ? 'grid-flow-dense' : ''}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
          >
            {projects.map((project, idx) => (
              <ProjectCard key={project.id} project={project} idx={idx} featured={idx === featuredIdx} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
