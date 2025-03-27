const { writeFile, readFile } = require("fs").promises;

console.log("First line written successfully");
writeFile("temp.txt", "First line\n")
  .then(() => {
    console.log("Second line written successfully");
    return writeFile("temp.txt", "Second line\n", { flag: "a" });
  })
  .then(() => {
    console.log("Third line written successfully");
    return writeFile("temp.txt", "Third line\n", { flag: "a" });
  })
  .then(() => {
    console.log("File written successfully");
  })
  .catch((error) => {
    console.error("Error writing file:", error);
  });
