var express = require("express");
var router = express.Router();
const fs = require("fs");
var path = require("path");
const multer = require("multer");
const { isLoggedIn, Response } = require("../helpers/util");

/* GET home page. */

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, path.join(__dirname, "..", "public", "gambar_properti"));
    } else {
      //cb(null, path.join(__dirname, "..", "public", "file_sk"));
    }
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + Date.now() + path.extname(file.originalname)); //Appending extension
  },
});
const upload = multer({ storage: storage }).any();
const multi_upload = multer({
  storage,
  // limits: { fileSize: 1 * 1024 * 1024 }, // 1MB
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "application/pdf"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      const err = new Error("Only .png, .jpg, and .jpeg format allowed!");
      err.name = "ExtensionError";
      return cb(err);
    }
  },
}).any();
module.exports = function (db) {
  router.get("/", isLoggedIn, async function (req, res, next) {
    const {
      search_data,
      kategori,
      jenis_properti,
      page_number,
      kota,
      provinsi,
      total_row_displayed,
    } = req.query;
    let row_number;
    if (page_number < 2) {
      row_number = 0;
    } else {
      row_number = (page_number - 1) * total_row_displayed;
    }

    try {
      let query = `SELECT COUNT(id_properti) AS total FROM properti`;
      if (search_data !== "") {
        query += ` WHERE kota ILIKE '%${search_data}%' OR provinsi ILIKE '%${search_data}%' OR total_harga ILIKE '%${search_data}%' OR judul ILIKE '%${search_data}%' OR luas_properti ILIKE '%${search_data}%' OR di_buat::text ILIKE '%${search_data}%' `;
      }
      if (kategori !== "") {
        if (search_data !== "") {
          query += ` AND kategori ILIKE '%${kategori}%'`;
        } else {
          query += ` WHERE kategori ILIKE '%${kategori}%'`;
        }
      }
      if (jenis_properti !== "") {
        if (search_data !== "" || kategori !== "") {
          query += ` AND jenis_properti ILIKE '%${jenis_properti}%'`;
        } else {
          query += ` WHERE jenis_properti ILIKE '%${jenis_properti}%'`;
        }
      }
      const totalPage = await db.query(query);
      let data = totalPage.rows;
      let total_pages;
      if (data[0].total % total_row_displayed == 0) {
        total_pages = parseInt(data[0].total / total_row_displayed);
      } else {
        total_pages = parseInt(data[0].total / total_row_displayed) + 1;
      }
      query = `SELECT id_properti, kategori, kota, provinsi, jenis_properti, total_harga, judul, kamar_tidur, kamar_mandi, luas_properti, di_buat,di_edit, foto_produk FROM properti`;
      if (search_data !== "") {
        query += ` WHERE kota ILIKE '%${search_data}%' OR provinsi ILIKE '%${search_data}%' OR total_harga ILIKE '%${search_data}%' OR judul ILIKE '%${search_data}%' OR luas_properti ILIKE '%${search_data}%' OR di_buat::text ILIKE '%${search_data}%' `;
      }
      if (kategori !== "") {
        if (search_data !== "") {
          query += ` AND kategori ILIKE '%${kategori}%'`;
        } else {
          query += ` WHERE kategori ILIKE '%${kategori}%'`;
        }
      }
      if (jenis_properti !== "") {
        if (search_data !== "" || kategori !== "") {
          query += ` AND jenis_properti ILIKE '%${jenis_properti}%'`;
        } else {
          query += ` WHERE jenis_properti ILIKE '%${jenis_properti}%'`;
        }
      }
      // query += ` ORDER BY ${sort_by} ${sort_mode} LIMIT ${total_row_displayed} OFFSET ${row_number};`;
      query += ` ORDER BY di_buat DESC LIMIT ${total_row_displayed} OFFSET ${row_number};`;
      const { rows } = await db.query(query);
      res.json(new Response({ rows, total_pages }));
    } catch (e) {
      console.error(e);
      res.status(500).json(new Response(e, false));
    }
  });
  router.get("/details/:id", isLoggedIn, async function (req, res, next) {
    try {
      let query = `SELECT p.*,u.nama_lengkap,u.email_user,u.wa_telephone,u.foto_user,u.tgl_buat FROM properti p LEFT JOIN users u ON p.id_user = u.id_user WHERE id_properti = '${req.params.id}'`;
      const { rows } = await db.query(query);
      //console.log(rows, req.params);
      res.json(new Response(rows));
    } catch (e) {
      console.error(e);
      res.status(500).json(new Response(e, false));
    }
  });
  router.post("/add", async function (req, res, next) {
    try {
      multi_upload(req, res, function (err) {
        const {
          judul,
          deskripsi,
          jenis_properti,
          kategori,
          status,
          total_harga,
          harga_tanah,
          harga_bangunan,
          pajak,
          alamat,
          kota,
          provinsi,
          kode_pos,
          luas_properti,
          jenis_sertifikat,
          tahun_pembangunan,
          daya_listrik,
          jumlah_lantai,
          jumlah_ruangan,
          kamar_tidur,
          kamar_mandi,
          id_user,
        } = req.body;
        if (err instanceof multer.MulterError) {
          // A Multer error occurred when uploading.
          res
            .status(500)
            .send({
              error: { message: `Multer uploading error: ${err.message}` },
            })
            .end();
          return;
        } else if (err) {
          // An unknown error occurred when uploading.
          if (err.name == "ExtensionError") {
            res
              .status(413)
              .send({ error: { message: err.message } })
              .end();
          } else {
            res
              .status(500)
              .send({
                error: { message: `unknown uploading error: ${err.message}` },
              })
              .end();
          }
          return;
        }
        const gambar = req.files.map(({ filename, ...rest }) => filename);
        db.query(
          "INSERT INTO properti ( judul,deskripsi,jenis_properti,kategori,status,total_harga,harga_tanah,harga_bangunan,pajak,alamat,kota,provinsi,kode_pos,luas_properti,jenis_sertifikat,tahun_pembangunan,daya_listrik,jumlah_lantai,jumlah_ruangan,kamar_tidur,kamar_mandi, foto_produk, id_user) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,ARRAY [$22::bytea], $23) RETURNING (id_properti, judul)",
          [
            judul,
            deskripsi,
            jenis_properti,
            kategori,
            status,
            total_harga,
            harga_tanah,
            harga_bangunan,
            pajak,
            alamat,
            kota,
            provinsi,
            kode_pos,
            luas_properti,
            jenis_sertifikat,
            tahun_pembangunan,
            daya_listrik,
            jumlah_lantai,
            jumlah_ruangan,
            kamar_tidur,
            kamar_mandi,
            gambar,
            id_user,
          ],
          (err, rows) => {
            if (err) throw new Error(err);
            let data = rows.rows;
            res.json(new Response(data));
          }
        );
      });
    } catch (e) {
      console.log("error", e);
      res.json(
        new Response({ message: "failed add properti " + e.toString() }, false)
      );
    }
  });
  router.put("/edit/:id", async function (req, res, next) {
    try {
      const {
        judul,
        deskripsi,
        jenis_properti,
        kategori,
        status,
        total_harga,
        harga_tanah,
        harga_bangunan,
        pajak,
        alamat,
        kota,
        provinsi,
        kode_pos,
        luas_properti,
        jenis_sertifikat,
        tahun_pembangunan,
        daya_listrik,
        jumlah_lantai,
        jumlah_ruangan,
        kamar_tidur,
        kamar_mandi,
        id_user,
      } = req.body;
      const { rows } = await db.query(
        `UPDATE properti SET judul = $1,deskripsi = $2,jenis_properti = $3,kategori = $4,status = $5,total_harga = $6,harga_tanah = $7,harga_bangunan = $8,pajak = $9,alamat = $10,kota = $11,provinsi = $12,kode_pos = $13,luas_properti = $14,jenis_sertifikat = $15,tahun_pembangunan = $16,daya_listrik = $17,jumlah_lantai = $18,jumlah_ruangan = $19,kamar_tidur = $20,kamar_mandi = $21, id_user = $22, di_edit = CURRENT_TIMESTAMP
      WHERE id_properti = $23 RETURNING (id_properti, judul)`,
        [
          judul,
          deskripsi,
          jenis_properti,
          kategori,
          status,
          total_harga,
          harga_tanah,
          harga_bangunan,
          pajak,
          alamat,
          kota,
          provinsi,
          kode_pos,
          luas_properti,
          jenis_sertifikat,
          tahun_pembangunan,
          daya_listrik,
          jumlah_lantai,
          jumlah_ruangan,
          kamar_tidur,
          kamar_mandi,
          id_user,
          req.params.id,
        ]
      );
      res.json(new Response(rows));
    } catch (e) {
      console.log("error", e);
      res.json(
        new Response(
          { message: "failed update properti " + e.toString() },
          false
        )
      );
    }
  });
  router.get("/home", isLoggedIn, async function (req, res, next) {
    try {
      let sql =
        "SELECT id_properti, kategori, kota, provinsi, jenis_properti, total_harga, judul, kamar_tidur, kamar_mandi, luas_properti, di_buat, di_edit, foto_produk[0] FROM properti ORDER BY di_buat DESC LIMIT 15 OFFSET 0";

      const { rows } = await db.query(sql);
      res.json(new Response(rows, true));
    } catch (e) {
      console.error(e);
      res.status(500).json(new Response(e, false));
    }
  });
  router.delete("/delete/:id", async function (req, res, next) {
    try {
      const { rows } = await db.query(
        "DELETE FROM properti WHERE id_properti = $1",
        [req.params.id]
      );
      res.json(new Response({ message: "Berhasil menghapus User" }, true));
    } catch (e) {
      res.json(
        new Response({ message: "failed add user " + e.toString() }, false)
      );
    }
  });
  return router;
};
