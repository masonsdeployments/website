import { ProjectCard } from "./ProjectCard";

const projects = [
  {
    badge: "AI Powered Mental Health",
    title: "Rafiqi",
    description:
      "We're developing an AI-driven mental health platforms that understand context, emotion, and individual needs. Our systems provide support that feels genuinely human.",
    href: "https://rafiqi.wearemasons.com",
  },
  {
    badge: "AI & Fintech (GDGC  AI Hackathon)",
    title: "repAI",
    description:
      "RepAi is an AI-driven web application that incentivizes recycling by providing real-time pricing for recyclable materials, connecting users with collectors, and rewarding them with cashback. By leveraging cutting-edge AI and financial technologies, RepAi transforms recycling into a profitable and sustainable activity for individuals and businesses.",
    href: "https://repai.wearemasons.com",
  },
  {
    badge: "Three.js & AI (Space Apps Cairo)",
    title: "Orbit",
    description:
      "Orbit is an interactive 3D web application designed to simulate the solar system and track Near-Earth Objects (NEOs). The project utilizes Next.js for the frontend, Three.js for 3D rendering, and a Golang backend. This was our official submission for the NASA Space Apps Cairo 2024 hackathon.",
    href: "https://orbit.wearemasons.com",
  },
  {
    badge: "AI (Space Apps Cairo)",
    title: "NAVRIS",
    description:
      "A hackathon project from NASA Space Apps Cairo 2023 built as an early warning system for natural disasters. It detects earthquakes (45% accuracy), storms (87%), and tornadoes (91%). It uses a Dot Matrix Generator to map longitude/latitude points with pressure, wind speed, and direction.",
    href: "https://rafiqi.wearemasons.com",
  },
];

export const ProjectsSection = () => (
  <section id="services" className="py-20 bg-background scroll-mt-24">
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          What we&apos;ve{" "}
          <span className="gradient-text font-serif not-italic">built</span>
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
