import React from "react"
import Navbar from "./global-components/navbar"
import PageHeader from "./global-components/page-header"
import MyAccount from "./shop-components/my-account"
import CallToActionV1 from "./section-components/call-to-action-v1"
import Footer from "./global-components/footer"
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
