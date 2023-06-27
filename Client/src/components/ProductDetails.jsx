import React, { useEffect, useState } from "react"
import Navbar from "./global-components/navbar"
import PageHeader from "./global-components/page-header"
import ProductSlider from "./shop-components/product-slider-v1"
import ProductDetails from "./shop-components/shop-details"
import CallToActionV1 from "./section-components/call-to-action-v1"
import Footer from "./global-components/footer"
import { useParams, useNavigate, useLocation } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import {
  selectPropertis,
  readDetailProperti,
} from "@/features/properti/propertiSlice"
import { getImgUrl } from "../utils/helper"

const Product_Details = () => {
  const [images, setImages] = useState([])
  const [userPic, setUserPic] = useState([])
  const location = useLocation()
  const navigate = useNavigate()
  const properti = useSelector(selectPropertis)
  const { id } = useParams()
  const dispatch = useDispatch()

  const getImg = async function (arg, gambar) {
    const gambars = await getImgUrl(gambar)
    if (arg === "images") {
      setImages(gambars)
    } else {
      setUserPic(gambars)
    }
  }

  const fetchData = async () => {
    try {
      document.querySelector(".quarter-overlay").style.display = "block"
      let data = await dispatch(readDetailProperti(id))
      if (data.payload.length === 0) {
        navigate("/shop-grid")
      }
      document.querySelector(".quarter-overlay").style.display = "none"
    } catch (error) {
      document.querySelector(".quarter-overlay").style.display = "none"
      console.error("fetchData Product Details", error)
    }
  }
  useEffect(() => {
    fetchData()
  }, [location, dispatch])
  useEffect(() => {
    if (properti.length == 1) {
      if (properti[0].foto_produk) {
        getImg("images", properti[0].foto_produk[0])
      }
      if (properti[0].foto_user) {
        getImg("userPic", properti[0].foto_user)
      }
    }
  }, [properti])

  return (
    <div>
      <Navbar />
      <PageHeader headertitle="Product Details" customclass="mb-0" />
      <ProductSlider images={images} />
      <ProductDetails images={images} properti={properti} userPic={userPic} />
      <CallToActionV1 />
      {properti.length == 1 && <Footer />}
    </div>
  )
}

export default Product_Details
