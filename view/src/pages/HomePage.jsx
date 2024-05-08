import React from "react"
import { MainLayout } from "../layout/MainLayout"
import { UserSection } from "../components/homePage/section/UserSection"
import { ProfessionalSection } from "../components/homePage/section/ProfessionalSection"

export const HomePage=()=>{
       return(
        <MainLayout>
        <div class="flex justify-center justify-around">
        <UserSection/>
        <ProfessionalSection/>
        </div>
      </MainLayout>
     )
}