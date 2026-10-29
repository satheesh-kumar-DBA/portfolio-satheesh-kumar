import { SectionHeading, SvgIcon, externalProps } from './Common';
import ContactForm from './ContactForm';
import { useSectionScheme } from '../themes/ThemeContext';

export default function Contact({ slug, title, eyebrow, index, profile, socialLinks, text }) {
  const scheme = useSectionScheme(slug);
  const links = socialLinks.filter((l) => l.show_in_contact);

  return (
    <section id={slug} className={`px-4 py-20 sm:px-6 lg:px-8 ${scheme}`}>
      <div className="mx-auto max-w-7xl">
        <SectionHeading title={title} eyebrow={eyebrow} index={index} />
        {profile.contact_message && <p className="mb-10 max-w-2xl text-lg leading-relaxed text-fg-400">{profile.contact_message}</p>}

        <div className="grid gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <ContactForm text={text} />
          </div>

          <div className="flex flex-col gap-4 lg:col-span-2">
            {links.map((link, idx) => (
              <a
                key={link.id}
                href={link.url}
                {...externalProps(link.url)}
                className="panel panel-hover shadow-panel group flex items-center gap-4 p-5"
              >
                <div
                  className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border transition-transform duration-300 group-hover:scale-105 ${
                    idx % 2 ? 'border-accent2/30 bg-accent2/10 text-accent2-300' : 'border-accent/30 bg-accent/10 text-accent-300'
                  }`}
                >
                  <SvgIcon svg={link.icon_svg} className="h-6 w-6" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-fg-100 transition-colors group-hover:text-accent-200">{link.label}</h3>
                  {link.display_text && <p className="mt-0.5 break-all text-sm text-fg-400">{link.display_text}</p>}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
