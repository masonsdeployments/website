import { ProjectCard } from "./ProjectCard";

const projects = [
  {
    badge: "AI & Mental Health",
    title: "Empathetic AI Systems",
    description:
      "We develop AI-driven mental health platforms that understand context, emotion, and individual needs. Our systems provide support that feels genuinely human.",
    href: "#",
  },
  {
    badge: "Human-Centered Platforms",
    title: "Intuitive Interfaces",
    description:
      "We design and build platforms that feel natural to use. Every interaction is crafted to reduce friction and increase understanding between humans and technology.",
  },
  {
    badge: "Systems Architecture",
    title: "Scalable Infrastructure",
    description:
      "We architect systems that grow with your needs while maintaining performance and reliability. Built for the long term, designed for real-world usage.",
  },
  {
    badge: "Product Strategy",
    title: "Thoughtful Development",
    description:
      "We help you navigate from idea to impact. Our strategic approach ensures every feature serves a purpose and every launch creates genuine value.",
  },
];

export const ProjectsSection = () => (
  <section id="services" className="py-20 bg-background scroll-mt-24">
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          What we{" "}
          <span className="gradient-text font-serif not-italic">build</span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          From concept to deployment, we create technology that makes a
          meaningful difference in people&apos;s lives.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {projects.map((project, i) => (
          <ProjectCard key={i} {...project} />
        ))}
      </div>
    </div>
  </section>
);
