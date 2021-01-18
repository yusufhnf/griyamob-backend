var res = require("../models/res");
var connection = require("../config/db");
var notif = require("../config/firebase-admin");
const bcrypt = require("bcrypt");
const { query } = require("../config/db");
const saltRounds = 10;
var moment = require("moment");

let datetime = moment().format("YYYY-MM-DD hh:mm:ss");
let period = moment().format("YYYYMM");
let dateHistory = moment().format("YYYYMMDD");

exports.index = function (request, response) {
  console.log(period);
  res.ok(0, "Successful REST API Connect", response);
};

// Controller for User
exports.loginUser = function (request, response) {
  var email = request.body.email;
  var pass = request.body.password;
  if (email && pass) {
    connection.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async function (error, result) {
        if (error) {
          res.ok(0001, "Koneksi Bermasalah", response);
        } else {
          if (result.length > 0) {
            const comparison = await bcrypt.compare(pass, result[0].password);
            if (comparison) {
              res.ok(0000, result, response);
            } else {
              res.ok(1000, [], response);
            }
          } else {
            res.ok(1200, [], response);
          }
          response.end();
        }
      }
    );
  } else {
    res.ok(0002, [], response);
    response.end();
  }
};

exports.registerUser = async function (request, response) {
  const password = request.body.password;
  const encryptedPassword = await bcrypt.hash(password, saltRounds);
  var post = {
    email: request.body.email,
    fullname: request.body.fullname,
    phone: request.body.phone,
    password: encryptedPassword,
  };
  if (post.email && post.fullname && post.phone && post.password) {
    connection.query(
      "SELECT email FROM users WHERE email = ? OR phone = ?",
      [post.email, post.phone],
      function (error, result) {
        if (error) {
          res.ok(0001, "Koneksi Bermasalah", response);
        } else {
          if (result.length > 0) {
            res.ok(0005, "Pengguna sudah ada", response);
          } else {
            connection.query(
              "INSERT INTO users (fullname, phone, email, password, saldo, status) VALUES (?, ?, ?, ?, 0, 1)",
              [post.fullname, post.phone, post.email, post.password],
              function (error, result) {
                if (error) {
                  console.log(error);
                } else {
                  return res.ok(0000, "Registrasi Berhasil", response);
                }
              }
            );
          }
        }
      }
    );
  } else {
    res.ok(0002, "Parameter tidak lengkap", response);
    response.end();
  }
};

exports.summaryUser = function (request, response) {
  var id = request.body.idusers;

  connection.query(
    "SELECT fullname, phone, email, saldo, avatar, joined FROM users WHERE idusers = ?",
    [id],
    function (error, result) {
      if (error) {
        res.ok(0001, "Koneksi Bermasalah", response);
      } else {
        res.ok(0000, result, response);
      }
    }
  );
};

exports.getAllNotification = function (request, response) {
  connection.query("SELECT * FROM annoucement", function (error, result) {
    if (error) {
      res.ok(0001, "Koneksi Bermasalah", response);
    } else {
      if (result.length > 0) {
        res.ok(0000, result, response);
      } else {
        res.ok(202, [], response);
      }
    }
  });
};

exports.requestTopUp = function (request, response) {
  var post = {
    iduser: request.body.iduser,
    jumlah: request.body.jumlah,
  };
  connection.query(
    "SELECT * FROM topup WHERE status = 0 AND users_idusers = ?",
    [post.iduser],
    function (error, result) {
      if (error) {
        res.ok(0001, "Koneksi Bermasalah", response);
        response.end();
      } else if (result.length > 0) {
        res.ok(0010, "Top-up Sebelumnya belum dikonfirmasi", response);
        response.end();
      } else {
        connection.query(
          "INSERT INTO topup (jumlah, users_idusers, status) VALUES (?,?,0)",
          [post.jumlah, post.iduser],
          function (error, result) {
            if (error) {
              console.log(error);
              res.ok(0001, "Koneksi Bermasalah", response);
              response.end();
            } else {
              if (post.jumlah < 10000) {
                res.ok(0007, "Transaksi harus diatas Rp. 10.000", response);
                response.end();
              } else {
                res.ok(0000, "Permintaan Berhasil", response);
                response.end();
              }
            }
          }
        );
      }
    }
  );
};

