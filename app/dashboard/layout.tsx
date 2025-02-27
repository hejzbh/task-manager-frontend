import Sidebar from "@/modules/dashboard/components/Sidebar";
import React from "react";
import CurrentUserProvider from "@/modules/auth/components/providers/CurrentUserProvider";
import Header from "@/modules/dashboard/components/Header";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <CurrentUserProvider>
      <div className="h-[100dvh] overflow-hidden">
        {/** Header */}
        <Header />
        {/** Main */}
        <div className="flex h-full">
          <Sidebar />
          <main className="p-5">{children}</main>
        </div>
      </div>
    </CurrentUserProvider>
  );
};

export default DashboardLayout;
