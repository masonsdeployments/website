import React, { ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import hljs from "highlight.js";

type HeadingProps = ComponentPropsWithoutRef<"h1">;
type ParagraphProps = ComponentPropsWithoutRef<"p">;
type ListProps = ComponentPropsWithoutRef<"ul">;
type ListItemProps = ComponentPropsWithoutRef<"li">;
type AnchorProps = ComponentPropsWithoutRef<"a">;
type BlockquoteProps = ComponentPropsWithoutRef<"blockquote">;
type TableProps = ComponentPropsWithoutRef<"table">;
type TheadProps = ComponentPropsWithoutRef<"thead">;
type TbodyProps = ComponentPropsWithoutRef<"tbody">;
type TrProps = ComponentPropsWithoutRef<"tr">;
type ThProps = ComponentPropsWithoutRef<"th">;
type TdProps = ComponentPropsWithoutRef<"td">;

const components = {
  h1: (props: HeadingProps) => (
    <h1
      className="scroll-m-20 text-5xl font-extrabold tracking-tight lg:text-6xl pt-14 mb-6 text-foreground"
      {...props}
    />
  ),
  h2: (props: HeadingProps) => (
    <h2
      className="scroll-m-20 text-4xl font-bold tracking-tight border-b border-border pb-2 mt-10 mb-4 text-foreground"
      {...props}
    />
  ),
  h3: (props: HeadingProps) => (
    <h3
      className="scroll-m-20 text-3xl font-semibold tracking-tight mt-8 mb-3 text-foreground"
      {...props}
    />
  ),
  h4: (props: HeadingProps) => (
    <h4
      className="scroll-m-20 text-2xl font-medium tracking-tight mt-6 mb-2 text-foreground"
      {...props}
    />
  ),
  p: (props: ParagraphProps) => (
    <p className="leading-relaxed text-lg text-foreground/90 mb-4" {...props} />
  ),
  ol: (props: ListProps) => (
    <ol
      className="list-decimal pl-6 space-y-2 text-foreground/85 mb-4"
      {...props}
    />
  ),
  ul: (props: ListProps) => (
    <ul
      className="list-disc pl-6 space-y-2 text-foreground/85 mb-4"
      {...props}
    />
  ),
  li: (props: ListItemProps) => (
    <li
      className="marker:text-primary text-base text-foreground/90"
      {...props}
    />
  ),
  em: (props: ComponentPropsWithoutRef<"em">) => (
    <em className="italic text-foreground/95" {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-bold text-foreground" {...props} />
  ),
  a: ({ href, children, ...props }: AnchorProps) => {
    const className =
      "font-medium underline underline-offset-4 text-primary hover:text-primary/80 transition-colors";
    if (href?.startsWith("/")) {
      return (
        <Link href={href} className={className} {...props}>
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        target={href?.startsWith("#") ? undefined : "_blank"}
        rel={href?.startsWith("#") ? undefined : "noopener noreferrer"}
        className={className}
        {...props}
      >
        {children}
      </a>
    );
  },
  code: ({ children, ...props }: ComponentPropsWithoutRef<"code">) => {
    const codeContent = children as string;
    let highlightedHTML: string;

    try {
      // Auto-detect language and highlight
      const result = hljs.highlightAuto(codeContent);
      highlightedHTML = result.value;
    } catch (error) {
      // Fallback to plain text if highlighting fails
      highlightedHTML = codeContent;
    }

    return (
      <code
        className="relative rounded bg-muted/70 px-[0.4rem] py-[0.25rem] font-mono text-base font-medium text-primary shadow-sm"
        dangerouslySetInnerHTML={{ __html: highlightedHTML }}
        {...props}
      />
    );
  },
  pre: ({ children, ...props }: ComponentPropsWithoutRef<"pre">) => (
    <pre
      className="mb-6 mt-4 overflow-x-auto rounded-lg border border-border bg-muted p-4 text-base shadow-md text-foreground custom-scroll [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-sm [&_code]:font-mono"
      {...props}
    >
      {children}
    </pre>
  ),
  Table: ({ data }: { data: { headers: string[]; rows: string[][] } }) => (
    <div className="overflow-x-auto my-6">
      <table className="w-full border-collapse text-base text-left rounded-lg overflow-hidden">
        <thead className="bg-muted/70">
          <tr>
            {data.headers.map((header, index) => (
              <th
                key={index}
                className="px-4 py-2 font-semibold text-foreground border-b border-border"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-background" : "bg-muted/50"}
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="px-4 py-2 border-b border-border text-foreground/80"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
  blockquote: (props: BlockquoteProps) => (
    <blockquote
      className="mt-6 border-l-4 pl-6 italic text-foreground/80 border-primary bg-muted/40 py-3 rounded-md"
      {...props}
    />
  ),
  table: (props: TableProps) => (
    <div className="overflow-x-auto my-6">
      <table
        className="w-full border-collapse text-base text-left rounded-lg overflow-hidden border border-border"
        {...props}
      />
    </div>
  ),
  thead: (props: TheadProps) => <thead className="bg-muted/70" {...props} />,
  tbody: (props: TbodyProps) => <tbody {...props} />,
  tr: (props: TrProps) => (
    <tr
      className="border-b border-border even:bg-muted/50 odd:bg-background hover:bg-muted/30 transition-colors"
      {...props}
    />
  ),
  th: (props: ThProps) => (
    <th
      className="px-4 py-3 font-semibold text-foreground border-b border-border text-left"
      {...props}
    />
  ),
  td: (props: TdProps) => (
    <td
      className="px-4 py-3 border-b border-border text-foreground/90"
      {...props}
    />
  ),
};

declare global {
  type MDXProvidedComponents = typeof components;
}

export function useMDXComponents(): MDXProvidedComponents {
  return components;
}
