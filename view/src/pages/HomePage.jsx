import React from "react"
import { MainContent } from "../components/homePage/MainContent"
import { MainLayout } from "../layout/MainLayout"
import sessionData from "../helper/session"

export const HomePage=()=>{
       return(
        <MainLayout>
            <MainContent/>
        </MainLayout>
     )
}