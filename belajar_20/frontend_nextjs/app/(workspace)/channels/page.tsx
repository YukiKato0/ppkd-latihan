"use client";

import { useState, type FormEvent } from "react";
import {
  Briefcase,
  Camera,
  CircleAlert,
  Music2,
  Plus,
  Play,
  Radio,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CHANNEL_PLATFORM_LABELS,
  CHANNEL_PLATFORMS,
  type ChannelPlatform,
} from "@/features/channels/types/channel";

const platformIcons = {
  youtube: Play,
  tiktok: Music2,
  instagram: Camera,
  linkedin: Briefcase,
};

function AddChannelDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [platform, setPlatform] = useState<ChannelPlatform | "">("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  function handleOpenChange(nextOpen: boolean) {
    setIsOpen(nextOpen);
    if (!nextOpen) {
      setError("");
      setNotice("");
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setNotice("");

    if (!platform) {
      setError("Pilih platform channel.");
      return;
    }

    if (displayName.trim().length < 2) {
      setError("Nama tampilan harus berisi minimal 2 karakter.");
      return;
    }

    setNotice(
      "Detail valid. Channel belum disimpan karena payload dan response API belum dikonfirmasi.",
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="h-9.75 rounded-[5px] bg-[#1c644c] px-3.25 text-[11px] font-semibold text-white hover:bg-[#174f3d]" type="button">
          <Plus aria-hidden="true" data-icon="inline-start" />
          Add channel
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-115 gap-5 rounded-lg max-[640px]:p-5">
        <DialogHeader>
          <p className="m-0 text-[9px] font-bold tracking-[0.14em] text-[#53816c]">CHANNEL DIRECTORY</p>
          <DialogTitle className="font-serif text-[23px] font-normal text-[#203128]">Add a channel</DialogTitle>
          <DialogDescription className="text-[11px] leading-relaxed text-[#718077]">
            Choose a platform and enter the name you use to identify this channel.
          </DialogDescription>
        </DialogHeader>

        {notice && (
          <Alert className="-mt-1 rounded-md border-[#d5e4d4] bg-[#f2f6ef] text-[10px] leading-normal text-[#345642] **:data-[slot=alert-title]:text-[10px] **:data-[slot=alert-description]:text-[10px] **:data-[slot=alert-description]:text-[#64776a]" role="status">
            <CircleAlert aria-hidden="true" />
            <AlertTitle>Belum tersimpan</AlertTitle>
            <AlertDescription>{notice}</AlertDescription>
          </Alert>
        )}

        <form className="flex flex-col gap-4.25" noValidate onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1.75">
            <Label htmlFor="channel-platform">Platform</Label>
            <Select
              value={platform}
              onValueChange={(value) => {
                setPlatform(value as ChannelPlatform);
                setError("");
                setNotice("");
              }}
            >
              <SelectTrigger
                aria-invalid={error === "Pilih platform channel."}
                aria-describedby={error === "Pilih platform channel." ? "channel-platform-error" : undefined}
                className="h-10.25 w-full rounded-[5px] border-[#d9e0d9] bg-white text-[11px] text-[#34443a]"
                id="channel-platform"
              >
                <SelectValue placeholder="Pilih platform" />
              </SelectTrigger>
              <SelectContent>
                {CHANNEL_PLATFORMS.map((platformName) => (
                  <SelectItem key={platformName} value={platformName}>
                    {CHANNEL_PLATFORM_LABELS[platformName]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.75">
            <Label htmlFor="channel-display-name">Nama tampilan</Label>
            <Input
              autoComplete="off"
              aria-invalid={error.includes("Nama tampilan")}
              aria-describedby={error.includes("Nama tampilan") ? "channel-name-error" : undefined}
              id="channel-display-name"
              maxLength={80}
              onChange={(event) => {
                setDisplayName(event.target.value);
                setError("");
                setNotice("");
              }}
              placeholder="Contoh: Frame Studio"
              value={displayName}
              className="h-10.25 rounded-[5px] border-[#d9e0d9] bg-white text-[11px] text-[#34443a]"
            />
          </div>

          {error && (
            <p
              className="-mt-1.75 m-0 text-[10px] text-[#a33e37]"
              id={error === "Pilih platform channel." ? "channel-platform-error" : "channel-name-error"}
              role="alert"
            >
              {error}
            </p>
          )}

          <DialogFooter className="mt-1 gap-2.25 max-[640px]:flex-col-reverse [&_button]:rounded-[5px] [&_button]:text-[10px] max-[640px]:[&_button]:w-full">
            <Button onClick={() => handleOpenChange(false)} type="button" variant="outline">
              Cancel
            </Button>
            <Button className="h-9.75 rounded-[5px] bg-[#1c644c] px-3.25 text-[11px] font-semibold text-white hover:bg-[#174f3d]" type="submit">
              Validate details
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function ChannelsPage() {
  return (
    <div className="mx-auto max-w-342.5">
      <div className="mb-7 flex items-center justify-between max-[640px]:flex-col max-[640px]:items-stretch max-[640px]:gap-3.75">
        <div>
          <p className="mb-3 text-[10px] font-bold tracking-[0.14em] text-[#53816c]">YOUR CREATOR NETWORK</p>
          <h1 className="m-0 font-serif text-[clamp(34px,4vw,46px)] font-normal leading-[1.08] text-[#1d2b24] max-[640px]:text-4xl">Channels</h1>
          <p className="mt-2.75 max-w-67.5 text-[12px] leading-relaxed text-[#68746e] sm:text-[13px]">
            Keep the places where you publish in one considered directory.
          </p>
        </div>
        <div className="max-[640px]:self-start"><AddChannelDialog /></div>
      </div>

      <Alert className="mb-6 grid-cols-[18px_1fr] items-start rounded-[7px] border-[#e8dfc2] bg-[#f8f6ed] px-3.75 py-3.5 text-[#65552e] [&>svg]:mt-px [&>svg]:text-[#a27d36] **:data-[slot=alert-title]:text-[11px] **:data-[slot=alert-title]:font-semibold **:data-[slot=alert-description]:text-[10px] **:data-[slot=alert-description]:leading-normal **:data-[slot=alert-description]:text-[#7b7155]">
        <CircleAlert aria-hidden="true" />
        <AlertTitle>Channel data is not connected</AlertTitle>
        <AlertDescription>
          No account records are loaded or saved yet. The channel API payload and response shape need confirmation.
        </AlertDescription>
      </Alert>

      <section aria-labelledby="channel-directory-title" className="overflow-hidden rounded-lg border border-[#e0e7e0] bg-[rgb(255_255_255/88%)] shadow-[0_12px_32px_rgb(30_56_41/3%)]">
        <div className="flex min-h-19.75 items-center justify-between border-b border-[#e8ede8] px-5.75 py-4 max-[640px]:px-3.75">
          <div>
            <p className="mb-1.75 text-[9px] font-bold tracking-[0.14em] text-[#78877e]">DIRECTORY</p>
            <h2 className="m-0 text-[15px] font-semibold text-[#24332b]" id="channel-directory-title">Connected channels</h2>
          </div>
          <Badge className="h-6 rounded border-[#e2e8e1] bg-[#f3f5f1] text-[9px] text-[#6f7b72]" variant="outline">NOT LOADED</Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-130 border-collapse">
            <thead>
              <tr>
                <th className="border-b border-[#e8ede8] bg-[#fafbf9] px-5 py-3.25 text-left text-[9px] font-semibold tracking-[0.08em] text-[#758179] uppercase" scope="col">Platform</th>
                <th className="border-b border-[#e8ede8] bg-[#fafbf9] px-5 py-3.25 text-left text-[9px] font-semibold tracking-[0.08em] text-[#758179] uppercase" scope="col">Channel name</th>
                <th className="border-b border-[#e8ede8] bg-[#fafbf9] px-5 py-3.25 text-left text-[9px] font-semibold tracking-[0.08em] text-[#758179] uppercase" scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={3}>
                  <div className="flex min-h-78.75 flex-col items-center justify-center px-5 py-8.5 text-center max-[640px]:min-h-75 max-[640px]:px-4">
                    <span className="mb-4.25 inline-flex size-13.5 items-center justify-center rounded-full border border-[#dfeae0] bg-[#edf4ee] text-[#38775c]" aria-hidden="true">
                      <Radio size={22} strokeWidth={1.7} />
                    </span>
                    <h3 className="m-0 font-serif text-[21px] font-normal text-[#2c3b32]">No channel records loaded</h3>
                    <p className="mt-2 max-w-97.5 text-[11px] leading-relaxed text-[#78837b]">
                      Add a channel draft, then connect it when the backend contract is ready.
                    </p>
                    <div className="mt-5 flex flex-wrap justify-center gap-2" aria-label="Supported platforms">
                      {CHANNEL_PLATFORMS.map((platformName) => {
                        const PlatformIcon = platformIcons[platformName];
                        return (
                          <span className="inline-flex min-h-7.25 items-center gap-1.5 rounded border border-[#e3e9e2] bg-[#f6f8f5] px-2.25 text-[9px] text-[#56645b]" key={platformName}>
                            <PlatformIcon className={platformName === "youtube" ? "text-[#c13b33]" : platformName === "instagram" ? "text-[#a6507c]" : platformName === "linkedin" ? "text-[#266e9c]" : "text-[#202a25]"} aria-hidden="true" size={14} />
                            {CHANNEL_PLATFORM_LABELS[platformName]}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}