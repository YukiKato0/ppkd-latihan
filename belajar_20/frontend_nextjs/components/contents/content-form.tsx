"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  CONTENT_FORMAT_LABELS,
  CONTENT_FORMATS,
  CONTENT_PRIORITIES,
  CONTENT_PRIORITY_LABELS,
  type ContentFormat,
  type ContentPriority,
} from "@/features/contents/types/content";
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
    setValues((currentValues) => {
      if (field === "format_type") {
        return { ...currentValues, format_type: value as ContentFormat | "" };
      }
      if (field === "priority") {
        return { ...currentValues, priority: value as ContentPriority };
      }
      return { ...currentValues, [field]: value };
    });
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
      <Alert className="mt-0 flex flex-col gap-[10px] rounded-[7px] border-[#e8dfc2] bg-[#f8f6ed] text-[#65552e] [&_[data-slot=alert-title]]:text-[11px] [&_[data-slot=alert-title]]:font-semibold [&_[data-slot=alert-description]]:text-[10px] [&_[data-slot=alert-description]]:leading-normal [&_[data-slot=alert-description]]:text-[#7b7155]">
        <AlertTitle>Content belum dapat dimuat</AlertTitle>
        <AlertDescription>
          Record {contentId} belum tersedia dari API. Form edit dan aksi simpan dinonaktifkan agar data tidak tertimpa.
        </AlertDescription>
        <Button asChild className="mt-[3px] self-start rounded-[5px] bg-white text-[10px]" variant="outline">
          <Link href="/contents">Back to content</Link>
        </Button>
      </Alert>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <Alert className="m-0 rounded-[7px] border-[#e8dfc2] bg-[#f8f6ed] text-[#65552e] [&_[data-slot=alert-title]]:text-[11px] [&_[data-slot=alert-title]]:font-semibold [&_[data-slot=alert-description]]:text-[10px] [&_[data-slot=alert-description]]:leading-normal [&_[data-slot=alert-description]]:text-[#7b7155]">
        <AlertTitle>Channel directory is not connected</AlertTitle>
        <AlertDescription>
          Isi channel ID sementara. Format ini belum diverifikasi terhadap kontrak backend.
        </AlertDescription>
      </Alert>

      {notice && (
        <Alert className="m-0 rounded-[7px] border-[#d5e4d4] bg-[#f2f6ef] text-[#345642] [&_[data-slot=alert-description]]:text-[#64776a]" role="status">
          <AlertTitle>Belum tersimpan</AlertTitle>
          <AlertDescription>{notice}</AlertDescription>
        </Alert>
      )}

      <form className="flex flex-col gap-5 rounded-lg border border-[#e0e7e0] bg-[rgb(255_255_255/90%)] p-[25px] max-[640px]:gap-4 max-[640px]:p-[17px]" noValidate onSubmit={handleSubmit}>
        <div className="flex min-w-0 flex-col gap-[7px]">
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
            className="h-[42px] rounded-[5px] border-[#d9e0d9] bg-white px-3 text-[12px] text-[#24332b] placeholder:text-[#a3ada5]"
          />
          {errors.title && <p className="m-0 text-[10px] leading-[1.4] text-[#a33e37]" id="content-title-error">{errors.title}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4 max-[640px]:grid-cols-1">
          <div className="flex min-w-0 flex-col gap-[7px]">
            <Label htmlFor="content-channel-id">Channel ID</Label>
            <Input
              aria-invalid={Boolean(errors.channel_id)}
              aria-describedby={errors.channel_id ? "content-channel-error" : undefined}
              autoComplete="off"
              id="content-channel-id"
              onChange={(event) => updateField("channel_id", event.target.value)}
              placeholder="Channel ID"
              value={values.channel_id}
              className="h-[42px] rounded-[5px] border-[#d9e0d9] bg-white px-3 text-[12px] text-[#24332b] placeholder:text-[#a3ada5]"
            />
            {errors.channel_id && (
              <p className="m-0 text-[10px] leading-[1.4] text-[#a33e37]" id="content-channel-error">{errors.channel_id}</p>
            )}
          </div>
          <div className="flex min-w-0 flex-col gap-[7px]">
            <Label htmlFor="content-format-type">Format type</Label>
            <Select
              value={values.format_type}
              onValueChange={(value) => updateField("format_type", value)}
            >
              <SelectTrigger
                aria-invalid={Boolean(errors.format_type)}
                aria-describedby={errors.format_type ? "content-format-error" : undefined}
                id="content-format-type"
                className="h-[42px] w-full rounded-[5px] border-[#d9e0d9] bg-white text-[12px] text-[#24332b]"
              >
                <SelectValue placeholder="Pilih format" />
              </SelectTrigger>
              <SelectContent>
                {CONTENT_FORMATS.map((format) => (
                  <SelectItem key={format} value={format}>
                    {CONTENT_FORMAT_LABELS[format]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.format_type && (
              <p className="m-0 text-[10px] leading-[1.4] text-[#a33e37]" id="content-format-error">{errors.format_type}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 max-[640px]:grid-cols-1">
          <div className="flex min-w-0 flex-col gap-[7px]">
            <Label htmlFor="content-priority">Priority</Label>
            <Select
              value={values.priority}
              onValueChange={(value) => updateField("priority", value)}
            >
              <SelectTrigger className="h-[42px] w-full rounded-[5px] border-[#d9e0d9] bg-white text-[12px] text-[#24332b]" id="content-priority">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CONTENT_PRIORITIES.map((priority) => (
                  <SelectItem key={priority} value={priority}>
                    {CONTENT_PRIORITY_LABELS[priority]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex min-w-0 flex-col gap-[7px]">
            <Label htmlFor="content-scheduled-date">Scheduled date <span className="ml-[5px] text-[9px] font-normal text-[#8a958d]">Optional</span></Label>
            <Input
              id="content-scheduled-date"
              name="scheduled_date"
              onChange={(event) => updateField("scheduled_date", event.target.value)}
              type="date"
              value={values.scheduled_date}
              className="h-[42px] rounded-[5px] border-[#d9e0d9] bg-white px-3 text-[12px] text-[#24332b]"
            />
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-[7px]">
          <Label htmlFor="content-description">Description <span className="ml-[5px] text-[9px] font-normal text-[#8a958d]">Optional</span></Label>
          <Textarea
            id="content-description"
            onChange={(event) => updateField("description", event.target.value)}
            placeholder="What is this content about?"
            rows={3}
            value={values.description}
            className="min-h-[88px] resize-y rounded-[5px] border-[#d9e0d9] bg-white px-3 py-[11px] text-[12px] leading-relaxed text-[#24332b] placeholder:text-[#a3ada5]"
          />
        </div>

        <div className="flex min-w-0 flex-col gap-[7px]">
          <Label htmlFor="content-script-draft">Script draft <span className="ml-[5px] text-[9px] font-normal text-[#8a958d]">Optional</span></Label>
          <Textarea
            id="content-script-draft"
            name="script_draft"
            onChange={(event) => updateField("script_draft", event.target.value)}
            placeholder="Add a draft or outline"
            rows={6}
            value={values.script_draft}
            className="min-h-[88px] resize-y rounded-[5px] border-[#d9e0d9] bg-white px-3 py-[11px] text-[12px] leading-relaxed text-[#24332b] placeholder:text-[#a3ada5]"
          />
        </div>

        <div className="mt-[3px] flex justify-end gap-[9px] border-t border-[#e8ede8] pt-[18px] max-[640px]:flex-col-reverse">
          <Button asChild variant="outline"><Link href="/contents">Cancel</Link></Button>
          <Button className="min-h-[39px] rounded-[5px] bg-[#1c644c] px-[13px] text-[11px] font-semibold text-white hover:bg-[#174f3d] max-[640px]:w-full" type="submit">Validate content</Button>
        </div>
      </form>
    </div>
  );
}