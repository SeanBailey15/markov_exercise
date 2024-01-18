const markov = require("./markov");

describe("check that markov object gets built correctly", () => {
  let m;

  beforeAll(() => {
    m = new markov.MarkovMachine("the cat in the hat is in the hat");
  });

  test("is variable 'm' an instance of MarkovMachine?", () => {
    expect(m).toBeInstanceOf(markov.MarkovMachine);
  });

  test("<instance>.words contains expected data", () => {
    const words = m.words;
    expect(words).toEqual([
      "the",
      "cat",
      "in",
      "the",
      "hat",
      "is",
      "in",
      "the",
      "hat",
    ]);
  });

  test("<instance>.chains contains expected data", () => {
    const chains = m.chains;
    expect(chains).toEqual({
      the: ["cat", "hat", "hat"],
      cat: ["in"],
      in: ["the", "the"],
      hat: ["is", null],
      is: ["in"],
    });
  });

  test("<instance>.makeText() creates an output containing at least one of the <instance>.words", () => {
    const result = m
      .makeText(10)
      .split(" ")
      .map((r) => r.trim());

    const check = jest.fn((array) => {
      const res = new Set();
      array.forEach((el) => {
        res.add(m.words.includes(el));
      });
      if (res.has(false)) {
        return false;
      } else return true;
    });

    check(result);

    expect(check).toReturnWith(true);
  });
});
