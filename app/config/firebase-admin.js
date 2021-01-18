var admin = require("firebase-admin");

exports.firebaseSetting = function (titleText, bodyText, topic) {
  let timeStamp = Date.now().toString;
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: "",
      databaseURL: "",
    });
  } else {
    admin.app();
  }

  /* const options = {
    priority: "normal",
    timeToLive: 60 * 60 * 24,
  }; */

  var payload = {
    notification: {
      title: titleText,
      body: bodyText,
    },
    topic: topic,
    date: timeStamp,
    data: { click_action: "FLUTTER_NOTIFICATION_CLICK" },
  };

  admin
    .messaging()
    .send(payload)
    .then(function (response) {
      console.log("Successfully sent message:", response);
    })
    .catch(function (error) {
      console.log("Error sending message:", error);
    });
};
