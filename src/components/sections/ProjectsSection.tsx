import { TrendingUp, Users } from "lucide-react";
import { ProjectCard } from "../cards/ProjectCard";

const projects = [
  {
    badge: "AI + Mental Health",
    title: "Rafiqi",
    story:
      "Mental health support shouldn't feel like talking to a robot. We built Rafiqi as an AI companion that genuinely understands context, reads emotional nuance, and adapts to individual healing journeys. The result? Support that feels authentically human, available whenever someone needs it most—turning technology into a bridge to better mental health.",
    demoHref: "https://rafiqi.wearemasons.com/",
    caseStudyHref: "/case-studies/rafiqi",
  },
  {
    badge: "AI + Fintech",
    title: "repAI",
    story:
      "What if recycling could pay your bills? RepAI transforms environmental responsibility into personal profit by providing real-time pricing for recyclable materials, connecting users with collectors, and delivering instant cashback rewards. We've turned the circular economy into a win-win game where doing good for the planet literally pays off.",
    achievement: "GDGC AI Hackathon Top 7 Finalist",
    winner: true,
    demoHref: "https://repai.wearemasons.com/",
    caseStudyHref: "/case-studies/repai",
  },
  {
    badge: "3D Visualization",
    title: "Orbit",
    story:
      "Space shouldn't feel distant and incomprehensible. Orbit brings the cosmos to your screen through an interactive 3D solar system that tracks Near-Earth Objects in real-time. We've made asteroid awareness and space exploration accessible to everyone, turning complex astronomical data into an engaging, educational experience that sparks curiosity about our universe.",
    achievement: "NASA Space Apps Cairo 2024 Submission",
    metrics: [
      {
        label: "NEOs Tracked",
        value: "100+",
        icon: <TrendingUp className="h-4 w-4 text-purple-500" />,
      },
      {
        label: "Potential Reach",
        value: "10K+",
        icon: <Users className="h-4 w-4 text-blue-500" />,
      },
    ],
    demoHref: "https://orbit.wearemasons.com/",
    caseStudyHref: "/case-studies/orbit",
  },
  {
    badge: "Disaster Early Warning",
    title: "NAVERIS",
    story:
      "Seconds matter when disaster strikes. NAVERIS is our AI-powered early warning system that predicts natural disasters with remarkable accuracy—91% for tornadoes, 87% for storms. By analyzing environmental patterns invisible to the human eye, we're giving communities precious time to prepare, potentially saving thousands of lives with each alert.",
    achievement: "NASA Space Apps Cairo 2023 Submission",
    metrics: [
      {
        label: "Tornado Accuracy",
        value: "91%",
        icon: <TrendingUp className="h-4 w-4 text-red-500" />,
      },
      {
        label: "Storm Detection",
        value: "87%",
        icon: <TrendingUp className="h-4 w-4 text-blue-500" />,
      },
    ],
    codeHref: "https://github.com/wearemasons/NAVERIS",
    caseStudyHref: "/case-studies/naveris",
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
          Real Problems. Real Solutions. Real Impact.
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
