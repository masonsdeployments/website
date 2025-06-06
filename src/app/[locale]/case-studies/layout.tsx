import { MdxLayout } from "@/components/mdx-layout";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MdxLayout>{children}</MdxLayout>;
}
