import React, { useEffect } from "react"
import Navbar from "@/components/global-components/navbar"
import PageHeader from "@/components/global-components/page-header"
import MyAccount from "@/components/my-account-components/my-account"
import CallToActionV1 from "@/components/section-components/call-to-action-v1"
import Footer from "@/components/global-components/footer"
import { LoggedIn } from "@/utils/api"

const MyaccountBox = () => {
  return (
    <div>
      <LoggedIn />
      <Navbar />
      <PageHeader headertitle="My Account" />
      <MyAccount />
      <CallToActionV1 />
      <Footer />
    </div>
  )
}

export default MyaccountBox
