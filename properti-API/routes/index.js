const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { Response } = require("../helpers/util");
const jwt = require("jsonwebtoken");

/* GET home page. */

module.exports = function (db) {
  router.get("/", function (req, res, next) {
    res.render("index", { title: "Express" });
  });

  router.post("/auth", async function (req, res) {
    try {
      const { input_user, password } = req.body;
      var data;
      db.query(
        "SELECT * FROM users WHERE email_user = $1",
        [input_user],
        (err, rows) => {
          if (err) {
            throw new Error(err);
          }
          data = rows;
          if (rows.rows.length == 0) {
            //console.log("check username");
            db.query(
              "SELECT * FROM users WHERE username = $1",
              [input_user],
              (err, rows2) => {
                if (err) {
                  throw new Error(err);
                }

                if (rows2.rows.length == 0) {
                  return res.json(
                    new Response(
                      { message: "unregistered e-mail/username" },
                      false
                    )
                  );
                }
                data = rows2;
                bcrypt.compare(
                  password,
                  data.rows[0].password,
                  async function (err, result) {
                    if (err) throw new Error(err);

                    if (!result) {
                      return res.json(
                        new Response(
                          { message: "password doesn't match" },
                          false
                        )
                      );
                    }
                    //crete token
                    var token = jwt.sign(
                      {
                        userid: data.rows[0].id_user,
                        email: data.rows[0].email_user,
                      },
                      process.env.SECRETKEY
                    );
                    const { rows } = await db.query(
                      `UPDATE public.users SET token = $1 WHERE id_user = $2 RETURNING *`,
                      [token, data.rows[0].id_user]
                    );
                    // console.log("data", rows)
                    res.json(
                      new Response({
                        foto: rows[0].foto_user,
                        nama_lengkap: rows[0].nama_lengkap,
                        kontak: rows[0].wa_telephone,
                        whislist: rows[0].total_whislist,
                        cart: rows[0].total_cart,
                        userid: rows[0].id_user,
                        email: rows[0].email_user,
                        username: rows[0].username,
                        role: rows[0].role,
                        token: rows[0].token,
                      })
                    );
                  }
                );
              }
            );
          } else {
            //console.log("check email");
            bcrypt.compare(
              password,
              data.rows[0].password,
              async function (err, result) {
                if (err) throw new Error(err);

                if (!result) {
                  return res.json(
                    new Response({ message: "password doesn't match" }, false)
                  );
                }
                //crete token
                var token = jwt.sign(
                  {
                    userid: data.rows[0].id_user,
                    email: data.rows[0].email_user,
                  },
                  process.env.SECRETKEY
                );
                const { rows } = await db.query(
                  `UPDATE public.users SET token = $1 WHERE id_user = $2 RETURNING *`,
                  [token, data.rows[0].id_user]
                );
                res.json(
                  new Response({
                    foto: rows[0].foto_user,
                    nama_lengkap: rows[0].nama_lengkap,
                    kontak: rows[0].wa_telephone,
                    whislist: rows[0].total_whislist,
                    cart: rows[0].total_cart,
                    userid: rows[0].id_user,
                    email: rows[0].email_user,
                    username: rows[0].username,
                    role: rows[0].role,
                    token: rows[0].token,
                  })
                );
              }
            );
          }
        }
      );
    } catch (error) {
      console.error(error);
      res.status(500).json(new Response(error, false));
    }
  });

  router.get("/logout", async function (req, res) {
    const token = req.headers.authorization;
    if (token && token.split(" ")[1]) {
      const pureToken = token.split(" ")[1];
      try {
        const result = jwt.verify(pureToken, process.env.SECRETKEY);
        const { rows } = await db.query(
          `SELECT * FROM public.users WHERE id_user = ${result.userid} ORDER BY id_user ASC`
        );
        //const user = rows[0];
        const user = result;
        var tokenNow = null;
        const { data } = await db.query(
          `UPDATE public.users SET token = $1 WHERE id_user = $2 RETURNING *;`,
          [tokenNow, user.id_user]
        );
        res.json(new Response({ message: "sign out success" }, true));
      } catch (e) {
        res.json(new Response({ message: "token invalid" }, false));
      }
    } else {
      res.json(new Response({ message: "token invalid" }, false));
    }
  });

  return router;
};
