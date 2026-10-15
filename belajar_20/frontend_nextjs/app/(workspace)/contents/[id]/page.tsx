import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ContentDetailPreview } from "@/components/contents/content-detail-preview";
import { contentDetailPreview } from "@/features/contents/mock/content-detail-preview";

export const metadata: Metadata = {
  title: "Content detail | Frame Creator Studio",
};

export function generateStaticParams() {
  return [{ id: contentDetailPreview.id }];
}

async function ContentDetailRoute({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (id !== contentDetailPreview.id) notFound();

  return <ContentDetailPreview content={contentDetailPreview} />;
}

export default function ContentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<div className="detail-loading-state" role="status">Loading content detail</div>}>
      <ContentDetailRoute params={params} />
    </Suspense>
  );
}