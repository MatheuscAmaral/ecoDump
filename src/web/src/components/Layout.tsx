import type { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/Sidebar";
import Container from "./Container";
import { Header } from "./Header";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-col gap-1 w-full">
        <Header />
        <Container>{children}</Container>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
