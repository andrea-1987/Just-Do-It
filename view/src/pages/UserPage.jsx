import React from "react";
import { MainLayout } from "../layout/MainLayout";
import { PersonalContent} from "../components/personal/PersonalContent";
import { jwtDecode } from "jwt-decode";

export const UserPage = () => {
  const session = localStorage.getItem('auth')
  const decodedSession = jwtDecode(session)
  return (
    <MainLayout>
      <PersonalContent/>
    </MainLayout>
  );
};
