import React from "react";
import { UserSection } from "./section/UserSection";
import { ProfessionalSection } from "./section/ProfessionalSection";
import styles from "./main.module.css"

export const MainContent=()=>{
    return(
      <div className={`${styles.content}`}>
        <UserSection/>
        <ProfessionalSection/>
        </div>
    )
}