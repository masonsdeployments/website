import { usePathname, useRouter } from "next/navigation";
import { LogoSvg } from "./LogoSvg"; // or wherever you're importing from

const LogoLink = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push("/");
    }
  };

  return (
    <button
      onClick={handleClick}
      className="gradient-text hover:opacity-80 transition-opacity"
    >
      <LogoSvg className="text-primary cursor-pointer" width={60} height={60} />
    </button>
  );
};

export default LogoLink;
