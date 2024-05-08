import React from "react";
import { MainLayout } from "../layout/MainLayout";
import { MyWorksContent } from "../components/personal/MyWorksContent";
import { SidebarWithSearch } from "../components/sidebar/SideBar";

const MyWorks = () => {
  return (
    <MainLayout>
       <div class="flex">
        <SidebarWithSearch />
        <MyWorksContent />
        </div>
    </MainLayout>
  );
};

export default MyWorks;
