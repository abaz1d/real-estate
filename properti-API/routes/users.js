const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { isTokenValid, Response } = require("../helpers/util");

/* GET home page. */
module.exports = function (db) {
  router.get("/", async function (req, res, next) {
    try {
      let reqSQL;
      let argumentSQL;

      reqSQL =
        "SELECT id_user,nama_lengkap, username, email_user, role, wa_telephone FROM users ORDER BY id_user ASC";
      argumentSQL = "";

      const { rows } = await db.query(reqSQL, argumentSQL);
      res.json(new Response(rows));
    } catch (e) {
      console.error(e);
      res.json(new Response(e, false));
    }
  });
  router.get("/details/:id", async function (req, res, next) {
    try {
      const { page_number, total_row_displayed } = req.query;
      let row_number;
      if (page_number < 2) {
        row_number = 0;
      } else {
        row_number = (page_number - 1) * total_row_displayed;
      }
      let query = `SELECT COUNT(u.id_user) AS total FROM users u LEFT JOIN properti p  ON u.id_user = p.id_user WHERE u.id_user = '${req.params.id}'`;

      const totalPage = await db.query(query);
      let data = totalPage.rows;
      let total_pages;
      if (data[0].total % total_row_displayed == 0) {
        total_pages = parseInt(data[0].total / total_row_displayed);
      } else {
        total_pages = parseInt(data[0].total / total_row_displayed) + 1;
      }

      query = `SELECT u.nama_lengkap, u.id_user, u.email_user, u.username, u.role, u.wa_telephone, u.foto_user, u.tgl_buat, u.alamat, u.total_whislist, u.total_cart ,p.id_properti, p.jenis_properti, p.judul, p.kota, p.provinsi, p.total_harga, p.kategori, p.status, p.di_buat, p.foto_produk[0] FROM users u LEFT JOIN properti p  ON u.id_user = p.id_user WHERE u.id_user = '${req.params.id}' ORDER BY p.id_properti ASC LIMIT ${total_row_displayed} OFFSET ${row_number};`;
      const { rows } = await db.query(query);
      //console.log(rows, req.params);
      res.json(new Response({ rows, total_pages }));
    } catch (e) {
      console.error(e);
      res.status(500).json(new Response(e, false));
    }
  });
  router.post("/add", async function (req, res, next) {
    //id_region- token
    try {
      const {
        nama_lengkap,
        username,
        email_user,
        no_wa,
        no_telephone,
        password,
        role,
      } = req.body;
      let reqSQL;
      let argumentSQL;
      db.query(
        "SELECT email_user FROM users WHERE email_user = $1",
        [email_user],
        (err, email) => {
          if (err)
            return res.json(
              new Response({ message: "failed compare emaile" }, false)
            );
          if (email.rows.length > 0)
            return res.json(
              new Response({ message: "e-mail has been registered" }, false)
            );

          db.query(
            "SELECT username FROM users WHERE username = $1",
            [username],
            (err, user) => {
              if (err)
                return res.json(
                  new Response({ message: "failed compare emaile" }, false)
                );
              if (user.rows.length > 0)
                return res.json(
                  new Response(
                    { message: "username has been registered" },
                    false
                  )
                );
              bcrypt.hash(password, saltRounds, async function (err, hash) {
                if (err) {
                  console.error(err);
                  return res.json(
                    new Response({ message: "failed hash", err }, false)
                  );
                }
                reqSQL =
                  "INSERT INTO users(email_user,username,password,role, nama_lengkap, wa_telephone) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id_user, email_user,username,role, nama_lengkap, wa_telephone;";
                argumentSQL = [
                  email_user,
                  username,
                  hash,
                  role,
                  nama_lengkap,
                  [no_wa, no_telephone],
                ];
                const { rows } = await db.query(reqSQL, argumentSQL);
                if (err)
                  return res.json(
                    new Response({ message: "failed insert" }, false)
                  );

                res.status(200).json(new Response(rows));
              });
            }
          );
        }
      );
    } catch (error) {
      console.error(error);
      res.json(new Response({ message: "failed add user" }, false));
    }
  });
  router.put("/edit/:id", async function (req, res, next) {
    try {
      if (Object.keys(req.body).length > 4) {
        console.log("password Baru");
        const { email_user, username, password, role } = req.body;
        const email_terpakai = await db.query(
          "SELECT * FROM users WHERE email_user = $1 AND id_user != $2",
          [email_user, req.params.id]
        );
        if (email_terpakai.rows.length > 0)
          return res.json(
            new Response({ message: "e-mail has been registered" }, false)
          );
        const username_terpakai = await db.query(
          "SELECT * FROM users WHERE username = $1 AND id_user != $2",
          [username, req.params.id]
        );
        if (username_terpakai.rows.length > 0)
          return res.json(
            new Response({ message: "username has been registered" }, false)
          );

        bcrypt.hash(password, saltRounds, async function (err, hash) {
          if (err)
            return res.json(new Response({ message: "failed hash" }, false));
          const { rows } = await db.query(
            `UPDATE users SET 
          email_user = $1,
          username = $2,
          password = $3,
          role = $4
          WHERE id_user = $5 RETURNING *;`,
            [email_user, username, hash, role, req.params.id]
          );
          res.json(
            new Response({
              data: rows[0],
            })
          );
        });
      } else {
        console.log("Password Lama");
        const { email_user, username, role } = req.body;
        const email_terpakai = await db.query(
          "SELECT * FROM users WHERE email_user = $1 AND id_user != $2",
          [email_user, req.params.id]
        );
        if (email_terpakai.rows.length > 0)
          return res.json(
            new Response({ message: "e-mail has been registered" }, false)
          );
        const username_terpakai = await db.query(
          "SELECT * FROM users WHERE username = $1 AND id_user != $2",
          [username, req.params.id]
        );
        if (username_terpakai.rows.length > 0)
          return res.json(
            new Response({ message: "username has been registered" }, false)
          );

        const { rows } = await db.query(
          `UPDATE users SET 
        email_user = $1,
        username = $2,
        role = $3
        WHERE id_user = $4 RETURNING *;`,
          [email_user, username, role, req.params.id]
        );
        res.json(
          new Response({
            data: rows[0],
          })
        );
      }
    } catch (e) {
      console.error(e);
      res.json(
        new Response({ message: "failed edit user" + e.toString() }, false)
      );
    }
  });
  router.delete("/delete/:id", async function (req, res, next) {
    try {
      const { rows } = await db.query("DELETE FROM users WHERE id_user = $1", [
        req.params.id,
      ]);
      res.json(new Response({ message: "Berhasil menghapus User" }, true));
    } catch (e) {
      res.json(
        new Response({ message: "failed add user" + e.toString() }, false)
      );
    }
  });

  return router;
};
