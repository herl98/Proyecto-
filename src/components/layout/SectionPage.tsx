import type { ReactNode } from "react";

import AppLayout from "./AppLayout";
import "./SectionPage.css";

interface SectionPageProps {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}

function SectionPage({ eyebrow, title, description, children }: SectionPageProps) {
  return (
    <AppLayout>
      <section className="section-page">
        <header className="section-page__header">
          <span>{eyebrow}</span>
          <h1>{title}</h1>
          <p>{description}</p>
        </header>
        <div className="section-page__body">{children}</div>
      </section>
    </AppLayout>
  );
}

export default SectionPage;
