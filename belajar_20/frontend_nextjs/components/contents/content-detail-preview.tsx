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

function metricSnapshotDate(value: string): string {
  return value.slice(0, 10);
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
      { id: `local-${Date.now()}`, task, is_completed: false },
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
      recordedAt,
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
    <div className="content-detail-page">
      <Button asChild className="content-back-link" variant="ghost">
        <Link href="/contents"><ArrowLeft aria-hidden="true" /> Back to pipeline</Link>
      </Button>

      <header className="detail-heading">
        <div>
          <p className="eyebrow">CONTENT DETAIL</p>
          <h1>{content.title}</h1>
          <p className="detail-subtitle">
            {content.channel.name} <span aria-hidden="true">/</span> {content.format_type}
          </p>
        </div>
        <div className="detail-heading-actions">
          <Badge className="preview-badge" variant="outline">PREVIEW DATA</Badge>
          <Button asChild className="detail-edit-button" variant="outline">
            <Link href={`/contents/${content.id}/edit`}>Edit details</Link>
          </Button>
        </div>
      </header>

      <Alert className="detail-preview-alert">
        <Sparkles aria-hidden="true" />
        <AlertTitle>Local preview only</AlertTitle>
        <AlertDescription>
          Checklist, status, publish URL, and metrics below are sample data. Changes in this view reset on reload and are not sent to the backend.
        </AlertDescription>
      </Alert>

      {previewMessage && <p className="detail-preview-message" role="status">{previewMessage}</p>}

      <div className="content-detail-grid">
        <div className="detail-primary-column">
          <section aria-labelledby="checklist-title" className="detail-section">
            <div className="detail-section-heading">
              <div className="detail-section-title">
                <span className="detail-section-icon"><ClipboardCheck aria-hidden="true" size={17} /></span>
                <div>
                  <p className="section-kicker">PRODUCTION</p>
                  <h2 id="checklist-title">Checklist</h2>
                </div>
              </div>
              <span className="checklist-count">{completedTasks} / {checklist.length} complete</span>
            </div>

            <Progress aria-label="Checklist completion" className="detail-progress" value={checklistProgress} />

            <ul className="detail-checklist">
              {checklist.map((item) => (
                <li className="detail-checklist-item" key={item.id}>
                  <Checkbox
                    checked={item.is_completed}
                    id={`checklist-${item.id}`}
                    onCheckedChange={(checked) => toggleChecklistItem(item.id, checked === true)}
                  />
                  <label
                    className={item.is_completed ? "checklist-task checklist-task-complete" : "checklist-task"}
                    htmlFor={`checklist-${item.id}`}
                  >
                    {item.task}
                  </label>
                  {item.is_completed && <Check aria-hidden="true" className="checklist-complete-mark" size={15} />}
                </li>
              ))}
            </ul>

            <form className="checklist-add-form" onSubmit={addChecklistItem}>
              <Input
                aria-label="New checklist task"
                maxLength={120}
                onChange={(event) => setNewTask(event.target.value)}
                placeholder="Add a production task"
                value={newTask}
              />
              <Button aria-label="Add checklist task" disabled={!newTask.trim()} size="icon" type="submit" variant="outline">
                <Plus aria-hidden="true" />
              </Button>
            </form>
          </section>

          <section aria-labelledby="brief-title" className="detail-section">
            <div className="detail-section-heading">
              <div>
                <p className="section-kicker">CREATIVE BRIEF</p>
                <h2 id="brief-title">Description & script</h2>
              </div>
              <Button asChild className="detail-inline-edit" variant="ghost">
                <Link href={`/contents/${content.id}/edit`}>Edit</Link>
              </Button>
            </div>
            <p className="detail-description">{content.description}</p>
            <pre className="detail-script">{content.script}</pre>
          </section>

          {publishedUrl && (
            <section aria-labelledby="published-link-title" className="detail-section published-link-section">
              <div>
                <p className="section-kicker">PUBLISHED LINK</p>
                <h2 id="published-link-title">Public URL</h2>
              </div>
              <a href={publishedUrl} rel="noreferrer" target="_blank">
                <span>{publishedUrl}</span>
                <ExternalLink aria-hidden="true" size={15} />
              </a>
            </section>
          )}
        </div>

        <aside className="detail-sidebar-column">
          <section aria-labelledby="status-title" className="detail-section detail-status-section">
            <div className="detail-section-heading">
              <div>
                <p className="section-kicker">LIFECYCLE</p>
                <h2 id="status-title">Production status</h2>
              </div>
            </div>
            <Badge className={`content-status-badge status-${status}`} variant="outline">
              {CONTENT_STATUS_LABELS[status]}
            </Badge>
            <ol className="detail-status-steps">
              {CONTENT_STATUSES.map((stage, index) => (
                <li aria-current={index === currentStatusIndex ? "step" : undefined} key={stage}>
                  <span className={index <= currentStatusIndex ? "status-step-mark status-step-active" : "status-step-mark"} />
                  <span>{CONTENT_STATUS_LABELS[stage]}</span>
                </li>
              ))}
            </ol>
            <Button
              className="detail-advance-button"
              disabled={status === "published"}
              onClick={moveToNextStage}
              type="button"
            >
              {status === "ready" ? "Add URL & publish" : "Move to next stage"}
              <ArrowRight aria-hidden="true" data-icon="inline-end" />
            </Button>
            <p className="detail-rule-note">Status changes here are local preview only.</p>
          </section>

          <section aria-labelledby="metrics-title" className="detail-section detail-metrics-section">
            <div className="detail-section-heading">
              <div>
                <p className="section-kicker">PERFORMANCE</p>
                <h2 id="metrics-title">Record metrics</h2>
              </div>
              <span className="metrics-total">{metrics.length} snapshots</span>
            </div>
            <form className="detail-metrics-form" noValidate onSubmit={recordMetrics}>
              <div className="detail-metrics-fields">
                {METRIC_FIELDS.map((field) => (
                  <div className="detail-metric-field" key={field}>
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
                    />
                    {metricErrors[field] && (
                      <p className="detail-field-error" id={`metric-${field}-error`}>
                        {metricErrors[field]}
                      </p>
                    )}
                  </div>
                ))}
              </div>
              <Button className="detail-metrics-submit" type="submit" variant="outline">
                Record snapshot
              </Button>
            </form>

            <div className="detail-history-heading">
              <h3>Metrics history</h3>
              <span>Newest first</span>
            </div>
            <div className="metrics-history-scroll">
              <table className="metrics-history-table">
                <thead>
                  <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Views</th>
                    <th scope="col">Likes</th>
                    <th scope="col">Comments</th>
                    <th scope="col">Shares</th>
                  </tr>
                </thead>
                <tbody>
                  {metricHistory.map((snapshot) => (
                    <tr key={snapshot.id}>
                      <td><time dateTime={snapshot.recordedAt}>{metricSnapshotDate(snapshot.recordedAt)}</time></td>
                      <td>{formatNumber(snapshot.views)}</td>
                      <td>{formatNumber(snapshot.likes)}</td>
                      <td>{formatNumber(snapshot.comments)}</td>
                      <td>{formatNumber(snapshot.shares)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </aside>
      </div>

      <Dialog open={isPublishDialogOpen} onOpenChange={setIsPublishDialogOpen}>
        <DialogContent className="publish-dialog">
          <DialogHeader>
            <p className="section-kicker">FINAL STEP</p>
            <DialogTitle>Publish this content?</DialogTitle>
            <DialogDescription>
              Add the public URL before moving this preview to Published.
            </DialogDescription>
          </DialogHeader>
          <form className="publish-url-form" noValidate onSubmit={publishContent}>
            <div className="detail-metric-field">
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
              />
              {publishError && <p className="detail-field-error" id="published-url-error">{publishError}</p>}
            </div>
            <DialogFooter className="publish-dialog-footer">
              <Button onClick={() => setIsPublishDialogOpen(false)} type="button" variant="outline">
                Cancel
              </Button>
              <Button className="detail-advance-button" type="submit">Publish preview</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}