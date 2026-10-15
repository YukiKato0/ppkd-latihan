"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useState } from "react";
import { ChevronDown, Clapperboard, Layers3, Menu, Radio, X } from "lucide-react";

function ActiveWorkspaceNavigation({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const isPipelineActive = pathname.startsWith("/contents");
  const isChannelsActive = pathname.startsWith("/channels");

  return (
    <nav aria-label="Primary navigation" className="flex flex-col gap-2">
      <p className="mb-1 ml-2 text-[10px] font-bold tracking-[0.14em] text-[#89938d]">Workspace</p>
      <Link
        href="/contents"
        aria-current={isPipelineActive ? "page" : undefined}
        className={`group flex min-h-[42px] items-center gap-[11px] rounded-[7px] px-[11px] text-[13px] text-[#626f68] no-underline transition-colors hover:bg-[#f0f4f0] hover:text-[#18231f] ${isPipelineActive ? "bg-[#e4f1eb] font-semibold text-[#145b47]" : ""}`}
        onClick={onNavigate}
      >
        <Layers3 aria-hidden="true" size={18} strokeWidth={1.8} />
        <span>Pipeline</span>
        <span className={`ml-auto h-[17px] w-[3px] rounded-sm bg-[#30896b] ${isPipelineActive ? "opacity-100" : "opacity-0"}`} aria-hidden="true" />
      </Link>
      <Link
        href="/channels"
        aria-current={isChannelsActive ? "page" : undefined}
        className={`group flex min-h-[42px] items-center gap-[11px] rounded-[7px] px-[11px] text-[13px] text-[#626f68] no-underline transition-colors hover:bg-[#f0f4f0] hover:text-[#18231f] ${isChannelsActive ? "bg-[#e4f1eb] font-semibold text-[#145b47]" : ""}`}
        onClick={onNavigate}
      >
        <Radio aria-hidden="true" size={18} strokeWidth={1.8} />
        <span>Channels</span>
        <span className={`ml-auto h-[17px] w-[3px] rounded-sm bg-[#30896b] ${isChannelsActive ? "opacity-100" : "opacity-0"}`} aria-hidden="true" />
      </Link>
    </nav>
  );
}

function WorkspaceNavigation({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <Suspense fallback={<nav aria-label="Primary navigation" className="flex flex-col gap-2" />}>
      <ActiveWorkspaceNavigation onNavigate={onNavigate} />
    </Suspense>
  );
}

function CurrentWorkspaceSection() {
  const currentSection = usePathname().startsWith("/channels") ? "Channels" : "Pipeline";
  return <strong>{currentSection}</strong>;
}

function WorkspaceBrand() {
  return (
    <Link className="flex w-fit items-center gap-[11px] text-[#18231f] no-underline" href="/contents" aria-label="Frame workspace home">
      <span className="inline-flex size-[38px] items-center justify-center rounded-lg bg-[#1b3a30] text-[#f4c879]">
        <Clapperboard aria-hidden="true" size={19} strokeWidth={1.8} />
      </span>
      <span className="flex flex-col gap-[3px]">
        <strong className="text-[14px] font-extrabold tracking-[0.12em] leading-none">FRAME</strong>
        <span className="text-[9px] font-semibold tracking-[0.13em] text-[#75817b]">CREATOR STUDIO</span>
      </span>
    </Link>
  );
}

export default function WorkspaceShell({ children }: { children: React.ReactNode }) {
  const [isMobileNavigationOpen, setIsMobileNavigationOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <aside className="flex min-h-screen flex-[0_0_248px] flex-col border-r border-[#e2e8e2] bg-[#fbfcfa] px-[18px] py-7 max-[800px]:flex-[0_0_218px] max-[800px]:px-[14px] max-[640px]:hidden">
        <WorkspaceBrand />
        <button className="my-[38px] mb-[34px] flex min-h-[58px] w-full cursor-default items-center gap-[10px] rounded-lg border border-[#e2e8e2] bg-transparent p-[9px] text-left text-[#18231f]" type="button" disabled>
          <span className="inline-flex size-[34px] flex-[0_0_34px] items-center justify-center rounded-md bg-[#f3e6cd] font-serif text-[17px] text-[#674a1e]" aria-hidden="true">F</span>
          <span className="flex min-w-0 flex-1 flex-col gap-[3px]">
            <strong className="text-[12px] font-semibold">My studio</strong>
            <span className="text-[10px] text-[#68746e]">Personal workspace</span>
          </span>
          <ChevronDown aria-hidden="true" className="text-[#7c8882]" size={16} />
        </button>
        <WorkspaceNavigation />
        <div className="mt-auto flex items-center gap-2 border-t border-[#e2e8e2] px-1 pb-[2px] pt-[18px] text-[10px] text-[#78847d]">
          <span className="inline-block size-[10px] flex-[0_0_10px] rounded-full border-[3px] border-[#e2f0e7] bg-[#4b9a70]" aria-hidden="true" />
          Workspace overview
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-[62px] items-center justify-between border-b border-[#e2e8e2] bg-[rgb(251_252_250/84%)] px-[42px] max-[800px]:px-[25px] max-[640px]:h-[58px] max-[640px]:justify-start max-[640px]:gap-3 max-[640px]:px-4">
          <button
            aria-label={isMobileNavigationOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={isMobileNavigationOpen}
            aria-controls="mobile-navigation"
            className="hidden size-9 flex-[0_0_36px] items-center justify-center rounded-md border border-[#e2e8e2] bg-transparent p-0 text-[#34443a] max-[640px]:inline-flex"
            onClick={() => setIsMobileNavigationOpen((isOpen) => !isOpen)}
            type="button"
          >
            {isMobileNavigationOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="flex items-center gap-[10px] text-[11px] text-[#7b8780] max-[640px]:flex-1 max-[640px]:gap-[7px] max-[640px]:text-[10px]">
            <span>My studio</span>
            <span className="text-[#b0bab3]" aria-hidden="true">/</span>
            <Suspense fallback={<strong>Pipeline</strong>}>
              <CurrentWorkspaceSection />
            </Suspense>
          </div>
          <span className="flex items-center gap-2 text-[10px] text-[#69756e] max-[640px]:hidden">
            <span className="inline-block size-[10px] flex-[0_0_10px] rounded-full border-[3px] border-[#e2f0e7] bg-[#4b9a70]" aria-hidden="true" />
            Studio workspace
          </span>
        </header>

        {isMobileNavigationOpen && (
          <div className="fixed inset-x-0 bottom-0 top-[58px] z-20 min-[641px]:hidden">
            <button
              aria-label="Close navigation"
              className="absolute inset-0 w-full border-0 bg-[rgb(20_34_27/30%)]"
              onClick={() => setIsMobileNavigationOpen(false)}
              type="button"
            />
            <aside className="absolute bottom-0 left-0 top-0 w-[min(290px,calc(100vw-48px))] border-r border-[#e2e8e2] bg-[#fbfcfa] px-[18px] py-[22px]" id="mobile-navigation">
              <WorkspaceBrand />
              <div className="mt-[35px]">
                <WorkspaceNavigation onNavigate={() => setIsMobileNavigationOpen(false)} />
              </div>
            </aside>
          </div>
        )}

        <main className="min-w-0 flex-1 bg-[#f4f6f3] bg-[linear-gradient(rgb(30_69_51/2.5%)_1px,transparent_1px),linear-gradient(90deg,rgb(30_69_51/2.5%)_1px,transparent_1px)] bg-[length:32px_32px] px-[42px] pb-[26px] pt-[50px] max-[800px]:px-[25px] max-[800px]:py-[39px] max-[640px]:px-4 max-[640px]:py-[34px]">
          {children}
        </main>
      </div>
    </div>
  );
}