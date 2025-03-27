const { readFileSync, writeFileSync } = require("fs");
const LINE1 = "This is line 1";
const LINE2 = "This is line 2";
const LINE3 = "This is line 3";

const PATH = "./temporary/fileA.txt";
// Write to the file
writeFileSync(PATH, `${LINE1}\n`, {
  flag: "a",
});
writeFileSync(PATH, `${LINE2}\n`, {
  flag: "a",
});
writeFileSync(PATH, `${LINE3}`, {
  flag: "a",
});

// Read the file synchronously
const RESULT = readFileSync(PATH, "utf8");
console.log(RESULT);
