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
    <div className="mx-auto max-w-[1370px]">
      <div className="mb-7 flex items-center justify-between max-[640px]:items-start max-[640px]:gap-[14px]">
        <div>
          <p className="mb-3 text-[10px] font-bold tracking-[0.14em] text-[#53816c]">CONTENT OPERATIONS</p>
          <h1 className="m-0 font-serif text-[clamp(34px,4vw,46px)] font-normal leading-[1.08] text-[#1d2b24] max-[640px]:text-4xl">Content pipeline</h1>
          <p className="mt-[11px] max-w-[270px] text-[12px] leading-relaxed text-[#68746e] sm:text-[13px]">Every story, from the first spark to the final publish.</p>
        </div>
        <Button asChild className="mt-1 min-h-[39px] rounded-[5px] bg-[#1c644c] px-[13px] text-[11px] font-semibold text-white hover:bg-[#174f3d] max-[640px]:mt-[23px] max-[640px]:shrink-0">
          <Link href="/contents/new">
            <Plus aria-hidden="true" data-icon="inline-start" />
            New content
          </Link>
        </Button>
      </div>

      <section aria-label="Content lifecycle" className="overflow-hidden rounded-[9px] border border-[#e0e7e0] bg-[rgb(255_255_255/84%)] shadow-[0_12px_32px_rgb(30_56_41/4%)]">
        <div className="flex min-h-[92px] items-center justify-between border-b border-[#e8ede8] px-[25px] py-5 max-[640px]:min-h-[79px] max-[640px]:px-4">
          <div>
            <span className="mb-[7px] block text-[9px] font-bold tracking-[0.14em] text-[#78877e]">THE WORKFLOW</span>
            <h2 className="m-0 text-base font-semibold text-[#24332b]">Production stages</h2>
          </div>
          <span className="rounded bg-[#f0f4f0] px-[9px] py-[7px] text-[9px] font-bold tracking-[0.14em] text-[#65756b]">6 STAGES</span>
        </div>

        <ol className="m-0 grid min-w-[780px] grid-cols-6 overflow-x-auto px-6 py-0 [scrollbar-color:#becfc2_transparent] [scrollbar-width:thin] max-[640px]:min-w-[684px] max-[640px]:px-3">
          {CONTENT_STATUSES.map((status, index) => (
            <li className={`flex min-h-14 items-center gap-[9px] border-b border-[#e8ede8] px-[9px] ${index > 0 ? "border-l border-l-[#edf0ed]" : ""}`} key={status}>
              <span className={`text-[9px] tabular-nums ${index === 0 ? "text-[#26765b]" : "text-[#9aa49d]"}`}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="whitespace-nowrap text-[11px] font-semibold text-[#4d5c53]">{CONTENT_STATUS_LABELS[status]}</span>
              <span className={`ml-auto h-1 w-[18px] rounded-sm ${index === 0 ? "bg-[#7bb99a]" : "bg-[#d8e1da]"}`} aria-hidden="true" />
            </li>
          ))}
        </ol>

        <div className="border-b border-[#e8ede8] px-6 pb-5 pt-[18px] max-[640px]:px-[14px] max-[640px]:py-4">
          <div className="mb-[13px] flex items-center gap-2 text-[11px] font-semibold text-[#44544a]">
            <ListFilter aria-hidden="true" size={16} />
            <span>Filter content</span>
          </div>
          <form action="/contents" className="flex flex-wrap items-end gap-[11px] max-[640px]:grid max-[640px]:grid-cols-2" method="get">
            <div className="flex max-w-[220px] min-w-0 flex-[1_1_150px] flex-col gap-1.5 max-[640px]:max-w-none">
              <label className="text-[10px] font-semibold text-[#65736a]" htmlFor="filter-status">Status</label>
              <select className="h-[37px] w-full min-w-0 rounded-[5px] border border-[#d9e0d9] bg-white px-[10px] text-[11px] text-[#34443a]" defaultValue={selectedStatus} id="filter-status" name="status">
                <option value="">All statuses</option>
                {CONTENT_STATUSES.map((status) => (
                  <option key={status} value={status}>{CONTENT_STATUS_LABELS[status]}</option>
                ))}
              </select>
            </div>
            <div className="flex max-w-[220px] min-w-0 flex-[1_1_220px] flex-col gap-1.5 max-[640px]:col-span-full max-[640px]:max-w-none">
              <label className="text-[10px] font-semibold text-[#65736a]" htmlFor="filter-channel-id">Channel ID</label>
              <Input
                autoComplete="off"
                defaultValue={selectedChannelId}
                id="filter-channel-id"
                name="channel_id"
                placeholder="Filter by channel ID"
                className="h-[37px] rounded-[5px] border-[#d9e0d9] bg-white px-[10px] text-[11px] text-[#34443a]"
              />
            </div>
            <Button className="h-[37px] rounded-[5px] border-[#d9e0d9] text-[10px] text-[#425248]" type="submit" variant="outline">
              Apply filters
            </Button>
            {hasFilters && (
              <Button asChild className="h-[37px] rounded-[5px] text-[10px] max-[640px]:justify-center" variant="ghost">
                <Link href="/contents">Clear</Link>
              </Button>
            )}
          </form>
        </div>

        <div className="flex min-h-[285px] flex-col items-center justify-center px-5 pb-[38px] pt-[30px] text-center">
          <div className="relative mb-[17px] flex size-[58px] items-center justify-center rounded-full border border-[#e0e9e1] bg-[#f0f5f0] text-[#38775c]" aria-hidden="true">
            <Clapperboard size={24} strokeWidth={1.6} />
            <span className="absolute -right-[2px] -top-px size-[11px] rounded-full border-2 border-white bg-[#e6b94f]" />
          </div>
          <p className="mb-2 text-[9px] font-bold tracking-[0.14em] text-[#6a8a75]">{hasFilters ? "FILTERS READY" : "A CLEAR FRAME"}</p>
          <h3 className="m-0 font-serif text-[22px] font-normal text-[#24332b]">{hasFilters ? "Content results are not connected" : "No content loaded"}</h3>
          <p className="mt-[9px] max-w-[420px] text-[12px] leading-relaxed text-[#758078]">
            {hasFilters
              ? "Your filters are in the URL. Results will appear when the contents API is connected."
              : "The contents API is not connected yet, so there are no server records to show."}
          </p>
          {hasFilters && (
            <p className="mt-[15px] flex flex-wrap justify-center gap-2 text-[10px] text-[#65766a]">
              {selectedStatus && <span className="rounded border border-[#dfe9e0] bg-[#eef4ee] px-2 py-[5px]">Status: {CONTENT_STATUS_LABELS[selectedStatus]}</span>}
              {selectedChannelId && <span className="rounded border border-[#dfe9e0] bg-[#eef4ee] px-2 py-[5px]">Channel ID: {selectedChannelId}</span>}
            </p>
          )}
          <div className="mt-[22px] flex items-center justify-center gap-3 border-t border-[#edf0ed] pt-4">
            <span className="text-[8px] font-bold tracking-[0.1em] text-[#809087]">INTERACTIVE PREVIEW</span>
            <Button asChild className="h-8 rounded-[5px] border-[#d9e3d9] bg-white text-[9px] text-[#39644a]" variant="outline">
              <Link href="/contents/demo-42">
                Open sample detail
                <ArrowRight aria-hidden="true" data-icon="inline-end" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Alert className="mt-[18px] rounded-[7px] border-[#e8dfc2] bg-[#f8f6ed] px-[15px] py-[13px] text-[#65552e] [&_[data-slot=alert-title]]:text-[11px] [&_[data-slot=alert-title]]:font-semibold [&_[data-slot=alert-description]]:text-[10px] [&_[data-slot=alert-description]]:leading-normal [&_[data-slot=alert-description]]:text-[#7b7155]">
        <AlertTitle>Content API is not connected</AlertTitle>
        <AlertDescription>
          No records are loaded or saved. API response shape, format values, and channel data still need confirmation.
        </AlertDescription>
      </Alert>

      <footer className="mt-[21px] flex justify-between text-[8px] tracking-[0.12em] text-[#87928a] max-[640px]:gap-[18px] max-[640px]:text-[7px]">
        <span>FRAME STUDIO</span>
        <span>PLAN WITH INTENTION. PUBLISH WITH PURPOSE.</span>
      </footer>
    </div>
  );
}

function ContentPipelineFallback() {
  return (
    <div aria-busy="true" className="mx-auto max-w-[1370px]" role="status">
      <p className="mb-3 text-[10px] font-bold tracking-[0.14em] text-[#53816c]">CONTENT OPERATIONS</p>
      <h1 className="m-0 font-serif text-4xl font-normal text-[#1d2b24]">Loading content pipeline</h1>
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