exports.getAllTopUp = function (request, response) {
  var iduser = request.body.iduser;

  connection.query(
    "SELECT * FROM topup WHERE users_idusers = ? ORDER BY idtopup DESC",
    [iduser],
    function (error, result) {
      if (error) {
        console.log(error);
        res.ok(0001, "Koneksi Bermasalah", response);
      } else {
        if (result.length > 0) {
          res.ok(0000, result, response);
        } else {
          res.ok(202, [], response);
        }
      }
    }
  );
};

exports.getUserHistory = function (request, response) {
  var iduser = request.body.iduser;

  connection.query(
    "SELECT * FROM riwayattransaksi WHERE users_idusers = ? ORDER BY idriwayattranksaksi DESC",
    [iduser],
    function (error, result) {
      if (error) {
        res.ok(0001, "Koneksi Bermasalah", response);
      } else {
        if (result.length > 0) {
          res.ok(0000, result, response);
        } else {
          res.ok(202, [], response);
        }
      }
    }
  );
};

exports.logOutUser = function (req, res) {
  var post = {
    username: req.body.username,
    loginstate: "false",
  };
  connection.query(
    "UPDATE user SET login_state = ? WHERE username = ?",
    [post.loginstate, post.username],
    function (error, result) {
      if (error) {
        console.log(error);
      } else {
        response.ok("Logout Success", res);
      }
    }
  );
};

exports.getAllPromo = function (request, response) {
  connection.query(
    "SELECT * FROM promo ORDER BY idpromo DESC",
    function (error, result) {
      if (error) {
        res.ok(0001, "Koneksi Bermasalah", response);
      } else {
        if (result.length > 0) {
          res.ok(0000, result, response);
        } else {
          res.ok(202, [], response);
        }
      }
    }
  );
};

exports.getPDAMLocation = function (request, response) {
  connection.query("SELECT * FROM pdam", function (error, result) {
    if (error) {
      res.ok(0001, "Koneksi Bermasalah", response);
    } else {
      if (result.length > 0) {
        res.ok(0000, result, response);
      } else {
        res.ok(202, [], response);
      }
    }
  });
};

exports.paymentTransaction = function (request, response) {
  var post = {
    iduser: request.body.iduser,
    jumlah: request.body.jumlah,
  };
  connection.query(
    "SELECT saldo FROM users WHERE idusers = ?",
    [post.iduser],
    function (error, result) {
      if (error) {
        res.ok(0001, "Koneksi Bermasalah", response);
        response.end();
      } else if (result.length < 0) {
        res.ok(202, [], response);
        response.end();
      } else if (result[0].saldo < post.jumlah) {
        res.ok(211, "Saldo tidak mencukupi", response);
        response.end();
      } else {
        connection.query(
          "UPDATE users SET saldo = saldo - ? WHERE idusers = ?",
          [post.jumlah, post.iduser],
          function (error, result) {
            if (error) {
              console.log(error);
              res.ok(0001, "Koneksi Bermasalah", response);
              response.end();
            } else {
              res.ok(0000, "Pembayaran Berhasil", response);
              response.end();
            }
          }
        );
      }
    }
  );
};

exports.saveHistory = function (request, response) {
  var post = {
    iduser: request.body.iduser,
    jumlah: request.body.jumlah,
    action: request.body.action,
    noref: request.body.noref,
    detail: request.body.detail,
    sumbertarget: request.body.sumbertarget,
  };
  if (
    post.iduser &&
    post.jumlah &&
    post.action &&
    post.noref &&
    post.detail &&
    post.sumbertarget
  ) {
    connection.query(
      "INSERT INTO riwayattransaksi(action, jumlah, noref, detail, users_idusers, sumbertarget) VALUES (?,?,?,?,?,?)",
      [
        post.action,
        post.jumlah,
        post.noref,
        post.detail,
        post.iduser,
        post.sumbertarget,
      ],
      function (error, result) {
        if (error) {
          console.log(error);
          res.ok(0001, "Koneksi Bermasalah", response);
          response.end();
        } else {
          res.ok(0000, "Permintaan Berhasil", response);
          response.end();
        }
      }
    );
  } else {
    res.ok(0002, "Parameter tidak lengkap", response);
    response.end();
  }
};

