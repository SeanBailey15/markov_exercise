/** Textual markov chain generator */
const fs = require("fs");

let file;

try {
  file = fs.readFileSync("eggs.txt", "utf8");
} catch (err) {
  console.error(err);
  process.exit(1);
}

class MarkovMachine {
  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter((c) => c !== "");
    this.chains = this.makeChains(this.words);
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains(words) {
    let chains = {};
    let lastWord = "";
    words.forEach((word) => {
      if (!chains.hasOwnProperty(word)) {
        chains[word] = [];
        if (lastWord === "") {
          lastWord = word;
        } else {
          chains[lastWord].push(word);
          lastWord = word;
        }
      } else if (chains.hasOwnProperty(word)) {
        chains[lastWord].push(word);
        lastWord = word;
      }
    });
    chains[lastWord].push(null);
    return chains;
  }

  /** return random text from chains */

  makeText(chains = this.chains, numWords = 100) {
    let keys = Object.keys(chains);
    let start = keys[Math.floor(Math.random() * keys.length)];
    let result = start;
    let current = start;
    for (let i = 2; i <= numWords; i++) {
      let next =
        chains[current][Math.floor(Math.random() * chains[current].length)];
      if (next == null) {
        console.log(result);
        return;
      }
      result += " " + next;
      current = next;
    }
    console.log(result);
  }
}

const m = new MarkovMachine(file);
// const m = new MarkovMachine("the cat in the hat is in the hat");
console.log(m);

m.makeText(m.chains, 200);
