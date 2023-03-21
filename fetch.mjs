import fetch from "node-fetch";

const url = "http://www.example.org/";

fetch(url)
  .then((response) => {
    // Log the status code and content type for debugging
    console.log("Status Code:", response.status);
    console.log("Content Type:", response.headers.get("content-type"));

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.text(); // Use text() instead of json() to inspect the response body
  })
  .then((text) => {
    // Log the response text for debugging
    console.log("Response Text:", text);
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

