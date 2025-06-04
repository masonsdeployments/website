import { ApproachStep } from "../cards/ApproachStep";

const steps = [
  {
    step: "01",
    title: "Listen First",
    description:
      "We don't just ask what you want, we uncover what you actually need. Through user interviews, market analysis, and problem archaeology, we find the real challenge hiding behind the obvious one.",
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
      "We build like your users' lives depend on it; because sometimes they do. Every interaction is crafted, every edge case considered, every detail refined until it's not just functional, but meaningful.",
  },
  {
    step: "04",
    title: "Impact Amplification",
    description:
      "Launch is just the beginning. We measure what matters, iterate based on real usage, and continuously enhance until your solution doesn't just work.. it transforms lives.",
  },
];

export const ApproachSection = () => (
  <section
    id="approach"
    className="py-20 bg-secondary dark:bg-secondary/30 scroll-mt-24"
  >
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
