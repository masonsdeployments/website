import { ApproachStep } from "./ApproachStep";

const steps = [
  {
    step: "01",
    title: "Listen First",
    description:
      "Before we write a single line of code, we listen. We understand your users, your challenges, and your vision. This foundation shapes everything that follows.",
  },
  {
    step: "02",
    title: "Design with Intent",
    description:
      "Every feature exists for a reason. We design systems that solve real problems, not just showcase cool technology. Purpose drives every decision.",
  },
  {
    step: "03",
    title: "Build to Last",
    description:
      "We craft code like we're building cathedrals — with attention to detail, structural integrity, and the understanding that others will inherit our work.",
  },
  {
    step: "04",
    title: "Iterate with Empathy",
    description:
      "We test, learn, and improve. But we never lose sight of the humans using our creations. Every iteration brings us closer to meaningful impact.",
  },
];

export const ApproachSection = () => (
  <section id="approach" className="py-20 bg-secondary/30 scroll-mt-24">
    <div className="container mx-auto px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-8">
          Our{" "}
          <span className="gradient-text font-serif not-italic">approach</span>
        </h2>

        <div className="text-left mt-16 space-y-12">
          {steps.map((step, i) => (
            <ApproachStep key={i} {...step} />
          ))}
        </div>
      </div>
    </div>
  </section>
);
