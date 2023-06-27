import React from "react"

const DashboardAccount = ({ detail_users }) => {
  return (
    <div className="ltn__myaccount-tab-content-inner">
      <p>
        Hello{" "}
        <strong>
          {detail_users && detail_users.length >= 1
            ? detail_users[0].nama_lengkap
            : "Nama Lengkap"}
        </strong>
        , Selamat Datang Kembali{" "}
      </p>
      <p>
        From your account dashboard you can view your <span>recent orders</span>
        , manage your <span>shipping and billing addresses</span>, and{" "}
        <span>edit your password and account details</span>.
      </p>
    </div>
  )
}

export default DashboardAccount
