import React from "react";
import { MainLayout } from "../layout/MainLayout";
import { SidebarWithSearch } from "../components/sidebar/SideBar";
import { PersonalContent } from "../components/personal/PersonalContent";

const PreferWorks = () => {
  return (
    <MainLayout class="justify-center mx-2">
      <div class="flex mx-2">
    <SidebarWithSearch/>
    <PersonalContent />
  </div>
  </MainLayout>
  );
};

export default PreferWorks;