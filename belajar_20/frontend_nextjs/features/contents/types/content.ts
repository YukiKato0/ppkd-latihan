export const CONTENT_STATUSES = [
  "idea",
  "scripting",
  "recording",
  "editing",
  "ready",
  "published",
] as const;

export type ContentStatus = (typeof CONTENT_STATUSES)[number];

export const CONTENT_STATUS_LABELS: Record<ContentStatus, string> = {
  idea: "Idea",
  scripting: "Scripting",
  recording: "Recording",
  editing: "Editing",
  ready: "Ready",
  published: "Published",
};

export function isContentStatus(value: string): value is ContentStatus {
  return CONTENT_STATUSES.some((status) => status === value);
}
