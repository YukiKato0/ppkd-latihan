import type { ContentStatus } from "@/features/contents/types/content";
import type { ChannelPlatform } from "@/features/channels/types/channel";

export type ContentMetricValues = {
  views: number;
  likes: number;
  comments: number;
  shares: number;
};

export type ContentMetricSnapshot = ContentMetricValues & {
  id: string;
  recordedAt: string;
};

export type ChecklistPreviewItem = {
  id: string;
  task: string;
  is_completed: boolean;
};

export type ContentDetailPreviewRecord = {
  id: string;
  title: string;
  channel: {
    id: string;
    name: string;
    platform: ChannelPlatform;
  };
  format_type: string;
  description: string;
  script: string;
  status: ContentStatus;
  published_url?: string;
  checklists: ChecklistPreviewItem[];
  metrics: ContentMetricSnapshot[];
};
