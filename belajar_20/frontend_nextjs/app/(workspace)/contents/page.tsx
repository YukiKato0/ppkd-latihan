import Link from "next/link";
import { Suspense } from "react";
import { ArrowRight, Clapperboard, ListFilter, Plus } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CONTENT_STATUSES,
  CONTENT_STATUS_LABELS,
  isContentStatus,
  type ContentStatus,
} from "@/features/contents/types/content";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function getSingleValue(value: string | string[] | undefined): string {
  return typeof value === "string" ? value : "";
}

async function ContentPipelineContent({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const rawStatus = getSingleValue(params.status);
  const selectedStatus: ContentStatus | "" = isContentStatus(rawStatus) ? rawStatus : "";
  const selectedChannelId = getSingleValue(params.channel_id).trim();
  const hasFilters = Boolean(selectedStatus || selectedChannelId);

  return (
    <div className="pipeline-page">
      <div className="page-heading-row content-heading-row">
        <div>
          <p className="eyebrow">CONTENT OPERATIONS</p>
          <h1>Content pipeline</h1>
          <p className="page-description">Every story, from the first spark to the final publish.</p>
        </div>
        <Button asChild className="content-create-button">
          <Link href="/contents/new">
            <Plus aria-hidden="true" data-icon="inline-start" />
            New content
          </Link>
        </Button>
      </div>

      <section aria-label="Content lifecycle" className="pipeline-section">
        <div className="pipeline-section-heading">
          <div>
            <span className="section-kicker">THE WORKFLOW</span>
            <h2>Production stages</h2>
          </div>
          <span className="pipeline-view-label">6 STAGES</span>
        </div>

        <ol className="content-stage-list">
          {CONTENT_STATUSES.map((status, index) => (
            <li className="content-stage-item" key={status}>
              <span className={`stage-index${index === 0 ? " stage-index-first" : ""}`}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="stage-name">{CONTENT_STATUS_LABELS[status]}</span>
              <span className="stage-track" aria-hidden="true" />
            </li>
          ))}
        </ol>

        <div className="content-filter-toolbar">
          <div className="content-filter-title">
            <ListFilter aria-hidden="true" size={16} />
            <span>Filter content</span>
          </div>
          <form action="/contents" className="content-filter-form" method="get">
            <div className="content-filter-field">
              <label htmlFor="filter-status">Status</label>
              <select defaultValue={selectedStatus} id="filter-status" name="status">
                <option value="">All statuses</option>
                {CONTENT_STATUSES.map((status) => (
                  <option key={status} value={status}>{CONTENT_STATUS_LABELS[status]}</option>
                ))}
              </select>
            </div>
            <div className="content-filter-field content-channel-filter">
              <label htmlFor="filter-channel-id">Channel ID</label>
              <Input
                autoComplete="off"
                defaultValue={selectedChannelId}
                id="filter-channel-id"
                name="channel_id"
                placeholder="Filter by channel ID"
              />
            </div>
            <Button className="content-filter-submit" type="submit" variant="outline">
              Apply filters
            </Button>
            {hasFilters && (
              <Button asChild className="content-filter-clear" variant="ghost">
                <Link href="/contents">Clear</Link>
              </Button>
            )}
          </form>
        </div>

        <div className="content-results-state">
          <div className="empty-mark" aria-hidden="true">
            <Clapperboard size={24} strokeWidth={1.6} />
            <span />
          </div>
          <p className="empty-eyebrow">{hasFilters ? "FILTERS READY" : "A CLEAR FRAME"}</p>
          <h3>{hasFilters ? "Content results are not connected" : "No content loaded"}</h3>
          <p className="empty-description">
            {hasFilters
              ? "Your filters are in the URL. Results will appear when the contents API is connected."
              : "The contents API is not connected yet, so there are no server records to show."}
          </p>
          {hasFilters && (
            <p className="content-active-filters">
              {selectedStatus && <span>Status: {CONTENT_STATUS_LABELS[selectedStatus]}</span>}
              {selectedChannelId && <span>Channel ID: {selectedChannelId}</span>}
            </p>
          )}
          <div className="content-demo-link-row">
            <span>INTERACTIVE PREVIEW</span>
            <Button asChild className="content-demo-link" variant="outline">
              <Link href="/contents/demo-42">
                Open sample detail
                <ArrowRight aria-hidden="true" data-icon="inline-end" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Alert className="content-api-notice">
        <AlertTitle>Content API is not connected</AlertTitle>
        <AlertDescription>
          No records are loaded or saved. API response shape, format values, and channel data still need confirmation.
        </AlertDescription>
      </Alert>

      <footer className="pipeline-footer">
        <span>FRAME STUDIO</span>
        <span>PLAN WITH INTENTION. PUBLISH WITH PURPOSE.</span>
      </footer>
    </div>
  );
}

function ContentPipelineFallback() {
  return (
    <div aria-busy="true" className="pipeline-page content-loading-state" role="status">
      <p className="eyebrow">CONTENT OPERATIONS</p>
      <h1>Loading content pipeline</h1>
    </div>
  );
}

export default function ContentPipelinePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <Suspense fallback={<ContentPipelineFallback />}>
      <ContentPipelineContent searchParams={searchParams} />
    </Suspense>
  );
}