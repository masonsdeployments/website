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
      className="scroll-m-24 font-serif text-4xl font-bold leading-[1.04] tracking-[-0.02em] text-foreground sm:text-5xl lg:text-6xl mb-6"
      {...props}
    />
  ),
  h2: (props: HeadingProps) => (
    <h2
      className="scroll-mt-28 font-serif text-2xl font-bold tracking-tight border-b border-border/50 pb-2.5 mt-12 mb-4 text-foreground sm:text-3xl"
      {...props}
    />
  ),
  h3: (props: HeadingProps) => (
    <h3
      className="scroll-m-24 font-serif text-xl font-semibold tracking-tight mt-8 mb-3 text-foreground sm:text-2xl"
      {...props}
    />
  ),
  h4: (props: HeadingProps) => (
    <h4
      className="scroll-m-24 text-sm font-semibold uppercase tracking-[0.1em] mt-6 mb-2 text-primary"
      {...props}
    />
  ),
  p: (props: ParagraphProps) => (
    <p
      className="text-base leading-relaxed text-muted-foreground mb-4"
      {...props}
    />
  ),
  ol: (props: ListProps) => (
    <ol
      className="list-decimal ps-6 space-y-2 text-base text-muted-foreground mb-5"
      {...props}
    />
  ),
  ul: (props: ListProps) => (
    <ul
      className="list-disc ps-6 space-y-2 text-base text-muted-foreground mb-5"
      {...props}
    />
  ),
  li: (props: ListItemProps) => (
    <li
      className="marker:text-primary text-base leading-relaxed text-muted-foreground"
      {...props}
    />
  ),
  hr: (props: ComponentPropsWithoutRef<"hr">) => (
    <hr className="my-10 border-border/50" {...props} />
  ),
  em: (props: ComponentPropsWithoutRef<"em">) => (
    <em className="italic text-foreground/90" {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-semibold text-foreground" {...props} />
  ),
  a: ({ href, children, ...props }: AnchorProps) => {
    const className =
      "font-medium underline decoration-border underline-offset-4 text-foreground hover:text-primary hover:decoration-primary transition-colors";
    if (href?.startsWith("/")) {
      return (
        <Link href={href} className={className} {...props}>
          {children}
        </Link>
      );
    }
    const isHash = href?.startsWith("#");
    return (
      <a
        href={href}
        target={isHash ? undefined : "_blank"}
        rel={isHash ? undefined : "noopener noreferrer"}
        className={className}
        {...props}
      >
        {children}
      </a>
    );
  },
  code: ({ children, ...props }: ComponentPropsWithoutRef<"code">) => {
    const codeContent =
      typeof children === "string" ? children : String(children ?? "");
    let highlightedHTML: string;

    try {
      const result = hljs.highlightAuto(codeContent);
      highlightedHTML = result.value;
    } catch {
      highlightedHTML = codeContent;
    }

    return (
      <code
        className="relative rounded-md bg-muted/70 px-1.5 py-0.5 font-mono text-xs font-medium text-primary"
        dangerouslySetInnerHTML={{ __html: highlightedHTML }}
        {...props}
      />
    );
  },
  pre: ({ children, ...props }: ComponentPropsWithoutRef<"pre">) => (
    <pre
      className="mb-6 mt-4 overflow-x-auto rounded-2xl border border-border/60 bg-card/75 p-4 text-xs text-foreground custom-scroll [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-xs [&_code]:font-mono"
      {...props}
    >
      {children}
    </pre>
  ),
  Table: ({ data }: { data: { headers: string[]; rows: string[][] } }) => (
    <div className="surface-card my-6 overflow-x-auto rounded-2xl">
      <table className="w-full border-collapse text-start text-base">
        <thead className="bg-muted/45">
          <tr>
            {data.headers.map((header, index) => (
              <th
                key={index}
                className="border-b border-border/60 px-4 py-3 text-start text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground"
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
              className="border-b border-border/40 last:border-b-0 even:bg-muted/20"
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="px-4 py-3 text-base text-foreground/90"
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
      className="my-6 rounded-r-xl border-s-2 border-primary bg-card/65 py-3 ps-5 pe-4 text-base italic text-muted-foreground"
      {...props}
    />
  ),
  table: (props: TableProps) => (
    <div className="surface-card my-6 overflow-x-auto rounded-2xl">
      <table className="w-full border-collapse text-start text-base" {...props} />
    </div>
  ),
  thead: (props: TheadProps) => <thead className="bg-muted/45" {...props} />,
  tbody: (props: TbodyProps) => <tbody {...props} />,
  tr: (props: TrProps) => (
    <tr
      className="border-b border-border/40 last:border-b-0 even:bg-muted/20"
      {...props}
    />
  ),
  th: (props: ThProps) => (
    <th
      className="border-b border-border/60 px-4 py-3 text-start text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground"
      {...props}
    />
  ),
  td: (props: TdProps) => (
    <td className="px-4 py-3 text-base text-foreground/90" {...props} />
  ),
};

declare global {
  type MDXProvidedComponents = typeof components;
}

export function useMDXComponents(): MDXProvidedComponents {
  return components;
}
