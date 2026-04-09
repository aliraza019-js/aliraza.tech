import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  getProjectBySlug,
  getProjectSlugs,
} from "@/data/projects";
import ProjectCover from "@/components/ProjectCover";
import GalleryTallCard from "@/components/GalleryTallCard";
import Navbar from "@/components/Navbar";

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return params.then(({ slug }) => {
    const project = getProjectBySlug(slug);
    if (!project) return { title: "Project Not Found" };
    return {
      title: `${project.subtitle} | Ali Raza`,
      description: project.cardDesc,
    };
  });
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <>
      <Navbar />

      <main className="pt-16 overflow-x-hidden">
        {/* ========== BREADCRUMBS ========== */}
        <div className="bg-surface-container-low border-b border-white/5">
          <div className="container mx-auto px-8 md:px-20 py-3">
            <nav className="flex items-center gap-2 text-xs font-medium">
              <Link
                href="/"
                className="text-white/40 hover:text-white transition-colors"
              >
                Home
              </Link>
              <span className="material-symbols-outlined text-white/20 text-xs">
                chevron_right
              </span>
              <Link
                href="/projects"
                className="text-white/40 hover:text-white transition-colors"
              >
                Projects
              </Link>
              <span className="material-symbols-outlined text-white/20 text-xs">
                chevron_right
              </span>
              <span className="text-white/70">{project.subtitle}</span>
            </nav>
          </div>
        </div>

        {/* ========== HERO BANNER ========== */}
        <section className="relative w-full overflow-hidden">
          <ProjectCover slug={project.slug} title={project.title} variant="hero" />
          <div className="absolute bottom-0 left-0 right-0 px-8 md:px-20 pb-10">
            <div className="container mx-auto">
              <div className="flex flex-wrap gap-3">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-1.5 rounded-full bg-surface-container-highest/80 backdrop-blur-sm text-on-surface text-xs font-bold uppercase tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ========== STATS ROW ========== */}
        <section className="bg-surface-container-low">
          <div className="container mx-auto px-8 md:px-20 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {project.stats.map((stat) => (
                <div key={stat.label} className="flex items-start gap-4">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-3xl md:text-4xl font-black text-primary-fixed font-headline">
                        {stat.value}
                      </span>
                      {stat.icon && (
                        <span
                          className="material-symbols-outlined text-primary-fixed text-xl"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          {stat.icon}
                        </span>
                      )}
                    </div>
                    <span className="text-on-surface-variant text-sm">
                      {stat.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== THE CHALLENGE ========== */}
        <section className="py-24 px-8 md:px-20">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-[280px_1fr] gap-16 mb-16">
              <div>
                <span className="text-primary-fixed font-bold tracking-[0.2em] uppercase text-xs mb-3 block">
                  The Challenge
                </span>
              </div>
              <div className="space-y-6">
                {project.challenge.map((para, i) => (
                  <p
                    key={i}
                    className="text-on-surface-variant leading-relaxed"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {project.challengeCards.map((card) => (
                <div
                  key={card.title}
                  className="glass-card rounded-2xl p-6 flex items-center gap-4"
                >
                  <div className="w-12 h-12 bg-surface-container-highest rounded-xl flex items-center justify-center shrink-0">
                    <span
                      className="material-symbols-outlined text-primary-fixed"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {card.icon}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-headline font-bold text-sm mb-1">
                      {card.title}
                    </h4>
                    <p className="text-on-surface-variant text-xs">
                      {card.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== OUR SOLUTION ========== */}
        <section className="py-24 px-8 md:px-20 bg-surface-container-lowest">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-[280px_1fr] gap-16 mb-16">
              <div>
                <span className="text-primary-fixed font-bold tracking-[0.2em] uppercase text-xs mb-3 block">
                  Our Solution
                </span>
              </div>
              <div />
            </div>

            {/* Solution Image */}
            <div className="relative max-w-4xl mx-auto mb-16 rounded-3xl overflow-hidden">
              <Image
                src={project.solution.image}
                alt="Solution overview"
                width={1200}
                height={675}
                className="w-full object-cover"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 800px"
                quality={75}
              />
            </div>

            {/* Solution Description */}
            <p className="text-on-surface-variant leading-relaxed max-w-3xl mx-auto mb-16 text-center">
              {project.solution.description}
            </p>

            {/* Solution Features */}
            <div className="max-w-3xl mx-auto space-y-10">
              {project.solution.features.map((feature) => (
                <div key={feature.title} className="flex gap-6">
                  <div className="w-12 h-12 bg-primary-fixed/10 rounded-xl flex items-center justify-center shrink-0 mt-1">
                    <span
                      className="material-symbols-outlined text-primary-fixed"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {feature.icon}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-headline font-bold text-lg mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-on-surface-variant text-sm leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== GALLERY ========== */}
        {project.gallery && project.gallery.length > 0 && (
          <section className="py-24 px-8 md:px-20 bg-surface-container-low">
            <div className="container mx-auto">
              <div className="text-center mb-14">
                <span className="text-primary-fixed font-bold tracking-[0.2em] uppercase text-xs mb-3 block">
                  Project Screenshots
                </span>
                <h2 className="font-headline text-3xl md:text-4xl font-black tracking-tight">
                  A Closer Look
                </h2>
              </div>
              {(() => {
                const tallItems = project.gallery!.filter((item) => item.tall);
                const shortItems = project.gallery!.filter((item) => !item.tall);
                return (
                  <>
                    {/* Tall images: 2-column grid with capped preview + expand */}
                    {tallItems.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {tallItems.map((item, i) => (
                          <GalleryTallCard key={`tall-${i}`} item={item} />
                        ))}
                      </div>
                    )}
                    {/* Short images: standard 2-column grid */}
                    {shortItems.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {shortItems.map((item, i) => (
                          <div
                            key={`short-${i}`}
                            className="group relative rounded-2xl overflow-hidden border border-outline-variant/10 bg-surface-container"
                          >
                            <Image
                              src={item.src}
                              alt={item.caption}
                              width={800}
                              height={500}
                              className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.02]"
                              loading="lazy"
                              sizes="(max-width: 768px) 100vw, 50vw"
                              quality={75}
                            />
                            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                            <p className="absolute bottom-4 left-4 text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              {item.caption}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          </section>
        )}

        {/* ========== TECH STACK ========== */}
        {project.techStack && project.techStack.length > 0 && (
          <section className="py-16 px-8 md:px-20">
            <div className="container mx-auto">
              <div className="flex flex-col md:flex-row items-center gap-6 justify-center">
                <span className="text-primary-fixed font-bold tracking-[0.2em] uppercase text-xs">
                  Built With
                </span>
                <div className="flex flex-wrap gap-3 justify-center">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 rounded-xl bg-surface-container-high border border-outline-variant/15 text-sm font-medium text-on-surface"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ========== THE RESULTS ========== */}
        <section className="py-24 px-8 md:px-20">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-[280px_1fr] gap-16 mb-16">
              <div>
                <span className="text-primary-fixed font-bold tracking-[0.2em] uppercase text-xs mb-3 block">
                  The Results
                </span>
              </div>
              <p className="text-on-surface-variant leading-relaxed">
                {project.results.description}
              </p>
            </div>

            {/* Testimonial */}
            <div className="max-w-3xl mx-auto bg-surface-container rounded-3xl p-10 md:p-14">
              <p className="text-on-surface text-lg md:text-xl leading-relaxed mb-8 italic">
                &ldquo;{project.results.testimonial.quote}&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-fixed/20 rounded-full flex items-center justify-center">
                  <span
                    className="material-symbols-outlined text-primary-fixed"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    person
                  </span>
                </div>
                <div>
                  <div className="font-headline font-bold text-sm">
                    {project.results.testimonial.author}
                  </div>
                  <div className="text-on-surface-variant text-xs">
                    {project.results.testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      
      </main>

      {/* Footer */}
      <footer className="bg-[#0E0E0E] w-full pt-16 pb-0">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12">
            <div>
              <h3 className="text-2xl font-black text-white font-headline mb-8">
                Ali Raza
              </h3>
              <div className="flex items-center gap-0">
                <div className="flex items-center gap-3 bg-transparent border border-outline-variant/30 rounded-l-xl px-4 py-3 flex-1">
                  <span
                    className="material-symbols-outlined text-on-surface-variant text-lg"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    mail
                  </span>
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="bg-transparent text-white text-sm outline-none w-full placeholder:text-on-surface-variant"
                  />
                </div>
                <button className="bg-primary-container text-on-primary-container px-5 py-3 rounded-r-xl font-bold text-sm whitespace-nowrap hover:bg-surface-tint transition-all cursor-pointer flex items-center gap-1">
                  For Query{" "}
                  <span className="material-symbols-outlined text-base">
                    chevron_right
                  </span>
                </button>
              </div>
            </div>
            <div>
              <h4 className="text-base font-bold text-white mb-6">
                Quick Link
              </h4>
              <div className="flex gap-8 text-sm text-on-surface-variant">
                <Link href="/#services" className="hover:text-white transition-colors">
                  Service
                </Link>
                <Link href="/#projects" className="hover:text-white transition-colors">
                  Projects
                </Link>
                <Link href="/#contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </div>
            </div>
            <div>
              <h4 className="text-base font-bold text-white mb-6">Address</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary-container text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
                  <span className="text-sm text-on-surface-variant">Lahore, Punjab Pakistan</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary-container text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>mail</span>
                  <span className="text-sm text-on-surface-variant">contact@aliraza.tech</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary-container text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>call</span>
                  <span className="text-sm text-on-surface-variant">+92 (333) 4039462</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-outline-variant/10 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-on-surface-variant">Copyright @2026, All Rights Reserved</div>
            <div className="flex items-center gap-6 text-sm text-on-surface-variant font-medium">
              <a href="https://www.upwork.com/freelancers/~01b8e90b25b218f09a" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Upwork</a>
              <a href="https://www.fiverr.com/aliraza019" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Fiverr</a>
              <a href="https://github.com/aliraza019-js" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Github</a>
              <a href="https://www.linkedin.com/in/aliraza175/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Linkedin</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
