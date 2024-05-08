import React from "react";
import { MainLayout } from "../layout/MainLayout";
import { PreferWorksContent } from "../components/personal/PreferWorksContent";
import { SidebarWithSearch } from "../components/sidebar/SideBar";

const PreferWorks = () => {
  return (
    <MainLayout>
    <div class="flex">
     <SidebarWithSearch />
     <PreferWorksContent />
     </div>
 </MainLayout>
  );
};

export default PreferWorks;