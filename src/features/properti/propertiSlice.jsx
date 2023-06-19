import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import * as API from "./propertiAPI"
import {
  READ_PROPERTI,
  CREATE_PROPERTI,
  UPDATE_PROPERTI,
  REMOVE_PROPERTI,
  READ_DETAIL_PROPERTI,
} from "../../utils/constants"

const initialState = {
  propertis: [
    {
      judul: "Rumah type 45",
      deskripsi:
        "Rumah DIJUAL di Cluster Pandanaran Hills\nSambiroto, Tembalang, Semarang\nDeveloper by Jaya Metro\nLs.Tanah: 105 m²\nLs.Bangunan: 45 m²\nK.Tidur: 2\nK.Mandi: 1\nCarport: 1\nSHM, Listrik 2200w, Air Artetis\nPlafon tinggi, Halaman belakang lantai plester\nHarga Rp.760jt. Turun harga jadi Rp.752jt\nHub: Edwin Chan Property\n\nFasilitas perum: Swimming Pool, Masjid Al Muhajirin\nKeunggulan Lokasi:\n4 mnt ke RS Primaya\n12 mnt ke Exit Tol Gayamsari\n14 mnt ke Java Mall & UNDIP Tembalang\n27 mnt ke Stasiun Tawang\n38 mnt ke Bandara Ahmad Yani",
      jenis_properti: "Rumah",
      kategori: "Jual",
      status: "Aktif",
      total_harga: "752000000",
      harga_tanah: "352000000",
      harga_bangunan: "400000000",
      pajak: "0",
      gambar:
        "https://tunatheme.com/tf/react/quarter-preview/quarter/assets/img/product-3/1.jpg",
      alamat: "Sambiroto, Tembalang, Semarang",
      kota: "Semarang",
      provinsi: "Jawa Tengah",
      kode_pos: "50185",
      luas_properti: "105",
      jenis_sertifikat: "shm",
      tahun_pembangunan: "205",
      daya_listrik: "2200",
      jumlah_lantai: "2",
      jumlah_ruangan: "4",
      kamar_tidur: "2",
      kamar_mandi: "1",
    },
    {
      judul: "Apartemen City View",
      deskripsi:
        "Apartemen Disewakan di City View Residence\nJl. Sudirman Kav. 10, Jakarta Pusat\nLantai 20, View Kuningan\nL. Bangunan: 60 m²\nK. Tidur: 2\nK. Mandi: 1\nFurnished\nFasilitas: Kolam Renang, Gym, Keamanan 24 Jam\nHarga Sewa: Rp. 8.000.000/bulan\nHubungi: City Property",
      jenis_properti: "Apartemen",
      kategori: "Sewa",
      status: "Aktif",
      total_harga: "800000",
      harga_tanah: "0",
      harga_bangunan: "0",
      pajak: "0",
      gambar:
        "https://tunatheme.com/tf/react/quarter-preview/quarter/assets/img/product-3/2.jpg",
      alamat: "Jl. Sudirman Kav. 10, Jakarta Pusat",
      kota: "Jakarta Pusat",
      provinsi: "DKI Jakarta",
      kode_pos: "10220",
      luas_properti: "60",
      jenis_sertifikat: "-",
      tahun_pembangunan: "-",
      daya_listrik: "-",
      jumlah_lantai: "20",
      jumlah_ruangan: "3",
      kamar_tidur: "2",
      kamar_mandi: "1",
    },
    {
      judul: "Tanah Komersial di Cikarang",
      deskripsi:
        "Dijual Tanah Komersial di Cikarang\nLs. Tanah: 500 m²\nLebar Depan: 20 meter\nSertifikat: SHM\nHarga: Rp. 5.000.000/m²\nKontak: Jaya Property",
      jenis_properti: "Tanah",
      kategori: "Jual",
      status: "Aktif",
      total_harga: "2500000000",
      harga_tanah: "2500000000",
      harga_bangunan: "0",
      pajak: "0",
      gambar:
        "https://tunatheme.com/tf/react/quarter-preview/quarter/assets/img/product-3/3.jpg",
      alamat: "Cikarang",
      kota: "Bekasi",
      provinsi: "Jawa Barat",
      kode_pos: "-",
      luas_properti: "500",
      jenis_sertifikat: "shm",
      tahun_pembangunan: "-",
      daya_listrik: "-",
      jumlah_lantai: "-",
      jumlah_ruangan: "-",
      kamar_tidur: "-",
      kamar_mandi: "-",
    },
    {
      judul: "Apartemen Cozy Residence",
      deskripsi:
        "Apartemen Disewakan di Cozy Residence\nJl. Gatot Subroto Kav. 15, Bandung\nL. Bangunan: 45 m²\nK. Tidur: 1\nK. Mandi: 1\nFurnished\nFasilitas: Kolam Renang, Gym, Keamanan 24 Jam\nHarga Sewa: Rp. 5.000.000/bulan\nHubungi: Bandung Property",
      jenis_properti: "Apartemen",
      kategori: "Sewa",
      status: "Aktif",
      total_harga: "800000",
      harga_tanah: "0",
      harga_bangunan: "0",
      pajak: "0",
      gambar:
        "https://tunatheme.com/tf/react/quarter-preview/quarter/assets/img/product-3/4.jpg",
      alamat: "Jl. Gatot Subroto Kav. 15, Bandung",
      kota: "Bandung",
      provinsi: "Jawa Barat",
      kode_pos: "-",
      luas_properti: "45",
      jenis_sertifikat: "-",
      tahun_pembangunan: "-",
      daya_listrik: "-",
      jumlah_lantai: "-",
      jumlah_ruangan: "2",
      kamar_tidur: "1",
      kamar_mandi: "1",
    },
    {
      judul: "Ruko Strategis di Bogor",
      deskripsi:
        "Dijual Ruko Strategis di Bogor\nLs. Tanah: 80 m²\nL. Bangunan: 200 m²\n2 Lantai\nSHM\nHarga: Rp. 2.500.000.000\nKontak: Bogor Property",
      jenis_properti: "Ruko",
      kategori: "Jual",
      status: "Aktif",
      total_harga: "2500000000",
      harga_tanah: "0",
      harga_bangunan: "2500000000",
      pajak: "0",
      gambar:
        "https://tunatheme.com/tf/react/quarter-preview/quarter/assets/img/product-3/5.jpg",
      alamat: "Bogor",
      kota: "Bogor",
      provinsi: "Jawa Barat",
      kode_pos: "-",
      luas_properti: "200",
      jenis_sertifikat: "shm",
      tahun_pembangunan: "-",
      daya_listrik: "-",
      jumlah_lantai: "2",
      jumlah_ruangan: "-",
      kamar_tidur: "-",
      kamar_mandi: "-",
    },
    {
      judul: "Rumah Mewah di Pondok Indah",
      deskripsi:
        "Rumah Dijual di Pondok Indah\nLs. Tanah: 500 m²\nLs. Bangunan: 700 m²\n4 Lantai\nK. Tidur: 5\nK. Mandi: 6\nGarasi: 2 mobil\nHarga: Rp. 25.000.000.000\nKontak: Pondok Indah Property",
      jenis_properti: "Rumah",
      kategori: "Jual",
      status: "Aktif",
      total_harga: "25000000000",
      harga_tanah: "0",
      harga_bangunan: "25000000000",
      pajak: "0",
      gambar:
        "https://tunatheme.com/tf/react/quarter-preview/quarter/assets/img/product-3/6.jpg",
      alamat: "Pondok Indah",
      kota: "Jakarta Selatan",
      provinsi: "DKI Jakarta",
      kode_pos: "-",
      luas_properti: "700",
      jenis_sertifikat: "-",
      tahun_pembangunan: "-",
      daya_listrik: "-",
      jumlah_lantai: "4",
      jumlah_ruangan: "-",
      kamar_tidur: "5",
      kamar_mandi: "6",
    },
    {
      judul: "Apartemen Exclusive Residence",
      deskripsi:
        "Apartemen Dijual di Exclusive Residence\nJl. MH Thamrin, Jakarta Pusat\nL. Bangunan: 80 m²\nK. Tidur: 2\nK. Mandi: 2\nFurnished\nFasilitas: Kolam Renang, Gym, Keamanan 24 Jam\nHarga: Rp. 5.000.000.000\nKontak: Exclusive Property",
      jenis_properti: "Apartemen",
      kategori: "Jual",
      status: "Aktif",
      total_harga: "5000000000",
      harga_tanah: "0",
      harga_bangunan: "5000000000",
      pajak: "0",
      gambar:
        "https://tunatheme.com/tf/react/quarter-preview/quarter/assets/img/product-3/7.jpg",
      alamat: "Jl. MH Thamrin, Jakarta Pusat",
      kota: "Jakarta Pusat",
      provinsi: "DKI Jakarta",
      kode_pos: "-",
      luas_properti: "80",
      jenis_sertifikat: "-",
      tahun_pembangunan: "-",
      daya_listrik: "-",
      jumlah_lantai: "-",
      jumlah_ruangan: "3",
      kamar_tidur: "2",
      kamar_mandi: "2",
    },
    {
      judul: "Tanah Industri di Karawang",
      deskripsi:
        "Dijual Tanah Industri di Karawang\nLs. Tanah: 1.000 m²\nLebar Depan: 30 meter\nSertifikat: SHM\nHarga: Rp. 10.000.000/m²\nKontak: Karawang Property",
      jenis_properti: "Tanah",
      kategori: "Jual",
      status: "Aktif",
      total_harga: "10000000000",
      harga_tanah: "10000000000",
      harga_bangunan: "0",
      pajak: "0",
      gambar:
        "https://tunatheme.com/tf/react/quarter-preview/quarter/assets/img/product-3/8.jpg",
      alamat: "Karawang",
      kota: "Karawang",
      provinsi: "Jawa Barat",
      kode_pos: "-",
      luas_properti: "1000",
      jenis_sertifikat: "shm",
      tahun_pembangunan: "-",
      daya_listrik: "-",
      jumlah_lantai: "-",
      jumlah_ruangan: "-",
      kamar_tidur: "-",
      kamar_mandi: "-",
    },
    {
      judul: "Rumah Minimalis di Depok",
      deskripsi:
        "Rumah Dijual di Depok\nLs. Tanah: 120 m²\nLs. Bangunan: 100 m²\nK. Tidur: 3\nK. Mandi: 2\nCarport: 1\nSHM\nHarga: Rp. 1.200.000.000\nKontak: Depok Property",
      jenis_properti: "Rumah",
      kategori: "Jual",
      status: "Aktif",
      total_harga: "1200000000",
      harga_tanah: "0",
      harga_bangunan: "1200000000",
      pajak: "0",
      gambar:
        "https://tunatheme.com/tf/react/quarter-preview/quarter/assets/img/product-3/9.jpg",
      alamat: "Depok",
      kota: "Depok",
      provinsi: "Jawa Barat",
      kode_pos: "-",
      luas_properti: "100",
      jenis_sertifikat: "shm",
      tahun_pembangunan: "-",
      daya_listrik: "-",
      jumlah_lantai: "-",
      jumlah_ruangan: "4",
      kamar_tidur: "3",
      kamar_mandi: "2",
    },
    {
      judul: "Apartemen Grand Tower",
      deskripsi:
        "Apartemen Disewakan di Grand Tower\nJl. Thamrin, Jakarta Pusat\nL. Bangunan: 70 m²\nK. Tidur: 2\nK. Mandi: 2\nFurnished\nFasilitas: Kolam Renang, Gym, Keamanan 24 Jam\nHarga Sewa: Rp. 10.000.000/bulan\nHubungi: Grand Property",
      jenis_properti: "Apartemen",
      kategori: "Sewa",
      status: "Aktif",
      total_harga: "800000",
      harga_tanah: "0",
      harga_bangunan: "0",
      pajak: "0",
      gambar:
        "https://tunatheme.com/tf/react/quarter-preview/quarter/assets/img/product-3/10.jpg",
      alamat: "Jl. Thamrin, Jakarta Pusat",
      kota: "Jakarta Pusat",
      provinsi: "DKI Jakarta",
      kode_pos: "-",
      luas_properti: "70",
      jenis_sertifikat: "-",
      tahun_pembangunan: "-",
      daya_listrik: "-",
      jumlah_lantai: "-",
      jumlah_ruangan: "3",
      kamar_tidur: "2",
      kamar_mandi: "2",
    },
    {
      judul: "Ruko Strategis di Surabaya",
      deskripsi:
        "Dijual Ruko Strategis di Surabaya\nLs. Tanah: 120 m²\nLs. Bangunan: 200 m²\n2 Lantai\nSHM\nHarga: Rp. 3.500.000.000\nKontak: Surabaya Property",
      jenis_properti: "Ruko",
      kategori: "Jual",
      status: "Aktif",
      total_harga: "3500000000",
      harga_tanah: "0",
      harga_bangunan: "3500000000",
      pajak: "0",
      gambar:
        "https://tunatheme.com/tf/react/quarter-preview/quarter/assets/img/product-3/1.jpg",
      alamat: "Surabaya",
      kota: "Surabaya",
      provinsi: "Jawa Timur",
      kode_pos: "-",
      luas_properti: "200",
      jenis_sertifikat: "shm",
      tahun_pembangunan: "-",
      daya_listrik: "-",
      jumlah_lantai: "2",
      jumlah_ruangan: "-",
      kamar_tidur: "-",
      kamar_mandi: "-",
    },
    {
      judul: "Rumah Elegan di BSD City",
      deskripsi:
        "Rumah Dijual di BSD City\nLs. Tanah: 200 m²\nLs. Bangunan: 300 m²\n2 Lantai\nK. Tidur: 4\nK. Mandi: 3\nCarport: 2\nSHM\nHarga: Rp. 4.500.000.000\nKontak: BSD Property",
      jenis_properti: "Rumah",
      kategori: "Jual",
      status: "Aktif",
      total_harga: "4500000000",
      harga_tanah: "0",
      harga_bangunan: "4500000000",
      pajak: "0",
      gambar:
        "https://tunatheme.com/tf/react/quarter-preview/quarter/assets/img/product-3/2.jpg",
      alamat: "BSD City",
      kota: "Tangerang Selatan",
      provinsi: "Banten",
      kode_pos: "-",
      luas_properti: "300",
      jenis_sertifikat: "shm",
      tahun_pembangunan: "-",
      daya_listrik: "-",
      jumlah_lantai: "2",
      jumlah_ruangan: "-",
      kamar_tidur: "4",
      kamar_mandi: "3",
    },
    {
      judul: "Apartemen Luxury Living",
      deskripsi:
        "Apartemen Dijual di Luxury Living\nJl. Sudirman, Jakarta Selatan\nL. Bangunan: 100 m²\nK. Tidur: 3\nK. Mandi: 2\nFurnished\nFasilitas: Kolam Renang, Gym, Keamanan 24 Jam\nHarga: Rp. 8.000.000.000\nKontak: Luxury Property",
      jenis_properti: "Apartemen",
      kategori: "Jual",
      status: "Aktif",
      total_harga: "8000000000",
      harga_tanah: "0",
      harga_bangunan: "8000000000",
      pajak: "0",
      gambar:
        "https://tunatheme.com/tf/react/quarter-preview/quarter/assets/img/product-3/3.jpg",
      alamat: "Jl. Sudirman, Jakarta Selatan",
      kota: "Jakarta Selatan",
      provinsi: "DKI Jakarta",
      kode_pos: "-",
      luas_properti: "100",
      jenis_sertifikat: "-",
      tahun_pembangunan: "-",
      daya_listrik: "-",
      jumlah_lantai: "-",
      jumlah_ruangan: "4",
      kamar_tidur: "3",
      kamar_mandi: "2",
    },
    {
      judul: "Tanah Komersial di Bandung",
      deskripsi:
        "Dijual Tanah Komersial di Bandung\nLs. Tanah: 500 m²\nLebar Depan: 20 meter\nSHM\nHarga: Rp. 15.000.000.000\nKontak: Bandung Property",
      jenis_properti: "Tanah",
      kategori: "Jual",
      status: "Aktif",
      total_harga: "15000000000",
      harga_tanah: "15000000000",
      harga_bangunan: "0",
      pajak: "0",
      gambar:
        "https://tunatheme.com/tf/react/quarter-preview/quarter/assets/img/product-3/4.jpg",
      alamat: "Bandung",
      kota: "Bandung",
      provinsi: "Jawa Barat",
      kode_pos: "-",
      luas_properti: "500",
      jenis_sertifikat: "shm",
      tahun_pembangunan: "-",
      daya_listrik: "-",
      jumlah_lantai: "-",
      jumlah_ruangan: "-",
      kamar_tidur: "-",
      kamar_mandi: "-",
    },
    {
      judul: "Rumah Modern di Cinere",
      deskripsi:
        "Rumah Dijual di Cinere\nLs. Tanah: 150 m²\nLs. Bangunan: 180 m²\nK. Tidur: 4\nK. Mandi: 3\nCarport: 2\nSHM\nHarga: Rp. 2.500.000.000\nKontak: Cinere Property",
      jenis_properti: "Rumah",
      kategori: "Jual",
      status: "Aktif",
      total_harga: "2500000000",
      harga_tanah: "0",
      harga_bangunan: "2500000000",
      pajak: "0",
      gambar:
        "https://tunatheme.com/tf/react/quarter-preview/quarter/assets/img/product-3/5.jpg",
      alamat: "Cinere",
      kota: "Depok",
      provinsi: "Jawa Barat",
      kode_pos: "-",
      luas_properti: "180",
      jenis_sertifikat: "shm",
      tahun_pembangunan: "-",
      daya_listrik: "-",
      jumlah_lantai: "-",
      jumlah_ruangan: "5",
      kamar_tidur: "4",
      kamar_mandi: "3",
    },
    {
      judul: "Apartemen City View",
      deskripsi:
        "Apartemen Disewakan di City View\nJl. Gatot Subroto, Jakarta Selatan\nL. Bangunan: 60 m²\nK. Tidur: 2\nK. Mandi: 1\nFurnished\nFasilitas: Kolam Renang, Gym, Keamanan 24 Jam\nHarga Sewa: Rp. 7.000.000/bulan\nHubungi: City Property",
      jenis_properti: "Apartemen",
      kategori: "Sewa",
      status: "Aktif",
      total_harga: "800000",
      harga_tanah: "0",
      harga_bangunan: "0",
      pajak: "0",
      gambar:
        "https://tunatheme.com/tf/react/quarter-preview/quarter/assets/img/product-3/6.jpg",
      alamat: "Jl. Gatot Subroto, Jakarta Selatan",
      kota: "Jakarta Selatan",
      provinsi: "DKI Jakarta",
      kode_pos: "-",
      luas_properti: "60",
      jenis_sertifikat: "-",
      tahun_pembangunan: "-",
      daya_listrik: "-",
      jumlah_lantai: "-",
      jumlah_ruangan: "3",
      kamar_tidur: "2",
      kamar_mandi: "1",
    },
    {
      judul: "Rumah Cluster di Bogor",
      deskripsi:
        "Rumah Dijual di Cluster Bogor\nLs. Tanah: 120 m²\nLs. Bangunan: 150 m²\nK. Tidur: 3\nK. Mandi: 2\nCarport: 1\nSHM\nHarga: Rp. 1.800.000.000\nKontak: Bogor Property",
      jenis_properti: "Rumah",
      kategori: "Jual",
      status: "Aktif",
      total_harga: "1800000000",
      harga_tanah: "0",
      harga_bangunan: "1800000000",
      pajak: "0",
      gambar:
        "https://tunatheme.com/tf/react/quarter-preview/quarter/assets/img/product-3/7.jpg",
      alamat: "Bogor",
      kota: "Bogor",
      provinsi: "Jawa Barat",
      kode_pos: "-",
      luas_properti: "150",
      jenis_sertifikat: "shm",
      tahun_pembangunan: "-",
      daya_listrik: "-",
      jumlah_lantai: "-",
      jumlah_ruangan: "-",
      kamar_tidur: "3",
      kamar_mandi: "2",
    },
    {
      judul: "Apartemen City View",
      deskripsi:
        "Apartemen DISEWA di daerah Sudirman\nTower A, lantai 15\nLuas: 50 m²\nKamar Tidur: 2\nKamar Mandi: 1\nFasilitas: Kolam Renang, Gym, Keamanan 24 jam\nHarga Sewa: Rp. 5.000.000/bulan\nHubungi: 0812-345-6789",
      jenis_properti: "Apartemen",
      kategori: "Sewa",
      status: "Aktif",
      total_harga: "700000",
      harga_tanah: "0",
      harga_bangunan: "0",
      pajak: "0",
      gambar:
        "https://tunatheme.com/tf/react/quarter-preview/quarter/assets/img/product-3/8.jpg",
      alamat: "Jl. Sudirman No. 123",
      kota: "Jakarta",
      provinsi: "DKI Jakarta",
      kode_pos: "12345",
      luas_properti: "50",
      jenis_sertifikat: "Hak Milik",
      tahun_pembangunan: "2010",
      daya_listrik: "2200",
      jumlah_lantai: "15",
      jumlah_ruangan: "3",
      kamar_tidur: "2",
      kamar_mandi: "1",
    },
    {
      judul: "Tanah Kavling Siap Bangun",
      deskripsi:
        "Tanah DIJUAL di daerah Kebon Jeruk\nLuas Tanah: 200 m²\nLebar Depan: 10 meter\nSertifikat: SHM\nHarga: Rp. 1.500.000.000\nHubungi: 0812-345-6789",
      jenis_properti: "Tanah",
      kategori: "Jual",
      status: "Aktif",
      total_harga: "1500000000",
      harga_tanah: "1500000000",
      harga_bangunan: "0",
      pajak: "0",
      gambar:
        "https://tunatheme.com/tf/react/quarter-preview/quarter/assets/img/product-3/9.jpg",
      alamat: "Jl. Kavling Indah No. 456",
      kota: "Jakarta Barat",
      provinsi: "DKI Jakarta",
      kode_pos: "54321",
      luas_properti: "200",
      jenis_sertifikat: "SHM",
      tahun_pembangunan: "",
      daya_listrik: "0",
      jumlah_lantai: "0",
      jumlah_ruangan: "0",
      kamar_tidur: "0",
      kamar_mandi: "0",
    },
    {
      judul: "Ruko Strategis",
      deskripsi:
        "Ruko DISEWA di daerah Puri Indah\nLuas Bangunan: 100 m²\nLantai: 3\nFasilitas: Parkir, Keamanan 24 jam\nHarga Sewa: Rp. 20.000.000/bulan\nHubungi: 0812-345-6789",
      jenis_properti: "Ruko",
      kategori: "Sewa",
      status: "Aktif",
      total_harga: "700000",
      harga_tanah: "0",
      harga_bangunan: "0",
      pajak: "0",
      gambar:
        "https://tunatheme.com/tf/react/quarter-preview/quarter/assets/img/product-3/10.jpg",
      alamat: "Jl. Raya Puri Indah No. 789",
      kota: "Jakarta Barat",
      provinsi: "DKI Jakarta",
      kode_pos: "98765",
      luas_properti: "100",
      jenis_sertifikat: "Hak Guna Bangunan",
      tahun_pembangunan: "2015",
      daya_listrik: "5500",
      jumlah_lantai: "3",
      jumlah_ruangan: "5",
      kamar_tidur: "0",
      kamar_mandi: "0",
    },
    {
      judul: "Villa Mewah di Puncak",
      deskripsi:
        "Villa DIJUAL di daerah Puncak\nLuas Tanah: 1000 m²\nLuas Bangunan: 500 m²\nKamar Tidur: 6\nKamar Mandi: 6\nFasilitas: Kolam Renang, Taman, Parkir\nHarga: Rp. 5.000.000.000\nHubungi: 0812-345-6789",
      jenis_properti: "Villa",
      kategori: "Jual",
      status: "Aktif",
      total_harga: "5000000000",
      harga_tanah: "5000000000",
      harga_bangunan: "0",
      pajak: "0",
      gambar:
        "https://tunatheme.com/tf/react/quarter-preview/quarter/assets/img/product-3/1.jpg",
      alamat: "Jl. Puncak Indah No. 321",
      kota: "Bogor",
      provinsi: "Jawa Barat",
      kode_pos: "24680",
      luas_properti: "1000",
      jenis_sertifikat: "Hak Milik",
      tahun_pembangunan: "2012",
      daya_listrik: "7700",
      jumlah_lantai: "2",
      jumlah_ruangan: "10",
      kamar_tidur: "6",
      kamar_mandi: "6",
    },
    {
      judul: "Apartemen Cozy Residence",
      deskripsi:
        "Apartemen DISEWA di daerah Kuningan\nTower B, lantai 10\nLuas: 70 m²\nKamar Tidur: 2\nKamar Mandi: 2\nFasilitas: Kolam Renang, Gym, Keamanan 24 jam\nHarga Sewa: Rp. 7.500.000/bulan\nHubungi: 0812-345-6789",
      jenis_properti: "Apartemen",
      kategori: "Sewa",
      status: "Aktif",
      total_harga: "700000",
      harga_tanah: "0",
      harga_bangunan: "0",
      pajak: "0",
      gambar:
        "https://tunatheme.com/tf/react/quarter-preview/quarter/assets/img/product-3/2.jpg",
      alamat: "Jl. Kuningan Jaya No. 789",
      kota: "Jakarta Selatan",
      provinsi: "DKI Jakarta",
      kode_pos: "54321",
      luas_properti: "70",
      jenis_sertifikat: "Hak Milik",
      tahun_pembangunan: "2014",
      daya_listrik: "2200",
      jumlah_lantai: "10",
      jumlah_ruangan: "4",
      kamar_tidur: "2",
      kamar_mandi: "2",
    },
    {
      judul: "Tanah Komersial Pinggir Jalan",
      deskripsi:
        "Tanah DIJUAL di daerah Gading Serpong\nLuas Tanah: 500 m²\nLebar Depan: 15 meter\nSertifikat: SHM\nHarga: Rp. 10.000.000.000\nHubungi: 0812-345-6789",
      jenis_properti: "Tanah",
      kategori: "Jual",
      status: "Aktif",
      total_harga: "10000000000",
      harga_tanah: "10000000000",
      harga_bangunan: "0",
      pajak: "0",
      gambar:
        "https://tunatheme.com/tf/react/quarter-preview/quarter/assets/img/product-3/3.jpg",
      alamat: "Jl. Boulevard Raya No. 123",
      kota: "Tangerang",
      provinsi: "Banten",
      kode_pos: "54321",
      luas_properti: "500",
      jenis_sertifikat: "SHM",
      tahun_pembangunan: "",
      daya_listrik: "0",
      jumlah_lantai: "0",
      jumlah_ruangan: "0",
      kamar_tidur: "0",
      kamar_mandi: "0",
    },
    {
      judul: "Rumah Minimalis Nyaman",
      deskripsi:
        "Rumah DISEWA di daerah Cinere\nLuas Tanah: 150 m²\nLuas Bangunan: 100 m²\nKamar Tidur: 3\nKamar Mandi: 2\nFasilitas: Carport, Taman\nHarga Sewa: Rp. 10.000.000/bulan\nHubungi: 0812-345-6789",
      jenis_properti: "Rumah",
      kategori: "Sewa",
      status: "Aktif",
      total_harga: "700000",
      harga_tanah: "0",
      harga_bangunan: "0",
      pajak: "0",
      gambar:
        "https://tunatheme.com/tf/react/quarter-preview/quarter/assets/img/product-3/4.jpg",
      alamat: "Jl. Menteng Indah No. 321",
      kota: "Depok",
      provinsi: "Jawa Barat",
      kode_pos: "67890",
      luas_properti: "150",
      jenis_sertifikat: "Hak Milik",
      tahun_pembangunan: "2008",
      daya_listrik: "3500",
      jumlah_lantai: "2",
      jumlah_ruangan: "5",
      kamar_tidur: "3",
      kamar_mandi: "2",
    },
    {
      judul: "Apartemen Modern di Sudirman",
      deskripsi:
        "Apartemen DISEWA di daerah Sudirman\nTower C, lantai 25\nLuas: 80 m²\nKamar Tidur: 2\nKamar Mandi: 2\nFasilitas: Kolam Renang, Gym, Keamanan 24 jam\nHarga Sewa: Rp. 8.000.000/bulan\nHubungi: 0812-345-6789",
      jenis_properti: "Apartemen",
      kategori: "Sewa",
      status: "Aktif",
      total_harga: "700000",
      harga_tanah: "0",
      harga_bangunan: "0",
      pajak: "0",
      gambar:
        "https://tunatheme.com/tf/react/quarter-preview/quarter/assets/img/product-3/5.jpg",
      alamat: "Jl. Sudirman Kav. 123",
      kota: "Jakarta Pusat",
      provinsi: "DKI Jakarta",
      kode_pos: "54321",
      luas_properti: "80",
      jenis_sertifikat: "Hak Guna Bangunan",
      tahun_pembangunan: "2017",
      daya_listrik: "2200",
      jumlah_lantai: "25",
      jumlah_ruangan: "4",
      kamar_tidur: "2",
      kamar_mandi: "2",
    },
    {
      judul: "Rumah Mewah di Senayan",
      deskripsi:
        "Rumah DIJUAL di daerah Senayan\nLuas Tanah: 500 m²\nLuas Bangunan: 800 m²\nKamar Tidur: 5\nKamar Mandi: 5\nFasilitas: Kolam Renang, Taman, Parkir\nHarga: Rp. 25.000.000.000\nHubungi: 0812-345-6789",
      jenis_properti: "Rumah",
      kategori: "Jual",
      status: "Aktif",
      total_harga: "25000000000",
      harga_tanah: "25000000000",
      harga_bangunan: "0",
      pajak: "0",
      gambar:
        "https://tunatheme.com/tf/react/quarter-preview/quarter/assets/img/product-3/6.jpg",
      alamat: "Jl. Senayan Indah No. 456",
      kota: "Jakarta Selatan",
      provinsi: "DKI Jakarta",
      kode_pos: "54321",
      luas_properti: "500",
      jenis_sertifikat: "Hak Milik",
      tahun_pembangunan: "2010",
      daya_listrik: "7700",
      jumlah_lantai: "3",
      jumlah_ruangan: "10",
      kamar_tidur: "5",
      kamar_mandi: "5",
    },
    {
      judul: "Tanah Komersial di Thamrin",
      deskripsi:
        "Tanah DIJUAL di daerah Thamrin\nLuas Tanah: 1000 m²\nLebar Depan: 20 meter\nSertifikat: SHM\nHarga: Rp. 50.000.000.000\nHubungi: 0812-345-6789",
      jenis_properti: "Tanah",
      kategori: "Jual",
      status: "Aktif",
      total_harga: "50000000000",
      harga_tanah: "50000000000",
      harga_bangunan: "0",
      pajak: "0",
      gambar:
        "https://tunatheme.com/tf/react/quarter-preview/quarter/assets/img/product-3/7.jpg",
      alamat: "Jl. Thamrin No. 789",
      kota: "Jakarta Pusat",
      provinsi: "DKI Jakarta",
      kode_pos: "54321",
      luas_properti: "1000",
      jenis_sertifikat: "SHM",
      tahun_pembangunan: "",
      daya_listrik: "0",
      jumlah_lantai: "0",
      jumlah_ruangan: "0",
      kamar_tidur: "0",
      kamar_mandi: "0",
    },
  ],
  status: "idle",
}

