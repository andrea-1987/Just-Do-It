import React from "react";
import { MainLayout } from "../layout/MainLayout";
import { WorksContent } from "../components/workContent/WorksContent";
import { SidebarWithSearch } from "../components/sidebar/SideBar";
import sessionData from "../helper/session";

const LoggedPage = () => {
  if (sessionData) {
    return (
      <MainLayout>
        <div class="flex">
        <SidebarWithSearch />
        <WorksContent />
        </div>
      </MainLayout>
    );
  }
};

export default LoggedPage;
