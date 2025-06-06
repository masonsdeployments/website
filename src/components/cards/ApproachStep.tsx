import { useEffect, useState } from "react";

type ApproachStepProps = {
  step: string;
  title: string;
  description: string;
};

export const ApproachStep = ({
  step,
  title,
  description,
}: ApproachStepProps) => {
  const [isRtl, setIsRtl] = useState(false);
  useEffect(() => {
    setIsRtl(document.body.getAttribute("data-rtl") === "true");
    const observer = new MutationObserver(() => {
      setIsRtl(document.body.getAttribute("data-rtl") === "true");
    });
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-rtl"],
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={
        isRtl
          ? "border-r-4 border-primary pr-8"
          : "border-l-4 border-primary pl-8"
      }
    >
      <h3 className="text-2xl font-semibold mb-4 font-mono">
        {step}. {title}
      </h3>
      <p className="text-xl text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
};
