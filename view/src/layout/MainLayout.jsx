import React from "react";
import { StickyNavbar } from "../components/navBar/NavigationBar";
import { Footer } from "../components/footer/Footer";

export const MainLayout = ({ children }) => {
  return (
    <>
      <StickyNavbar />
      {children}
      <Footer />
    </>
  );
};
