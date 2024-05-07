import React from "react";
import { MainLayout } from "../layout/MainLayout";
import { PreferWorksContent } from "../components/personal/PreferWorksContent";


const PreferWorks = () => {
  return (
    <MainLayout class="justify-center mx-2">
      <div class="flex mx-2">
  <PreferWorksContent/>
  </div>
  </MainLayout>
  );
};

export default PreferWorks;