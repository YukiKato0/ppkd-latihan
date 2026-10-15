import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContentForm } from "@/components/contents/content-form";

export const metadata: Metadata = {
  title: "Edit content | Frame Creator Studio",
};

async function EditContentContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="content-editor-page">
      <Button asChild className="content-back-link" variant="ghost">
        <Link href="/contents"><ArrowLeft aria-hidden="true" /> Back to pipeline</Link>
      </Button>
      <div className="content-editor-heading">
        <p className="eyebrow">CONTENT OPERATIONS</p>
        <h1>Edit content</h1>
        <p className="page-description">Record {id}</p>
      </div>
      <ContentForm contentId={id} mode="edit" />
    </div>
  );
}

export default function EditContentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense fallback={<div className="content-edit-loading" role="status">Loading content record</div>}>
      <EditContentContent params={params} />
    </Suspense>
  );
}