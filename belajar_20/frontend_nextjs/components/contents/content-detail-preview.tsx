"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ClipboardCheck,
  ExternalLink,
  Plus,
  Sparkles,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  CONTENT_FORMAT_LABELS,
  CONTENT_STATUSES,
  CONTENT_STATUS_LABELS,
  type ContentStatus,
} from "@/features/contents/types/content";
import {
  initialMetricFormValues,
  METRIC_FIELDS,
  METRIC_FIELD_LABELS,
  sortMetricHistoryNewestFirst,
  validateMetricForm,
  validatePublishedUrl,
  type MetricFormErrors,
  type MetricFormValues,
  type MetricField,
} from "@/features/contents/schemas/content-detail";
import type {
  ChecklistPreviewItem,
  ContentDetailPreviewRecord,
  ContentMetricSnapshot,
  ContentMetricValues,
} from "@/features/contents/types/content-detail";

function formatNumber(value: number): string {
  return new Intl.NumberFormat("id-ID").format(value);
}

function statusBadgeClass(status: ContentStatus): string {
  const classes: Record<ContentStatus, string> = {
    idea: "border-[#e6e8cf] bg-[#f3f4e9] text-[#737642]",
    scripting: "border-[#d8e6ea] bg-[#eef4f6] text-[#4b727d]",
    recording: "border-[#d8e6ea] bg-[#eef4f6] text-[#4b727d]",
    editing: "border-[#ecdfbf] bg-[#f8f2e6] text-[#8b6e31]",
    ready: "border-[#d8e8d8] bg-[#edf5ed] text-[#47794f]",
    published: "border-[#cde5d6] bg-[#e7f3ec] text-[#286b4b]",
  };
  return classes[status];
}

