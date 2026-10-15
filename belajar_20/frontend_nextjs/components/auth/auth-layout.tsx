import Link from "next/link";
import { Clapperboard } from "lucide-react";

const stages = ["IDEA", "SCRIPT", "RECORD", "EDIT", "READY", "PUBLISH"];

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="auth-page">
      <section className="auth-art-panel" aria-label="Frame Creator Studio">
        <div className="auth-art-grid" aria-hidden="true" />
        <Link className="auth-brand" href="/contents" aria-label="Frame home">
          <span className="auth-brand-icon"><Clapperboard size={20} /></span>
          <span><strong>FRAME</strong><small>CREATOR STUDIO</small></span>
        </Link>

        <div className="auth-art-copy">
          <p className="auth-art-kicker">A STUDIO FOR EVERY STORY</p>
          <h1>Make room<br />for the work<br /><em>that matters.</em></h1>
          <p className="auth-art-description">
            A thoughtful place to shape ideas, move them through production, and share them with the world.
          </p>
        </div>

        <div className="auth-stage-rail" aria-label="Idea to publication">
          {stages.map((stage, index) => (
            <div className="auth-rail-step" key={stage}>
              <span className={index === 0 ? "auth-rail-dot auth-rail-dot-active" : "auth-rail-dot"} />
              <span>{stage}</span>
            </div>
          ))}
        </div>

        <p className="auth-art-footer">PLAN WITH INTENTION. PUBLISH WITH PURPOSE.</p>
      </section>
      <section className="auth-form-panel">
        {children}
        <p className="auth-legal-note">By continuing, you agree to keep your creative work yours.</p>
      </section>
    </main>
  );
}