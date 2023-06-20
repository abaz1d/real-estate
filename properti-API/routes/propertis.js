var express = require("express");
var router = express.Router();
const { isLoggedIn, Response } = require("../helpers/util");

/* GET home page. */

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
      query = `SELECT id_properti, kategori, kota, provinsi, jenis_properti, total_harga, judul, kamar_tidur, kamar_mandi, luas_properti, di_buat, foto_produk[0] FROM properti`;
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
      query += ` ORDER BY id_properti ASC LIMIT ${total_row_displayed} OFFSET ${row_number};`;
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
  router.get("/home", isLoggedIn, async function (req, res, next) {
    try {
      let sql =
        "SELECT id_properti, kategori, kota, provinsi, jenis_properti, total_harga, judul, kamar_tidur, kamar_mandi, luas_properti, di_buat, foto_produk[0] FROM properti ORDER BY di_buat DESC LIMIT 15 OFFSET 0";

      const { rows } = await db.query(sql);
      res.json(new Response(rows, true));
    } catch (e) {
      console.error(e);
      res.status(500).json(new Response(e, false));
    }
  });

  return router;
};
