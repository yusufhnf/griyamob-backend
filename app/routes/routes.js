module.exports = function (expressLib) {
  var query = require("../controllers/controller");

  expressLib.route("/griyatest").get(query.index);

  //REST API for GriyaMobile
  expressLib.route("/griyatest/users/login").post(query.loginUser);

  expressLib.route("/griyatest/users/register").post(query.registerUser);

  expressLib.route("/griyatest/users/summary").post(query.summaryUser);

  expressLib
    .route("/griyatest/users/notification")
    .get(query.getAllNotification);

  expressLib.route("/griyatest/users/topup").post(query.requestTopUp);

  expressLib.route("/griyatest/users/alltopup").post(query.getAllTopUp);

  expressLib.route("/griyatest/users/history").post(query.getUserHistory);

  expressLib.route("/griyatest/users/promo").get(query.getAllPromo);

  expressLib.route("/griyatest/users/pdamloc").get(query.getPDAMLocation);

  expressLib.route("/griyatest/users/logout").post(query.logOutUser);

  expressLib.route("/griyatest/users/pay").post(query.paymentTransaction);

  expressLib.route("/griyatest/users/savehistory").post(query.saveHistory);

  expressLib
    .route("/griyatest/users/getinfouser/:id")
    .get(query.getUserInformation);

  expressLib.route("/griyatest/users/transfer").post(query.transferMoney);

  expressLib.route("/griyatest/users/statistik").post(query.statistikUser);

  //REST API for GriyaAdmin
  expressLib.route("/griyatest/admin/login").post(query.loginAdmin);

  expressLib.route("/griyatest/admin/register").post(query.registerAdmin);

  expressLib.route("/griyatest/admin/history").get(query.getAllHistory);

  expressLib
    .route("/griyatest/admin/summaryhistory")
    .get(query.getAllSummaryHistory);

  expressLib
    .route("/griyatest/admin/allunconfirm")
    .get(query.getAllUnconfirmedTopUp);

  expressLib
    .route("/griyatest/admin/allconfirm")
    .get(query.getAllConfirmedTopUp);

  expressLib.route("/griyatest/admin/accepttopup").post(query.acceptTopup);

  expressLib.route("/griyatest/admin/canceltopup").post(query.cancelTopup);

  expressLib
    .route("/griyatest/admin/postannouncement")
    .post(query.postNotification);

  expressLib.route("/griyatest/admin/postpromo").post(query.postPromo);

  expressLib.route("/griyatest/admin/summary").post(query.summaryAdmin);

  expressLib.route("/griyatest/admin/statistik").get(query.statistikHarian);
};
