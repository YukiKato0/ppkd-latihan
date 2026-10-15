export type ContentFormField = "title" | "channel_id" | "format_type";
export type ContentFormValues = Record<ContentFormField, string> & {
  description: string;
  script: string;
};
export type ContentFormErrors = Partial<Record<ContentFormField, string>>;

export const initialContentFormValues: ContentFormValues = {
  title: "",
  channel_id: "",
  format_type: "",
  description: "",
  script: "",
};

export function validateContentForm(
  values: ContentFormValues
): ContentFormErrors {
  const errors: ContentFormErrors = {};

  if (!values.title.trim()) {
    errors.title = "Judul konten wajib diisi.";
  }

  if (!values.channel_id.trim()) {
    errors.channel_id = "Channel ID wajib diisi.";
  }

  if (!values.format_type.trim()) {
    errors.format_type = "Format konten wajib diisi.";
  }

  return errors;
}