exports.statistikUser = function (request, response) {
  var iduser = request.body.idusers;

  connection.query(
    "SELECT datetime, action, SUM(jumlah) as totalnominal, COUNT(action) as totalaksi FROM riwayattransaksi WHERE users_idusers = ? GROUP BY action, MONTH(datetime), YEAR(datetime) ORDER BY YEAR(datetime), MONTH(datetime) DESC, action DESC",
    [iduser],
    function (error, result) {
      if (error) {
        console.log(error);
        res.ok(0001, "Koneksi Bermasalah", response);
      } else {
        if (result.length > 0) {
          res.ok(0000, result, response);
        } else {
          res.ok(202, [], response);
        }
      }
    }
  );
};

//Untuk Scan Barcode
exports.getUserInformation = function (request, response) {
  var id = request.params.id;

  connection.query(
    "SELECT idusers, fullname, phone, email, saldo, avatar FROM users WHERE phone = ?",
    id,
    function (error, result) {
      if (error) {
        res.ok(0001, "Koneksi Bermasalah", response);
      } else {
        if (result.length > 0) {
          res.ok(0000, result, response);
        } else {
          res.ok(1000, [], response);
        }
      }
    }
  );
};

exports.transferMoney = function (request, response) {
  var post = {
    iduser: request.body.iduser,
    namaUser: request.body.namauser,
    namaTarget: request.body.namatarget,
    idtarget: request.body.idtarget,
    jumlah: request.body.jumlah,
  };
  connection.query(
    "SELECT saldo FROM users WHERE idusers = ?",
    [post.iduser],
    function (error, result) {
      if (error) {
        res.ok(0001, "Koneksi Bermasalah", response);
        response.end();
      } else if (result.length < 0) {
        res.ok(202, [], response);
        response.end();
      } else if (result[0].saldo < post.jumlah) {
        res.ok(211, "Saldo tidak mencukupi", response);
        response.end();
      } else {
        connection.query(
          "UPDATE users SET saldo = saldo + ? WHERE idusers = ?",
          [post.jumlah, post.idtarget],
          function (error, result) {
            if (error) {
              console.log(error);
              res.ok(0001, "Saldo: Koneksi Bermasalah", response);
              response.end();
            } else {
              connection.query(
                "UPDATE users SET saldo = saldo - ? WHERE idusers = ?",
                [post.jumlah, post.iduser],
                function (error, result) {
                  if (error) {
                    console.log(error);
                    res.ok(0001, "Pengurangan: Bermasalah", response);
                    response.end();
                  } else {
                    connection.query(
                      "SELECT AUTO_INCREMENT as idterakhir FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'griyatest' AND TABLE_NAME = 'riwayattransaksi'",
                      function (error, result) {
                        if (error) {
                          console.log("Get Last ID: " + error);
                          res.ok(0001, "Get Last ID: Bermasalah", response);
                          response.end();
                        } else {
                          var lastID = result[0].idterakhir;
                          //Riwayat untuk Target Transfer (Debet)
                          connection.query(
                            "INSERT INTO riwayattransaksi(action, jumlah, noref, detail, users_idusers, sumbertarget) VALUES (?,?,?,?,?,?)",
                            [
                              "D",
                              post.jumlah,
                              dateHistory + post.idtarget + "04" + lastID,
                              "Transfer dari " + post.namaUser,
                              post.idtarget,
                              post.namaUser,
                            ],
                            function (error, result) {
                              if (error) {
                                console.log(error);
                                res.ok(
                                  0001,
                                  "Riwayat: Koneksi Bermasalah",
                                  response
                                );
                                response.end();
                              } else {
                                //Riwayat untuk User yang Transfer (Kredit)
                                connection.query(
                                  "INSERT INTO riwayattransaksi(action, jumlah, noref, detail, users_idusers, sumbertarget) VALUES (?,?,?,?,?,?)",
                                  [
                                    "K",
                                    post.jumlah,
                                    dateHistory + post.iduser + "04" + lastID,
                                    "Transfer ke " + post.namaTarget,
                                    post.iduser,
                                    post.namaTarget,
                                  ],
                                  function (error, result) {
                                    if (error) {
                                      console.log(error);
                                      res.ok(
                                        0001,
                                        "Riwayat: Koneksi Bermasalah",
                                        response
                                      );
                                      response.end();
                                    } else {
                                      res.ok(
                                        0000,
                                        "Permintaan Berhasil",
                                        response
                                      );
                                      response.end();
                                    }
                                  }
                                );
                              }
                            }
                          );
                        }
                      }
                    );
                  }
                }
              );
            }
          }
        );
      }
    }
  );
};

