const currencyFormatter = new Intl.NumberFormat("id", {
  style: "currency",
  currency: "IDR",
})

function currencyString(labelValue) {
  // Nine Zeroes for Billions
  return Math.abs(Number(labelValue)) >= 1.0e9
    ? Math.abs(Number(labelValue)) / 1.0e9 + " M"
    : // Six Zeroes for Millions
    Math.abs(Number(labelValue)) >= 1.0e6
    ? Math.abs(Number(labelValue)) / 1.0e6 + " jt"
    : // Three Zeroes for Thousands
    Math.abs(Number(labelValue)) >= 1.0e3
    ? Math.abs(Number(labelValue)) / 1.0e3 + " rb"
    : Math.abs(Number(labelValue))
}

const getImgUrl = function (buffer) {
  if (buffer) {
    var gambars = buffer.data
      .map((b) => String.fromCharCode(b))
      .join("")
      .replace(/[{}]/g, "")
      .replace(/"/g, "")
      .split(",")
    return gambars
  }
}
export { currencyFormatter, currencyString, getImgUrl }
