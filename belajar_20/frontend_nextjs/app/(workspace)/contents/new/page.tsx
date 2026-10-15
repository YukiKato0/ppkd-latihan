import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContentForm } from "@/components/contents/content-form";

export const metadata: Metadata = {
  title: "New content | Frame Creator Studio",
};

export default function NewContentPage() {
  return (
    <div className="content-editor-page">
      <Button asChild className="content-back-link" variant="ghost">
        <Link href="/contents"><ArrowLeft aria-hidden="true" /> Back to pipeline</Link>
      </Button>
      <div className="content-editor-heading">
        <p className="eyebrow">CONTENT OPERATIONS</p>
        <h1>New content</h1>
        <p className="page-description">Start with the essentials. The details can find their shape as you work.</p>
      </div>
      <ContentForm mode="create" />
    </div>
  );
}