//Controller for Admin
exports.loginAdmin = function (request, response) {
  var email = request.body.email;
  var pass = request.body.password;
  if (email && pass) {
    connection.query(
      "SELECT * FROM adminusers WHERE email = ?",
      [email],
      async function (error, result) {
        if (error) {
          console.log(error);
          res.ok(0001, "Koneksi Bermasalah", response);
        } else {
          if (result.length > 0) {
            const comparison = await bcrypt.compare(pass, result[0].password);
            if (comparison) {
              res.ok(0000, result[0].idadmin, response);
            } else {
              res.ok(1000, "Email/Password Salah", response);
            }
          } else {
            res.ok(1000, "Pengguna belum terdaftar", response);
          }
          response.end();
        }
      }
    );
  } else {
    res.ok(0002, "Parameter tidak lengkap", response);
    response.end();
  }
};

exports.registerAdmin = async function (request, response) {
  const password = request.body.password;
  const encryptedPassword = await bcrypt.hash(password, saltRounds);
  var post = {
    email: request.body.email,
    fullname: request.body.fullname,
    password: encryptedPassword,
    position: request.body.position,
  };
  if (post.email && post.fullname && post.position && post.password) {
    connection.query(
      "SELECT email FROM adminusers WHERE email = ?",
      [post.email],
      function (error, result) {
        if (error) {
          res.ok(0001, "Koneksi Bermasalah", response);
        } else {
          if (result.length > 0) {
            res.ok(0005, "Pengguna sudah ada", response);
          } else {
            connection.query(
              "INSERT INTO adminusers (email, password, fullname, position) VALUES (?, ?, ?, ?)",
              [post.email, post.password, post.fullname, post.position],
              function (error, result) {
                if (error) {
                  console.log(error);
                } else {
                  return res.ok(0000, "Berhasil Membuat User", response);
                }
              }
            );
          }
        }
      }
    );
  } else {
    res.ok(0002, "Parameter tidak lengkap", response);
    response.end();
  }
};

exports.summaryAdmin = function (request, response) {
  var adminid = request.body.adminid;

  connection.query(
    "SELECT email, fullname, position FROM adminusers WHERE idadmin = ?",
    [adminid],
    function (error, result) {
      if (error) {
        console.log(error);
        res.ok(0001, "Koneksi Bermasalah", response);
      } else {
        res.ok(0000, result, response);
      }
    }
  );
};

exports.getAllHistory = function (request, response) {
  connection.query(
    "SELECT * FROM riwayattransaksi ORDER BY idriwayattranksaksi DESC",
    function (error, result) {
      if (error) {
        res.ok(0001, "Koneksi Bermasalah", response);
      } else {
        if (result.length > 0) {
          res.ok(0000, result, response);
        } else {
          res.ok(202, [], response);
        }
      }
    }
  );
};

exports.getAllSummaryHistory = function (request, response) {
  connection.query(
    "SELECT * FROM riwayattransaksi ORDER BY datetime ASC",
    function (error, result) {
      if (error) {
        res.ok(0001, "Koneksi Bermasalah", response);
      } else {
        if (result.length > 0) {
          res.ok(0000, result, response);
        } else {
          res.ok(202, [], response);
        }
      }
    }
  );
};

exports.getAllUnconfirmedTopUp = function (request, response) {
  connection.query(
    "SELECT * FROM topup WHERE status = 0",
    function (error, result) {
      if (error) {
        res.ok(0001, "Koneksi Bermasalah", response);
      } else {
        if (result.length > 0) {
          res.ok(0000, result, response);
        } else {
          res.ok(202, [], response);
        }
      }
    }
  );
};

