import type { ReactNode } from "react";

import AppSidebar from "./AppSidebar";
import "./AppLayout.css";

interface AppLayoutProps {
  children: ReactNode;
}

function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="app-layout">
      <AppSidebar />
      <main className="app-layout__content">{children}</main>
    </div>
  );
}

export default AppLayout;
