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
    <nav aria-label="Primary navigation" className="workspace-nav">
      <p className="nav-section-label">Workspace</p>
      <Link
        href="/contents"
        aria-current={isPipelineActive ? "page" : undefined}
        className={`nav-link${isPipelineActive ? " nav-link-active" : ""}`}
        onClick={onNavigate}
      >
        <Layers3 aria-hidden="true" size={18} strokeWidth={1.8} />
        <span>Pipeline</span>
        <span className="nav-link-indicator" aria-hidden="true" />
      </Link>
      <Link
        href="/channels"
        aria-current={isChannelsActive ? "page" : undefined}
        className={`nav-link${isChannelsActive ? " nav-link-active" : ""}`}
        onClick={onNavigate}
      >
        <Radio aria-hidden="true" size={18} strokeWidth={1.8} />
        <span>Channels</span>
        <span className="nav-link-indicator" aria-hidden="true" />
      </Link>
    </nav>
  );
}

function WorkspaceNavigation({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <Suspense fallback={<nav aria-label="Primary navigation" className="workspace-nav" />}>
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
    <Link className="brand-lockup" href="/contents" aria-label="Frame workspace home">
      <span className="brand-mark">
        <Clapperboard aria-hidden="true" size={19} strokeWidth={1.8} />
      </span>
      <span className="brand-wordmark">
        <strong>FRAME</strong>
        <span>CREATOR STUDIO</span>
      </span>
    </Link>
  );
}

export default function WorkspaceShell({ children }: { children: React.ReactNode }) {
  const [isMobileNavigationOpen, setIsMobileNavigationOpen] = useState(false);

  return (
    <div className="workspace-shell">
      <aside className="desktop-sidebar">
        <WorkspaceBrand />
        <button className="workspace-switcher" type="button" disabled>
          <span className="workspace-avatar" aria-hidden="true">F</span>
          <span className="workspace-switcher-copy">
            <strong>My studio</strong>
            <span>Personal workspace</span>
          </span>
          <ChevronDown aria-hidden="true" size={16} />
        </button>
        <WorkspaceNavigation />
        <div className="sidebar-bottom">
          <span className="connection-indicator" aria-hidden="true" />
          <span>Workspace overview</span>
        </div>
      </aside>

      <div className="workspace-content">
        <header className="workspace-topbar">
          <button
            aria-label={isMobileNavigationOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={isMobileNavigationOpen}
            aria-controls="mobile-navigation"
            className="mobile-menu-button"
            onClick={() => setIsMobileNavigationOpen((isOpen) => !isOpen)}
            type="button"
          >
            {isMobileNavigationOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="topbar-context">
            <span>My studio</span>
            <span className="context-divider" aria-hidden="true">/</span>
            <Suspense fallback={<strong>Pipeline</strong>}>
              <CurrentWorkspaceSection />
            </Suspense>
          </div>
          <span className="topbar-status">
            <span className="connection-indicator" aria-hidden="true" />
            Studio workspace
          </span>
        </header>

        {isMobileNavigationOpen && (
          <div className="mobile-navigation-layer">
            <button
              aria-label="Close navigation"
              className="mobile-navigation-backdrop"
              onClick={() => setIsMobileNavigationOpen(false)}
              type="button"
            />
            <aside className="mobile-sidebar" id="mobile-navigation">
              <WorkspaceBrand />
              <WorkspaceNavigation onNavigate={() => setIsMobileNavigationOpen(false)} />
            </aside>
          </div>
        )}

        <main className="workspace-main">{children}</main>
      </div>
    </div>
  );
}