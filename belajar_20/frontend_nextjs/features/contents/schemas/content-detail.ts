import type { ContentMetricValues } from "@/features/contents/types/content-detail";

export type MetricField = keyof ContentMetricValues;
export type MetricFormValues = Record<MetricField, string>;
export type MetricFormErrors = Partial<Record<MetricField, string>>;

export const METRIC_FIELDS: MetricField[] = [
  "views",
  "likes",
  "comments",
  "shares",
];

export const METRIC_FIELD_LABELS: Record<MetricField, string> = {
  views: "Views",
  likes: "Likes",
  comments: "Comments",
  shares: "Shares",
};

export const initialMetricFormValues: MetricFormValues = {
  views: "",
  likes: "",
  comments: "",
  shares: "",
};

export function validatePublishedUrl(value: string): boolean {
  try {
    const url = new URL(value.trim());
    return (
      (url.protocol === "http:" || url.protocol === "https:") &&
      Boolean(url.hostname)
    );
  } catch {
    return false;
  }
}

export function validateMetricForm(values: MetricFormValues): MetricFormErrors {
  const errors: MetricFormErrors = {};

  for (const field of METRIC_FIELDS) {
    const value = values[field].trim();
    if (!/^\d+$/.test(value) || !Number.isSafeInteger(Number(value))) {
      errors[
        field
      ] = `${METRIC_FIELD_LABELS[field]} harus berupa bilangan bulat non-negatif.`;
    }
  }

  return errors;
}

export function sortMetricHistoryNewestFirst<T extends { recordedAt: string }>(
  snapshots: readonly T[]
): T[] {
  return [...snapshots].sort((first, second) =>
    second.recordedAt.localeCompare(first.recordedAt)
  );
}
