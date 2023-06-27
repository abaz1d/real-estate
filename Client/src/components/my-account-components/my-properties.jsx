import React from "react"
import moment from "moment"
import { Link } from "react-router-dom"
import { getImgUrl } from "@/utils/helper"

const MyProperties = ({
  detail_users,
  cellRef,
  deleteGet,
  handleChange,
  totalPages,
  cari,
  setCari,
}) => {
  const getImg = function (buffer) {
    const gambars = getImgUrl(buffer)

    return import.meta.env.VITE_APP_BASE_API + "gambar_properti/" + gambars[0]
  }
  return (
    <div className="ltn__myaccount-tab-content-inner">
      <div className="ltn__search-widget mb-10">
        <form>
          <input
            type="text"
            value={cari.searchData}
            onChange={handleChange}
            name="searchData"
            placeholder="Search your keyword..."
          />
          <button
            aria-label="search-button"
            onClick={(e) => {
              e.preventDefault()
              if (cari.searchData !== "") {
                setCari({
                  ...cari,
                  searchData: "",
                })
              }
            }}
          >
            <i
              className={
                cari.searchData !== ""
                  ? "fa fa-backspace fa-lg text-white"
                  : "fas fa-search"
              }
            />
          </button>
        </form>
      </div>
      <div className="ltn__my-properties-table table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">My Properties</th>
              <th scope="col" />
              <th scope="col">Date Added</th>
              <th scope="col">Actions</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {detail_users &&
              detail_users.length >= 1 &&
              detail_users.map((item, index) => (
                <tr key={index}>
                  <td className="ltn__my-properties-img go-top">
                    <Link
                      to={`/product-details/${item.id_properti}`}
                      style={{ height: "250px" }}
                    >
                      <img
                        height={"auto"}
                        width={"100%"}
                        src={
                          item.foto_produk === null
                            ? "https://tunatheme.com/tf/react/quarter-preview/quarter/assets/img/product-3/1.jpg"
                            : getImg(item.foto_produk[0])
                        }
                        alt={"gambar" + index}
                      />
                      <span
                        style={{ marginTop: "-3px" }}
                        className="mb-0 py-0 d-flex justify-content-center align-items-center input-group-text border"
                      >
                        {item.id_properti}
                      </span>
                    </Link>
                  </td>
                  <td>
                    <div className="ltn__my-properties-info">
                      <h6 className="mb-10 go-top">
                        <Link to={`/product-details/${item.id_properti}`}>
                          {item.judul}
                        </Link>
                      </h6>
                      <small>
                        <i className="icon-placeholder" /> {item.kota},{" "}
                        {item.provinsi}
                      </small>
                      <div className="product-ratting">
                        <ul>
                          <li
                            className={
                              (item.kategori === "Jual"
                                ? "bg-green "
                                : "bg-orange ") +
                              "py-1 px-2 border border-primary fs-6"
                            }
                          >
                            {item.kategori}
                          </li>
                          <li className="ltn__blog-category">
                            <Link className="bg-primary" to="#">
                              {item.jenis_properti}
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </td>
                  <td>{moment(item.di_buat).format("DD MMMM YYYY")}</td>
                  <td>
                    <Link to={`/add-listing?id_properti=${item.id_properti}`}>
                      <i className="fa fa-edit" /> Edit
                    </Link>
                  </td>
                  <td
                    ref={(ele) => (cellRef.current[index] = ele)}
                    onClick={() => deleteGet(item.id_properti)}
                  >
                    <Link tp="#" className="text-danger">
                      <i className="fa-solid fa-trash-can" /> Delete
                    </Link>
                  </td>
                </tr>
              ))}
            {detail_users && detail_users.length < 1 && (
              <tr className="text-center text-secondary fs-2 w-100">
                <td colSpan={5}>Tidal Ada Data Di Temukan</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="ltn__pagination-area text-center">
        <div className="ltn__pagination">
          <ul>
            <li>
              <a
                onClick={() => handleChange("decrement")}
                className={cari.page_number === 1 ? "d-none" : ""}
              >
                <i className="fas fa-angle-double-left" />
              </a>
            </li>
            <li className="active">
              <a>{cari.page_number}</a>
            </li>
            <li>dari</li>
            <li>
              <a>{totalPages}</a>
            </li>
            <li>
              <a
                onClick={() => handleChange("increment")}
                className={
                  cari.page_number >= parseInt(totalPages) ? "d-none" : ""
                }
              >
                <i className="fas fa-angle-double-right" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default MyProperties
