import type {
  ContentFormat,
  ContentPriority,
  ContentStatus,
} from "@/features/contents/types/content";
import type { ChannelPlatform } from "@/features/channels/types/channel";

export type ContentMetricValues = {
  views_count: number;
  likes_count: number;
  comments_count: number;
  shares_count: number;
};

export type ContentMetricSnapshot = ContentMetricValues & {
  id: string;
  recorded_at: string;
};

export type ChecklistPreviewItem = {
  id: string;
  task_name: string;
  is_completed: boolean;
};

export type ContentDetailPreviewRecord = {
  id: string;
  title: string;
  channel: {
    id: string;
    platform: ChannelPlatform;
    handle_name: string;
  };
  format_type: ContentFormat;
  description: string;
  script_draft: string;
  priority: ContentPriority;
  scheduled_date: string | null;
  published_date: string | null;
  status: ContentStatus;
  published_url?: string;
  checklists: ChecklistPreviewItem[];
  metrics: ContentMetricSnapshot[];
};
