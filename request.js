// import request from "request";
var request = require("request");

request("http://www.example.org/", { json: true }, (err, res, body) => {
  if (err) {
    console.error(err);
  } else {
    console.log(body);
  }
});
