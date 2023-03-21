var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function listener() {
  console.log(this.responseText);
}

const xhr = new XMLHttpRequest();
xhr.addEventListener("load", listener);
xhr.open("GET", "http://www.example.org/example.txt");
xhr.send();

