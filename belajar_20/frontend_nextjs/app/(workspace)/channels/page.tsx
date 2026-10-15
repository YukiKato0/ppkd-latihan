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
        <Button className="channels-add-button" type="button">
          <Plus aria-hidden="true" data-icon="inline-start" />
          Add channel
        </Button>
      </DialogTrigger>
      <DialogContent className="channel-dialog">
        <DialogHeader>
          <p className="channel-dialog-kicker">CHANNEL DIRECTORY</p>
          <DialogTitle>Add a channel</DialogTitle>
          <DialogDescription>
            Choose a platform and enter the name you use to identify this channel.
          </DialogDescription>
        </DialogHeader>

        {notice && (
          <Alert className="channel-form-notice" role="status">
            <CircleAlert aria-hidden="true" />
            <AlertTitle>Belum tersimpan</AlertTitle>
            <AlertDescription>{notice}</AlertDescription>
          </Alert>
        )}

        <form className="channel-form" noValidate onSubmit={handleSubmit}>
          <div className="channel-form-field">
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
                className="channel-select-trigger"
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

          <div className="channel-form-field">
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
            />
          </div>

          {error && (
            <p
              className="channel-form-error"
              id={error === "Pilih platform channel." ? "channel-platform-error" : "channel-name-error"}
              role="alert"
            >
              {error}
            </p>
          )}

          <DialogFooter className="channel-dialog-footer">
            <Button onClick={() => handleOpenChange(false)} type="button" variant="outline">
              Cancel
            </Button>
            <Button className="channels-add-button" type="submit">
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
    <div className="channels-page">
      <div className="page-heading-row channels-heading-row">
        <div>
          <p className="eyebrow">YOUR CREATOR NETWORK</p>
          <h1>Channels</h1>
          <p className="page-description">
            Keep the places where you publish in one considered directory.
          </p>
        </div>
        <AddChannelDialog />
      </div>

      <Alert className="channels-api-notice">
        <CircleAlert aria-hidden="true" />
        <AlertTitle>Channel data is not connected</AlertTitle>
        <AlertDescription>
          No account records are loaded or saved yet. The channel API payload and response shape need confirmation.
        </AlertDescription>
      </Alert>

      <section aria-labelledby="channel-directory-title" className="channels-directory">
        <div className="channels-directory-header">
          <div>
            <p className="section-kicker">DIRECTORY</p>
            <h2 id="channel-directory-title">Connected channels</h2>
          </div>
          <Badge className="channels-count-badge" variant="outline">NOT LOADED</Badge>
        </div>

        <div className="channels-table-wrap">
          <table className="channels-table">
            <thead>
              <tr>
                <th scope="col">Platform</th>
                <th scope="col">Channel name</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={3}>
                  <div className="channels-empty-state">
                    <span className="channels-empty-icon" aria-hidden="true">
                      <Radio size={22} strokeWidth={1.7} />
                    </span>
                    <h3>No channel records loaded</h3>
                    <p>
                      Add a channel draft, then connect it when the backend contract is ready.
                    </p>
                    <div className="supported-platforms" aria-label="Supported platforms">
                      {CHANNEL_PLATFORMS.map((platformName) => {
                        const PlatformIcon = platformIcons[platformName];
                        return (
                          <span className={`supported-platform platform-${platformName}`} key={platformName}>
                            <PlatformIcon aria-hidden="true" size={14} />
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