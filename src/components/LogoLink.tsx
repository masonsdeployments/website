"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useLenis } from "@/components/providers/LenisProvider";
import { LogoSvg } from "./LogoSvg";

const LogoLink = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { scrollTo } = useLenis();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (pathname === "/") {
      scrollTo(0);
    } else {
      router.push("/");
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Masons home"
      className="inline-flex items-center gap-2.5 transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg"
    >
      <LogoSvg className="text-primary cursor-pointer" width={44} height={44} />
    </button>
  );
};

export default LogoLink;