export const readProperti = createAsyncThunk(READ_PROPERTI, async (arg) => {
  try {
    let arrayKosong
    typeof arg === "string"
      ? (arrayKosong = [])
      : (arrayKosong = { rows: [], total_pages: 0 })
    const { data } = await API.read(arg)
    //console.log(data)
    if (data.success) {
      return data.data
    } else {
      return arrayKosong
    }
  } catch (error) {
    console.error(error)
    return arrayKosong
  }
})

export const createPropertiAsync = createAsyncThunk(
  CREATE_PROPERTI,
  async ({ _id, title }) => {
    try {
      const { data } = await API.create(title)
      if (data.success) {
        return { _id, properti: data.data }
      }
    } catch (error) {
      return { _id, properti: false }
    }
  },
)

export const readDetailProperti = createAsyncThunk(
  READ_DETAIL_PROPERTI,
  async ({ _id, title }) => {
    try {
      const { data } = await API.read_detail(id)
      if (data.success) {
        return { _id, properti: data.data }
      }
    } catch (error) {
      return { _id, properti: false }
    }
  },
)

export const removeProperti = createAsyncThunk(REMOVE_PROPERTI, async (_id) => {
  try {
    const { data } = await API.remove(_id)
    if (data.success) {
      return data.data
    }
  } catch (error) {
    console.log(error, "gagal")
  }
})