exports.getAllConfirmedTopUp = function (request, response) {
  connection.query(
    "SELECT * FROM topup WHERE status != 0",
    function (error, result) {
      if (error) {
        res.ok(0001, "Koneksi Bermasalah", response);
      } else {
        if (result.length > 0) {
          res.ok(0000, result, response);
        } else {
          res.ok(202, [], response);
        }
      }
    }
  );
};

exports.acceptTopup = function (request, response) {
  var post = {
    adminid: request.body.adminid,
    topupid: request.body.topupid,
    userid: request.body.userid,
    nominal: request.body.nominal,
  };
  connection.query(
    "UPDATE topup SET status = 1, admin_idadmin = ? WHERE idtopup = ?",
    [post.adminid, post.topupid],
    function (error, result) {
      if (error) {
        res.ok(0001, "Topup: Koneksi Bermasalah", response);
      } else {
        connection.query(
          "UPDATE users SET saldo = saldo + ? WHERE idusers = ?",
          [post.nominal, post.userid],
          function (error, result) {
            if (error) {
              console.log(error);
              res.ok(0001, "Saldo: Koneksi Bermasalah", response);
            } else {
              // res.ok(0000, "Sukses Konfirmasi", response);
              connection.query(
                "INSERT INTO riwayattransaksi(action, jumlah, noref, detail, users_idusers, sumbertarget) VALUES (?,?,?,?,?,?)",
                [
                  "D",
                  post.nominal,
                  dateHistory + post.userid + "03" + post.topupid,
                  "Top-up Saldo",
                  post.userid,
                  "Admin",
                ],
                function (error, result) {
                  if (error) {
                    console.log(error);
                    res.ok(0001, "Riwayat: Koneksi Bermasalah", response);
                    response.end();
                  } else {
                    res.ok(0000, "Permintaan Berhasil", response);
                    response.end();
                  }
                }
              );
            }
          }
        );
      }
    }
  );
};

exports.cancelTopup = function (request, response) {
  var post = {
    adminid: request.body.adminid,
    topupid: request.body.topupid,
  };
  connection.query(
    "UPDATE topup SET status = -1, admin_idadmin = ? WHERE idtopup = ?",
    [post.adminid, post.topupid],
    function (error, result) {
      if (error) {
        res.ok(0001, "Koneksi Bermasalah", response);
      } else {
        res.ok(0000, "Sukses Konfirmasi", response);
      }
    }
  );
};

exports.postNotification = function (request, response) {
  var post = {
    title: request.body.title,
    detail: request.body.detail,
    adminid: request.body.adminid,
  };

  connection.query(
    "INSERT INTO annoucement(title, detail, admin_idadmin) VALUES (?,?,?)",
    [post.title, post.detail, post.adminid],
    function (error, result) {
      if (error) {
        console.log("===ERROR POST NOTIFICATION: " + error);
        res.ok(0001, "Koneksi Bermasalah", response);
        response.end();
      } else {
        new notif.firebaseSetting(post.title, post.detail, "Event");
        res.ok(0000, "Sukses Membuat Pengumuman", response);
      }
    }
  );
};

exports.postPromo = function (request, response) {
  var post = {
    judul: request.body.judul,
    detail: request.body.detail,
  };
  connection.query(
    "INSERT INTO promo(judul, detail) VALUES (?,?)",
    [post.judul, post.detail],
    function (error, result) {
      if (error) {
        console.log("===ERROR POST NOTIFICATION: " + error);
        res.ok(0001, "Koneksi Bermasalah", response);
        response.end();
      } else {
        return res.ok(0000, "Sukses Membuat Promo", response);
      }
    }
  );
};

exports.statistikHarian = function (request, response) {
  connection.query(
    "SELECT datetime, action, SUM(jumlah) as totalnominal, COUNT(action) as totalaksi FROM riwayattransaksi GROUP BY action, DAY(datetime), MONTH(datetime), YEAR(datetime) ORDER BY datetime, action DESC",
    function (error, result) {
      if (error) {
        res.ok(0001, "Koneksi Bermasalah", response);
      } else {
        if (result.length > 0) {
          res.ok(0000, result, response);
        } else {
          res.ok(202, [], response);
        }
      }
    }
  );
};
