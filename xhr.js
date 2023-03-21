var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function reqListener() {
  console.log(this.responseText);
}

const xhr = new XMLHttpRequest();
xhr.addEventListener("load", reqListener);
xhr.open("GET", "http://www.example.org/example.txt");
xhr.send();

