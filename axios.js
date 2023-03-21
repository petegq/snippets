// import axios from "axios";
var axios = require("axios");

axios
  .get("http://example.org/")
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  });
