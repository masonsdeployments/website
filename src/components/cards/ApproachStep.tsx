type ApproachStepProps = {
  step: string;
  title: string;
  description: string;
};

export const ApproachStep = ({
  step,
  title,
  description,
}: ApproachStepProps) => (
  <div className="border-l-4 border-primary pl-8">
    <h3 className="text-2xl font-semibold mb-4 font-mono">
      {step}. {title}
    </h3>
    <p className="text-xl text-muted-foreground leading-relaxed">
      {description}
    </p>
  </div>
);
