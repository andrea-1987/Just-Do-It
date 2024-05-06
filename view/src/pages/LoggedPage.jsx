import React from 'react'
import { MainLayout } from '../layout/MainLayout'
import { WorksContent } from '../components/workContent/WorksContent'
import { SidebarWithSearch } from '../components/sidebar/SideBar'
import sessionData from '../helper/session'

const LoggedPage = () => {
if(sessionData){

  return (
      <MainLayout class="justify-center mx-2">
      <div class="flex mx-2">
    <SidebarWithSearch/>
    <WorksContent />
  </div>
  </MainLayout>
  )
}
}

export default LoggedPage