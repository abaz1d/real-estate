import React, { useEffect } from "react"
import Navbar from "./global-components/navbar"
import PageHeader from "./global-components/page-header"
import ProductSlider from "./shop-components/product-slider-v1"
import ProductDetails from "./shop-components/shop-details"
import CallToActionV1 from "./section-components/call-to-action-v1"
import Footer from "./global-components/footer"
import { useParams, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import {
  selectPropertis,
  readDetailProperti,
} from "@/features/properti/propertiSlice"

const Product_Details = () => {
  const navigate = useNavigate()
  const properti = useSelector(selectPropertis)
  const { id } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(readDetailProperti(id))
  }, [dispatch])
  useEffect(() => {
    if (properti.length === 0) {
      navigate("/")
    }
  }, [dispatch])

  return (
    <div>
      <Navbar />
      <PageHeader headertitle="Product Details" customclass="mb-0" />
      <ProductSlider properti={properti} />
      <ProductDetails properti={properti} />
      <CallToActionV1 />
      <Footer />
    </div>
  )
}

export default Product_Details
