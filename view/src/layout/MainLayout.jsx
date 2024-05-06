import React from "react";
import { StickyNavbar } from "../components/navBar/Navigation";
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
