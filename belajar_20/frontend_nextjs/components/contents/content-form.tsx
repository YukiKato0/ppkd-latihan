"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  initialContentFormValues,
  validateContentForm,
  type ContentFormErrors,
  type ContentFormValues,
} from "@/features/contents/schemas/content-form";

type ContentFormMode = "create" | "edit";

export function ContentForm({ mode, contentId }: { mode: ContentFormMode; contentId?: string }) {
  const [values, setValues] = useState(initialContentFormValues);
  const [errors, setErrors] = useState<ContentFormErrors>({});
  const [notice, setNotice] = useState("");

  function updateField(field: keyof ContentFormValues, value: string) {
    setValues((currentValues) => ({ ...currentValues, [field]: value }));
    if (field === "title" || field === "channel_id" || field === "format_type") {
      setErrors((currentErrors) => ({ ...currentErrors, [field]: undefined }));
    }
    setNotice("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateContentForm(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setNotice("");
      return;
    }

    setNotice("Data valid, tetapi belum dikirim karena kontrak request dan response API belum dikonfirmasi.");
  }

  if (mode === "edit") {
    return (
      <Alert className="content-api-notice content-edit-blocked">
        <AlertTitle>Content belum dapat dimuat</AlertTitle>
        <AlertDescription>
          Record {contentId} belum tersedia dari API. Form edit dan aksi simpan dinonaktifkan agar data tidak tertimpa.
        </AlertDescription>
        <Button asChild className="content-back-button" variant="outline">
          <Link href="/contents">Back to content</Link>
        </Button>
      </Alert>
    );
  }

  return (
    <div className="content-form-layout">
      <Alert className="content-api-notice">
        <AlertTitle>Channel directory is not connected</AlertTitle>
        <AlertDescription>
          Isi channel ID sementara. Format ini belum diverifikasi terhadap kontrak backend.
        </AlertDescription>
      </Alert>

      {notice && (
        <Alert className="content-form-notice" role="status">
          <AlertTitle>Belum tersimpan</AlertTitle>
          <AlertDescription>{notice}</AlertDescription>
        </Alert>
      )}

      <form className="content-form" noValidate onSubmit={handleSubmit}>
        <div className="content-form-field">
          <Label htmlFor="content-title">Title</Label>
          <Input
            aria-invalid={Boolean(errors.title)}
            aria-describedby={errors.title ? "content-title-error" : undefined}
            autoComplete="off"
            id="content-title"
            maxLength={200}
            onChange={(event) => updateField("title", event.target.value)}
            placeholder="Give this idea a working title"
            value={values.title}
          />
          {errors.title && <p className="content-field-error" id="content-title-error">{errors.title}</p>}
        </div>

        <div className="content-form-grid">
          <div className="content-form-field">
            <Label htmlFor="content-channel-id">Channel ID</Label>
            <Input
              aria-invalid={Boolean(errors.channel_id)}
              aria-describedby={errors.channel_id ? "content-channel-error" : undefined}
              autoComplete="off"
              id="content-channel-id"
              onChange={(event) => updateField("channel_id", event.target.value)}
              placeholder="Channel ID"
              value={values.channel_id}
            />
            {errors.channel_id && (
              <p className="content-field-error" id="content-channel-error">{errors.channel_id}</p>
            )}
          </div>
          <div className="content-form-field">
            <Label htmlFor="content-format-type">Format type</Label>
            <Input
              aria-invalid={Boolean(errors.format_type)}
              aria-describedby={errors.format_type ? "content-format-error" : undefined}
              autoComplete="off"
              id="content-format-type"
              onChange={(event) => updateField("format_type", event.target.value)}
              placeholder="Format type"
              value={values.format_type}
            />
            {errors.format_type && (
              <p className="content-field-error" id="content-format-error">{errors.format_type}</p>
            )}
          </div>
        </div>

        <div className="content-form-field">
          <Label htmlFor="content-description">Description <span>Optional</span></Label>
          <Textarea
            id="content-description"
            onChange={(event) => updateField("description", event.target.value)}
            placeholder="What is this content about?"
            rows={3}
            value={values.description}
          />
        </div>

        <div className="content-form-field">
          <Label htmlFor="content-script">Script <span>Optional</span></Label>
          <Textarea
            id="content-script"
            onChange={(event) => updateField("script", event.target.value)}
            placeholder="Add a draft or outline"
            rows={6}
            value={values.script}
          />
        </div>

        <div className="content-form-actions">
          <Button asChild variant="outline"><Link href="/contents">Cancel</Link></Button>
          <Button className="content-create-button" type="submit">Validate content</Button>
        </div>
      </form>
    </div>
  );
}