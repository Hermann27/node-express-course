const { writeFile } = require("fs");
const FILEPATH = "./temporary/fileB.txt";
const LINES = ["This is line 1\n", "This is line 2\n", "This is line 3\n"];

console.log("at start");

function writeLines(index) {
  if (index >= LINES.length) {
    console.log("Finished writing all lines");
    return;
  }

  writeFile(FILEPATH, LINES[index], { flag: "a" }, (err) => {
    console.log(`at point ${index + 1}`);
    if (err) {
      console.log("This error happened:", err);
    } else {
      writeLines(index + 1); // recursive call
    }
  });
}
writeLines(0);

console.log("at end");
