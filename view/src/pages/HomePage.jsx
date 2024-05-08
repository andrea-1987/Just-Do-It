import React from "react"
import { MainLayout } from "../layout/MainLayout"
import { UserSection } from "../components/homePage/UserSection"
import { ProfessionalSection } from "../components/homePage/ProfessionalSection"

export const HomePage=()=>{
       return(
        <MainLayout>
        <div class="flex flex-wrap justify-center justify-around p-10">
        <UserSection />
        <ProfessionalSection  />
        </div>
      </MainLayout>
     )
}