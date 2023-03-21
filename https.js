// import https from "https";
var https = require("https");

const options = {
  hostname: "example.org",
  method: "GET",
};

const req = https.request(options, (res) => {
  let data = "";

  res.on("data", (chunk) => {
    data += chunk;
  });

  res.on("end", () => {
    console.log(data);
    // If you want to parse the data as json uncomment the following
    // console.log(JSON.parse(data));
  });
});

req.on("error", (error) => {
  console.error(error);
});

req.end();
