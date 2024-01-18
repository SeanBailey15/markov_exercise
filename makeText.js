/** Command-line tool to generate Markov text. */

const markov = require("./markov");
const fs = require("fs");
const axios = require("axios");

let method = process.argv[2];
let source = process.argv[3];

async function getUrlData(source) {
  let content;
  try {
    content = await axios.get(source);
  } catch (err) {
    console.log("ERROR FETCHING DATA\n", err);
    process.exit(1);
  }
  let m = new markov.MarkovMachine(content.data);
  console.log(m.makeText());
}

function getFileData(source) {
  fs.readFile(source, "utf8", (err, data) => {
    if (err) {
      console.log("ERROR READING FILE\n", err);
      process.exit(1);
    }
    let m = new markov.MarkovMachine(data);
    console.log(m.makeText());
  });
}

if (method === "file") {
  getFileData(source);
} else if (method === "url") {
  getUrlData(source);
} else {
  console.error("ERROR: CHECK PROVIDED ARGUMENTS FOR ACCURACY");
}
