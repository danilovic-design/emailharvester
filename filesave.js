const fs = require("fs");
const path = require("path");
const infoDirectoryName = "emails";

const saveEmails = function (email) {
  let t = new Date();
  let timestamp = `${t.getDate()}-${t.getMonth()}-${t.getFullYear()}`;
  let timestamp2 = `${t.getDate()}-${t.getMonth()}-${t.getFullYear()}-${t.getHours()}`;
  let timestamp3 = `${t.getDate()}-${t.getMonth()}-${t.getFullYear()}-${t.getHours()}-${t.getMinutes()}`;
  let timestamp4 = `${t.getDate()}-${t.getMonth()}-${t.getFullYear()}-${t.getHours()}-${t.getMinutes()}-${t.getSeconds()}`;
  let timestamp5 = `${t.getDate()}-${t.getMonth()}-${t.getFullYear()}-${t.getHours()}-${t.getMinutes()}-${t.getSeconds()}-${t.getMilliseconds()}`;

  fs.appendFile(
    path.join(infoDirectoryName, timestamp3 + ".txt"),
    `${email}\n`,
    function (err) {
      if (err) {
        console.log(err);
        if (err.errno === 4058) {
          console.log("directory missing");
        }
      }
    }
  );
};

module.exports = saveEmails;
