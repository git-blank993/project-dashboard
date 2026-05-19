"use client";

import dynamic from "next/dynamic";
import "@uiw/react-markdown-preview/markdown.css";

const MDEditorPreview = dynamic(
  () => import("@uiw/react-markdown-preview").then((mod) => mod.default),
  { ssr: false }
);

export function MarkdownPreview({ source }: { source: string }) {
  return (
    <div data-color-mode="light" className="dark:data-[color-mode='light']:dark w-full">
      <MDEditorPreview 
        source={source} 
        style={{ 
          backgroundColor: 'transparent',
          color: 'inherit',
          fontFamily: 'inherit'
        }} 
      />
    </div>
  );
}
