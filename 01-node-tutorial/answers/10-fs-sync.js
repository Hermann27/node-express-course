const { readFileSync, writeFileSync } = require("fs");
const line1 = "This is line 1";
const line2 = "This is line 2";
const line3 = "This is line 3";

const path = "./temporary/fileA.txt";
// Write to the file
writeFileSync(path, `${line1}\n`, {
  flag: "a",
});
writeFileSync(path, `${line2}\n`, {
  flag: "a",
});
writeFileSync(path, `${line3}`, {
  flag: "a",
});

// Read the file synchronously
const result = readFileSync(path, "utf8");
console.log(result);
