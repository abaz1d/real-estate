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

const Product_Details = () => {
  const [images, setImages] = useState([])
  const location = useLocation()
  const navigate = useNavigate()
  const properti = useSelector(selectPropertis)
  const { id } = useParams()
  const dispatch = useDispatch()

  const getImgUrl = async function (gambar) {
    if (gambar) {
      var gambars = gambar.data
        .map((b) => String.fromCharCode(b))
        .join("")
        .replace(/[{}]/g, "")
        .replace(/"/g, "")
        .split(",")
      setImages(...images, gambars)
      //return new URL(`${publicPath}gambar_kantor/${images}`).href
    }
  }

  const fetchData = async () => {
    let data = await dispatch(readDetailProperti(id))
    if (data.payload.length === 0) {
      navigate("/shop-grid")
    }
  }
  useEffect(() => {
    fetchData()
  }, [location, dispatch])

  //console.log("properti", properti)

  useEffect(() => {
    if (properti.length == 1 && properti[0].foto_produk) {
      getImgUrl(properti[0].foto_produk[0])
    }
  }, [properti])

  return (
    <div>
      <Navbar />
      <PageHeader headertitle="Product Details" customclass="mb-0" />
      <ProductSlider images={images} />
      <ProductDetails images={images} properti={properti} />
      <CallToActionV1 />
      {properti.length == 1 && <Footer />}
    </div>
  )
}

export default Product_Details
