import React from "react"
import Navbar from "@/components/global-components/navbar"
import PageHeader from "@/components/global-components/page-header"
import RegisterForm from "@/components/section-components/register-form"
import CallToActionV1 from "@/components/section-components/call-to-action-v1"
import Footer from "@/components/global-components/footer"

const RegisterBox = () => {
  return (
    <div>
      <Navbar />
      <PageHeader headertitle="Account" subheader="Register" />
      <RegisterForm />
      <CallToActionV1 />
      <Footer />
    </div>
  )
}

export default RegisterBox
