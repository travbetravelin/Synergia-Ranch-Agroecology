"use client";

import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";

type Props = {
  source: MDXRemoteSerializeResult;
};

export default function ProseContent({ source }: Props) {
  return (
    <div className="prose">
      <MDXRemote {...source} />
    </div>
  );
}
