import React from "react"
import Navbar from "@/components/global-components/navbar"
import PageHeader from "@/components/global-components/page-header"
import LoginForm from "@/components/section-components/login-form"
import CallToActionV1 from "@/components/section-components/call-to-action-v1"
import Footer from "@/components/global-components/footer"

const LoginBox = () => {
  return (
    <div>
      <Navbar />
      <PageHeader headertitle="Account" subheader="Login" />
      <LoginForm />
      <CallToActionV1 />
      <Footer />
    </div>
  )
}

export default LoginBox
