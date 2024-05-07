import React from "react";
import { MainLayout } from "../layout/MainLayout";
import { MyWorksContent} from "../components/personal/MyWorksContent";

const MyWorks = () => {
  return (
    <MainLayout class="justify-center mx-2">
      <div class="flex mx-2">
      <MyWorksContent />
  </div>
  </MainLayout>
  );
};

export default MyWorks;
