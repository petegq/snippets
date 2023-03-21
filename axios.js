import axios from "axios";

axios
  .get("http://example.org/")
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  });
