import React from "react";
import { MainLayout } from "../layout/MainLayout";
import { DetailContent } from "../components/detail/DetailContent";
import { SidebarWithSearch } from "../components/sidebar/SideBar";

export const DetailPage=()=>{

    return(
        <MainLayout>
        <div class="flex">
        <SidebarWithSearch />
        <DetailContent />
        </div>
      </MainLayout>
    )
}