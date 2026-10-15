export const CHANNEL_PLATFORMS = [
  "youtube",
  "tiktok",
  "instagram",
  "linkedin",
] as const;

export type ChannelPlatform = (typeof CHANNEL_PLATFORMS)[number];

export const CHANNEL_PLATFORM_LABELS: Record<ChannelPlatform, string> = {
  youtube: "YouTube",
  tiktok: "TikTok",
  instagram: "Instagram",
  linkedin: "LinkedIn",
};
