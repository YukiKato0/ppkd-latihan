import type { ContentDetailPreviewRecord } from "@/features/contents/types/content-detail";

export const contentDetailPreview: ContentDetailPreviewRecord = {
  id: "demo-42",
  title: "A quiet morning inside the studio",
  channel: {
    id: "preview-channel-01",
    name: "Frame Studio",
    platform: "youtube",
  },
  format_type: "Short-form video",
  description:
    "A short behind-the-scenes story about turning a rough idea into a finished frame.",
  script:
    "Open on the studio lights.\nShow the first sketch.\nCut to the final frame.\nClose with the sound of the room going quiet.",
  status: "editing",
  checklists: [
    { id: "task-01", task: "Shape the opening hook", is_completed: true },
    { id: "task-02", task: "Record the voiceover", is_completed: true },
    { id: "task-03", task: "Add captions and sound mix", is_completed: false },
    { id: "task-04", task: "Review the final export", is_completed: false },
  ],
  metrics: [
    {
      id: "snapshot-01",
      recordedAt: "2026-10-08T10:00:00.000Z",
      views: 1840,
      likes: 163,
      comments: 21,
      shares: 14,
    },
    {
      id: "snapshot-02",
      recordedAt: "2026-10-12T10:00:00.000Z",
      views: 2675,
      likes: 224,
      comments: 32,
      shares: 27,
    },
  ],
};