export const updateProperti = createAsyncThunk(
  UPDATE_PROPERTI,
  async ({ _id, title, complete }) => {
    try {
      const { data } = await API.update(_id, title, complete)
      if (data.success) {
        return data.data
      }
    } catch (error) {
      console.log(error, "gagal")
    }
  },
)

export const propertiSlice = createSlice({
  name: "properti",
  initialState,
  reducers: {
    create: (state, action) => {
      state.propertis = [
        ...state.propertis,
        { _id: action.payload._id, title: action.payload.title, sent: true },
      ]
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(readProperti.pending, (state) => {
        state.status = "loading"
      })
      .addCase(readProperti.fulfilled, (state, action) => {
        state.status = "idle"
        console.log("action", action)
        //state.propertis = action.payload
        if (typeof action.meta.arg === "string") {
          state.propertis = action.payload
        } else {
          state.propertis = action.payload.rows
        }
      })
      .addCase(createPropertiAsync.fulfilled, (state, action) => {
        state.status = "idle"
        if (action.payload.properti) {
          state.propertis = state.propertis.map((item) => {
            if (item._id === action.payload._id) {
              return { ...action.payload.properti, sent: true }
            }
            return item
          })
        } else {
          state.propertis = state.propertis.map((item) => {
            if (item._id === action.payload._id) {
              item.sent = false
            }
            return item
          })
        }
      })
      .addCase(readDetailProperti.pending, (state) => {
        state.status = "loading"
      })
      .addCase(readDetailProperti.fulfilled, (state, action) => {
        state.status = "idle"
        state.propertis = action.payload
      })
      .addCase(removeProperti.fulfilled, (state, action) => {
        state.status = "idle"
        state.propertis = state.propertis.filter(
          (item) => item._id !== action.payload._id,
        )
      })
      .addCase(updateProperti.fulfilled, (state, action) => {
        state.status = "idle"
        state.propertis = state.propertis.map((item) => {
          if (item._id === action.payload._id) {
            return { ...action.payload, sent: true }
          }
          return item
        })
      })
  },
})

const { create } = propertiSlice.actions

export const selectPropertis = (state) => state.properti.propertis

export const createProperti = (title) => (dispatch, getState) => {
  const _id = Date.now()
  dispatch(create({ _id, title }))
  console.log("dikerjain", _id)
  dispatch(createPropertiAsync({ _id, title }))
}

export default propertiSlice.reducer