export function ContentDetailPreview({ content }: { content: ContentDetailPreviewRecord }) {
  const [status, setStatus] = useState<ContentStatus>(content.status);
  const [publishedUrl, setPublishedUrl] = useState(content.published_url ?? "");
  const [isPublishDialogOpen, setIsPublishDialogOpen] = useState(false);
  const [publishUrlInput, setPublishUrlInput] = useState("");
  const [publishError, setPublishError] = useState("");
  const [checklist, setChecklist] = useState<ChecklistPreviewItem[]>(content.checklists);
  const [newTask, setNewTask] = useState("");
  const [metrics, setMetrics] = useState<ContentMetricValues[]>(content.metrics);
  const [metricHistory, setMetricHistory] = useState<ContentMetricSnapshot[]>(() => (
    sortMetricHistoryNewestFirst(content.metrics)
  ));
  const [metricValues, setMetricValues] = useState<MetricFormValues>(initialMetricFormValues);
  const [metricErrors, setMetricErrors] = useState<MetricFormErrors>({});
  const [previewMessage, setPreviewMessage] = useState("");

  const completedTasks = checklist.filter((item) => item.is_completed).length;
  const checklistProgress = checklist.length === 0 ? 0 : Math.round((completedTasks / checklist.length) * 100);
  const currentStatusIndex = CONTENT_STATUSES.indexOf(status);

  function toggleChecklistItem(itemId: string, isCompleted: boolean) {
    setChecklist((items) => items.map((item) => (
      item.id === itemId ? { ...item, is_completed: isCompleted } : item
    )));
    setPreviewMessage("Checklist diperbarui di preview lokal; belum disimpan ke server.");
  }

  function addChecklistItem(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const task = newTask.trim();
    if (!task) return;

    setChecklist((items) => [
      ...items,
      { id: `local-${Date.now()}`, task_name: task, is_completed: false },
    ]);
    setNewTask("");
    setPreviewMessage("Task ditambahkan ke preview lokal; belum disimpan ke server.");
  }

  function updateMetric(field: MetricField, value: string) {
    setMetricValues((currentValues) => ({ ...currentValues, [field]: value }));
    setMetricErrors((currentErrors) => ({ ...currentErrors, [field]: undefined }));
  }

  function recordMetrics(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateMetricForm(metricValues);
    setMetricErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const values = Object.fromEntries(
      METRIC_FIELDS.map((field) => [field, Number(metricValues[field])]),
    ) as ContentMetricValues;
    const recordedAt = new Date().toISOString();
    const snapshot: ContentMetricSnapshot = {
      id: `local-${Date.now()}`,
      recorded_at: recordedAt.slice(0, 10),
      ...values,
    };

    setMetrics((history) => [...history, values]);
    setMetricHistory((history) => [snapshot, ...history]);
    setMetricValues(initialMetricFormValues);
    setPreviewMessage("Snapshot metrik ditambahkan ke preview lokal; belum disimpan ke server.");
  }

  function moveToNextStage() {
    if (status === "ready") {
      setPublishUrlInput(publishedUrl);
      setPublishError("");
      setIsPublishDialogOpen(true);
      return;
    }

    const nextStatus = CONTENT_STATUSES[currentStatusIndex + 1];
    if (nextStatus) {
      setStatus(nextStatus);
      setPreviewMessage(`Status preview berubah ke ${CONTENT_STATUS_LABELS[nextStatus]}; belum disimpan ke server.`);
    }
  }

  function publishContent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validatePublishedUrl(publishUrlInput)) {
      setPublishError("Masukkan URL publikasi yang valid dengan protokol http atau https.");
      return;
    }

    setPublishedUrl(publishUrlInput.trim());
    setStatus("published");
    setIsPublishDialogOpen(false);
    setPreviewMessage("Status dan URL berubah di preview lokal; backend belum menerima perubahan.");
  }

  return (
    <div className="mx-auto max-w-330">
      <Button asChild className="-ml-2.5 mb-6 text-[11px] text-[#65736a]" variant="ghost">
        <Link href="/contents"><ArrowLeft aria-hidden="true" className="size-[15px]" /> Back to pipeline</Link>
      </Button>

      <header className="mb-5.75 flex items-end justify-between gap-5.5 max-[640px]:flex-col max-[640px]:items-start max-[640px]:gap-3.5">
        <div>
          <p className="mb-3 text-[10px] font-bold tracking-[0.14em] text-[#53816c]">CONTENT DETAIL</p>
          <h1 className="m-0 max-w-190 font-serif text-[clamp(31px,3.2vw,42px)] font-normal leading-[1.12] text-[#1d2b24] max-[640px]:text-[34px]">{content.title}</h1>
          <p className="mt-2.5 flex flex-wrap gap-2.25 text-[11px] text-[#728077]">
            {content.channel.handle_name} <span className="text-[#b3bdb5]" aria-hidden="true">/</span> {CONTENT_FORMAT_LABELS[content.format_type]}
          </p>
        </div>
        <div className="flex flex-none items-center gap-2.25 max-[640px]:w-full max-[640px]:justify-between">
          <Badge className="h-6.25 rounded border-[#e8dbb3] bg-[#f8f2dd] text-[8px] font-bold tracking-[0.08em] text-[#796735]" variant="outline">PREVIEW DATA</Badge>
          <Button asChild className="h-8.75 rounded-[5px] border-[#dce4dc] bg-white text-[10px] text-[#425248]" variant="outline">
            <Link href={`/contents/${content.id}/edit`}>Edit details</Link>
          </Button>
        </div>
      </header>

      <Alert className="mb-5 grid-cols-[18px_1fr] rounded-[7px] border-[#dbe7d8] bg-[#f3f6ef] px-3.5 py-3 text-[#365943] [&>svg]:mt-px [&>svg]:text-[#67875e] **:data-[slot=alert-title]:text-[10px] **:data-[slot=alert-title]:font-semibold **:data-[slot=alert-description]:text-[10px] **:data-[slot=alert-description]:leading-normal **:data-[slot=alert-description]:text-[#64776a]">
        <Sparkles aria-hidden="true" />
        <AlertTitle>Local preview only</AlertTitle>
        <AlertDescription>
          Checklist, status, publish URL, and metrics below are sample data. Changes in this view reset on reload and are not sent to the backend.
        </AlertDescription>
      </Alert>

      {previewMessage && <p className="-mt-1.75 mb-4.5 border-l-[3px] border-[#629273] bg-[#edf4ee] px-3 py-2.25 text-[10px] leading-normal text-[#3d624b]" role="status">{previewMessage}</p>}

      <div className="grid grid-cols-[minmax(0,1.45fr)_minmax(330px,0.85fr)] items-start gap-5 max-[920px]:grid-cols-1">
        <div className="flex min-w-0 flex-col gap-4.25">
          <section aria-labelledby="checklist-title" className="min-w-0 rounded-lg border border-[#e0e7e0] bg-[rgb(255_255_255/92%)] p-5 max-[640px]:px-3.5 max-[640px]:py-4">
            <div className="mb-3.75 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="inline-flex size-8.5 items-center justify-center rounded-md border border-[#e0e9e1] bg-[#edf4ee] text-[#38775c]"><ClipboardCheck aria-hidden="true" size={17} /></span>
                <div>
                  <p className="mb-1.25 text-[8px] font-bold tracking-[0.14em] text-[#78877e]">PRODUCTION</p>
                  <h2 className="m-0 text-sm font-semibold text-[#24332b]" id="checklist-title">Checklist</h2>
                </div>
              </div>
              <span className="whitespace-nowrap text-[9px] text-[#7b877f]">{completedTasks} / {checklist.length} complete</span>
            </div>

            <Progress aria-label="Checklist completion" className="mb-2 h-1.25 bg-[#e8eee8] **:data-[slot=progress-indicator]:bg-[#438362]" value={checklistProgress} />

            <ul className="m-0 list-none p-0">
              {checklist.map((item) => (
                <li className="flex min-h-11.75 items-center gap-2.75 border-b border-[#edf0ed]" key={item.id}>
                  <Checkbox
                    className="size-4.25 flex-[0_0_17px] rounded border-[#c5d2c6] data-[state=checked]:border-[#2e7555] data-[state=checked]:bg-[#2e7555] data-[state=checked]:text-white"
                    checked={item.is_completed}
                    id={`checklist-${item.id}`}
                    onCheckedChange={(checked) => toggleChecklistItem(item.id, checked === true)}
                  />
                  <label
                    className={`flex-1 cursor-pointer py-3 text-[11px] leading-normal ${item.is_completed ? "text-[#8a948d] line-through decoration-[#a8b3aa]" : "text-[#435349]"}`}
                    htmlFor={`checklist-${item.id}`}
                  >
                    {item.task_name}
                  </label>
                  {item.is_completed && <Check aria-hidden="true" className="flex-none text-[#4c8968]" size={15} />}
                </li>
              ))}
            </ul>

            <form className="mt-3.5 flex gap-2" onSubmit={addChecklistItem}>
              <Input
                aria-label="New checklist task"
                maxLength={120}
                onChange={(event) => setNewTask(event.target.value)}
                placeholder="Add a production task"
                value={newTask}
                className="h-9.25 rounded-[5px] border-[#dce4dc] text-[11px]"
              />
              <Button aria-label="Add checklist task" className="size-9.25 flex-[0_0_37px] rounded-[5px] border-[#dce4dc] text-[#42654f]" disabled={!newTask.trim()} size="icon" type="submit" variant="outline">
                <Plus aria-hidden="true" />
              </Button>
            </form>
          </section>

          <section aria-labelledby="brief-title" className="min-w-0 rounded-lg border border-[#e0e7e0] bg-[rgb(255_255_255/92%)] p-5 max-[640px]:px-3.5 max-[640px]:py-4">
            <div className="mb-3.75 flex items-center justify-between gap-3">
              <div>
                <p className="mb-1.25 text-[8px] font-bold tracking-[0.14em] text-[#78877e]">CREATIVE BRIEF</p>
                <h2 className="m-0 text-sm font-semibold text-[#24332b]" id="brief-title">Description & script</h2>
              </div>
              <Button asChild className="h-7.5 px-2.25 text-[10px] text-[#557260]" variant="ghost">
                <Link href={`/contents/${content.id}/edit`}>Edit</Link>
              </Button>
            </div>
            <p className="m-0 text-[11px] leading-[1.7] text-[#55645a]">{content.description}</p>
            <p className="mt-3 text-[10px] text-[#78837b]">Priority: {content.priority} <span aria-hidden="true">·</span> Scheduled: {content.scheduled_date ?? "Not set"}</p>
            <pre className="mt-3.75 wrap-break-word whitespace-pre-wrap border-l-2 border-[#cbdccb] bg-[#f7f9f6] px-3.5 py-3 font-sans text-[10px] leading-[1.8] text-[#57665c]">{content.script_draft}</pre>
          </section>

          {publishedUrl && (
            <section aria-labelledby="published-link-title" className="min-w-0 rounded-lg border border-[#e0e7e0] bg-[rgb(255_255_255/92%)] p-5 max-[640px]:px-3.5 max-[640px]:py-4">
              <div>
                <p className="mb-1.25 text-[8px] font-bold tracking-[0.14em] text-[#78877e]">PUBLISHED LINK</p>
                <h2 className="m-0 text-sm font-semibold text-[#24332b]" id="published-link-title">Public URL</h2>
              </div>
              <a className="mt-3 flex items-center gap-2 text-[10px] text-[#25674d] no-underline" href={publishedUrl} rel="noreferrer" target="_blank">
                <span className="min-w-0 break-all">{publishedUrl}</span>
                <ExternalLink aria-hidden="true" size={15} />
              </a>
            </section>
          )}
        </div>

        <aside className="flex min-w-0 flex-col gap-4.25 max-[920px]:grid max-[920px]:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] max-[640px]:flex">
          <section aria-labelledby="status-title" className="min-w-0 rounded-lg border border-[#e0e7e0] bg-[rgb(255_255_255/92%)] p-5 max-[640px]:px-3.5 max-[640px]:py-4">
            <div className="mb-3.75 flex items-center justify-between gap-3">
              <div>
                <p className="mb-1.25 text-[8px] font-bold tracking-[0.14em] text-[#78877e]">LIFECYCLE</p>
                <h2 className="m-0 text-sm font-semibold text-[#24332b]" id="status-title">Production status</h2>
              </div>
            </div>
            <Badge className={`mb-3.5 h-6.25 rounded text-[9px] ${statusBadgeClass(status)}`} variant="outline">
              {CONTENT_STATUS_LABELS[status]}
            </Badge>
            <ol className="mb-4.5 ml-1.25 flex list-none flex-col border-l border-[#dfe7df] p-0">
              {CONTENT_STATUSES.map((stage, index) => (
                <li className={`relative flex min-h-7.75 items-center gap-2.5 pl-3 text-[10px] ${index === currentStatusIndex ? "font-semibold text-[#365843]" : index < currentStatusIndex ? "text-[#89948c]" : "text-[#89948c]"}`} aria-current={index === currentStatusIndex ? "step" : undefined} key={stage}>
                  <span className={`absolute -left-1.25 size-2.25 rounded-full border-2 border-white ${index <= currentStatusIndex ? "bg-[#448564] shadow-[0_0_0_1px_#448564]" : "bg-[#d7e0d8]"}`} />
                  <span>{CONTENT_STATUS_LABELS[stage]}</span>
                </li>
              ))}
            </ol>
            <Button
              className="h-9.5 bg-[#1c644c] text-[10px] text-white hover:bg-[#174f3d]"
              disabled={status === "published"}
              onClick={moveToNextStage}
              type="button"
            >
              {status === "ready" ? "Add URL & publish" : "Move to next stage"}
              <ArrowRight aria-hidden="true" data-icon="inline-end" />
            </Button>
            <p className="mt-2.25 text-[9px] leading-normal text-[#929c94]">Status changes here are local preview only.</p>
          </section>

          <section aria-labelledby="metrics-title" className="min-w-0 rounded-lg border border-[#e0e7e0] bg-[rgb(255_255_255/92%)] p-5 max-[640px]:px-3.5 max-[640px]:py-4">
            <div className="mb-3.75 flex items-end justify-between gap-3">
              <div>
                <p className="mb-1.25 text-[8px] font-bold tracking-[0.14em] text-[#78877e]">PERFORMANCE</p>
                <h2 className="m-0 text-sm font-semibold text-[#24332b]" id="metrics-title">Record metrics</h2>
              </div>
              <span className="whitespace-nowrap text-[9px] text-[#7b877f]">{metrics.length} snapshots</span>
            </div>
            <form className="border-b border-[#e9eee8] pb-4.25" noValidate onSubmit={recordMetrics}>
              <div className="grid grid-cols-2 gap-3 max-[640px]:gap-2.5">
                {METRIC_FIELDS.map((field) => (
                  <div className="flex min-w-0 flex-col gap-1.5" key={field}>
                    <Label htmlFor={`metric-${field}`}>{METRIC_FIELD_LABELS[field]}</Label>
                    <Input
                      aria-invalid={Boolean(metricErrors[field])}
                      aria-describedby={metricErrors[field] ? `metric-${field}-error` : undefined}
                      id={`metric-${field}`}
                      inputMode="numeric"
                      min="0"
                      onChange={(event) => updateMetric(field, event.target.value)}
                      type="number"
                      value={metricValues[field]}
                      className="h-8.75 rounded-[5px] border-[#dce4dc] bg-white px-2.25 text-[11px] text-[#34443a] aria-invalid:border-[#bd5149]"
                    />
                    {metricErrors[field] && (
                      <p className="m-0 text-[9px] leading-normal text-[#a33e37]" id={`metric-${field}-error`}>
                        {metricErrors[field]}
                      </p>
                    )}
                  </div>
                ))}
              </div>
              <Button className="mt-3 h-8.25 w-full rounded-[5px] border-[#d9e2da] text-[9px] text-[#42604d]" type="submit" variant="outline">
                Record snapshot
              </Button>
            </form>

            <div className="mb-2.25 mt-4 flex items-center justify-between">
              <h3 className="m-0 text-[10px] font-semibold text-[#415147]">Metrics history</h3>
              <span className="text-[8px] text-[#929c94]">Newest first</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-110 border-collapse">
                <thead>
                  <tr>
                    <th className="px-1.5 py-2 text-right text-[8px] font-semibold text-[#87928a] first:text-left" scope="col">Date</th>
                    <th className="px-1.5 py-2 text-right text-[8px] font-semibold text-[#87928a]" scope="col">Views</th>
                    <th className="px-1.5 py-2 text-right text-[8px] font-semibold text-[#87928a]" scope="col">Likes</th>
                    <th className="px-1.5 py-2 text-right text-[8px] font-semibold text-[#87928a]" scope="col">Comments</th>
                    <th className="px-1.5 py-2 text-right text-[8px] font-semibold text-[#87928a]" scope="col">Shares</th>
                  </tr>
                </thead>
                <tbody>
                  {metricHistory.map((snapshot) => (
                    <tr key={snapshot.id}>
                      <td className="whitespace-nowrap border-t border-[#edf0ed] px-1.5 py-2.25 text-left text-[9px] text-[#536259]"><time dateTime={snapshot.recorded_at}>{snapshot.recorded_at}</time></td>
                      <td className="whitespace-nowrap border-t border-[#edf0ed] px-1.5 py-2.25 text-right text-[9px] text-[#536259]">{formatNumber(snapshot.views_count)}</td>
                      <td className="whitespace-nowrap border-t border-[#edf0ed] px-1.5 py-2.25 text-right text-[9px] text-[#536259]">{formatNumber(snapshot.likes_count)}</td>
                      <td className="whitespace-nowrap border-t border-[#edf0ed] px-1.5 py-2.25 text-right text-[9px] text-[#536259]">{formatNumber(snapshot.comments_count)}</td>
                      <td className="whitespace-nowrap border-t border-[#edf0ed] px-1.5 py-2.25 text-right text-[9px] text-[#536259]">{formatNumber(snapshot.shares_count)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </aside>
      </div>

      <Dialog open={isPublishDialogOpen} onOpenChange={setIsPublishDialogOpen}>
        <DialogContent className="max-w-110 gap-4.5 rounded-lg max-[640px]:p-5">
          <DialogHeader>
            <p className="mb-1.25 text-[8px] font-bold tracking-[0.14em] text-[#78877e]">FINAL STEP</p>
            <DialogTitle className="font-serif text-[22px] font-normal text-[#24332b]">Publish this content?</DialogTitle>
            <DialogDescription className="text-[10px] leading-normal text-[#718077]">
              Add the public URL before moving this preview to Published.
            </DialogDescription>
          </DialogHeader>
          <form className="flex flex-col gap-4.25" noValidate onSubmit={publishContent}>
            <div className="flex min-w-0 flex-col gap-1.5">
              <Label htmlFor="published-url">Published URL</Label>
              <Input
                aria-invalid={Boolean(publishError)}
                aria-describedby={publishError ? "published-url-error" : undefined}
                autoComplete="url"
                id="published-url"
                inputMode="url"
                onChange={(event) => {
                  setPublishUrlInput(event.target.value);
                  setPublishError("");
                }}
                placeholder="https://..."
                type="url"
                value={publishUrlInput}
                className="h-9.75 rounded-[5px] border-[#d9e0d9] bg-white text-[11px]"
              />
              {publishError && <p className="m-0 text-[9px] leading-normal text-[#a33e37]" id="published-url-error">{publishError}</p>}
            </div>
            <DialogFooter className="gap-2 max-[640px]:flex-col-reverse [&_button]:rounded-[5px] [&_button]:text-[10px] max-[640px]:[&_button]:w-full">
              <Button onClick={() => setIsPublishDialogOpen(false)} type="button" variant="outline">
                Cancel
              </Button>
              <Button className="h-9.5 rounded-[5px] bg-[#1c644c] text-[10px] text-white hover:bg-[#174f3d]" type="submit">Publish preview</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}