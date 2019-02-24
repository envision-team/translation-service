const fs = require("fs");
const fetch = require("node-fetch");

const labels = fs.readFileSync("labels.txt", "utf8").split("\n");
const translateLang = "ru";
const result = {};

var i = 0;
var interval = setInterval(function() {
  if (i >= labels.length - 1) {
    clearInterval(interval);
    fs.writeFileSync("res.json", JSON.stringify(result));
    return;
  }

  let url =
    "https://translate.googleapis.com/translate_a/single?client=gtx&" +
    `sl=en&tl=${translateLang}&dt=t&q=${labels[i]}`;

  fetch(url)
    .then(res => res.json())
    .then(json => {
      const translate = json[0][0][0];
      result[labels[i]] = {
        ru: translate
      };

      console.log(labels[i], translate);
      i++;
    });
}, 4000);
