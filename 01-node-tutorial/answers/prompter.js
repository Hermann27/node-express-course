const http = require("http");
var StringDecoder = require("string_decoder").StringDecoder;

const getBody = (req, callback) => {
  const decode = new StringDecoder("utf-8");
  let body = "";
  req.on("data", function (data) {
    body += decode.write(data);
  });
  req.on("end", function () {
    body += decode.end();
    const body1 = decodeURI(body);
    const bodyArray = body1.split("&");
    const resultHash = {};
    bodyArray.forEach((part) => {
      const partArray = part.split("=");
      resultHash[partArray[0]] = partArray[1];
    });
    callback(resultHash);
  });
};

// here, you could declare one or more variables to store what comes back from the form.
//let item = "Enter something below..";
// Generate a random number between 1 and 100
let randomNumber = Math.floor(Math.random() * 100) + 1;
let feedbackMessage = "Guess a number between 1 and 100:";

// here, you can change the form below to modify the input fields and what is displayed.
// This is just ordinary html with string interpolation.
const form = () => {
  return `
  <body>
  <h1>Number Guessing Game</h1>
  <p>${feedbackMessage}</p>
  <form method="POST">
    <label for="guess">Your Guess:</label>
    <input type="number" name="guess" min="1" max="100" required></input>
    <button type="submit">Submit Guess</button>
  </form>
  </body>
  `;
};

const server = http.createServer((req, res) => {
  console.log("req.method is ", req.method);
  console.log("req.url is ", req.url);
  if (req.method === "POST") {
    getBody(req, (body) => {
      console.log("The body of the post is ", body);
      // here, you can add your own logic
      let userGuess = parseInt(body["guess"]); // Convert the guess to an integer

      if (userGuess < randomNumber) {
        feedbackMessage = `Your guess of ${userGuess} is too low! Try again.`;
      } else if (userGuess > randomNumber) {
        feedbackMessage = `Your guess of ${userGuess} is too high! Try again.`;
      } else {
        feedbackMessage = `Congratulations! You guessed the correct number: ${randomNumber}.`;
        // Reset the random number for the next round
        randomNumber = Math.floor(Math.random() * 100) + 1;
      }
      // Your code changes would end here
      res.writeHead(303, {
        Location: "/",
      });
      res.end();
    });
  } else {
    res.end(form());
  }
});

server.listen(3000);
console.log("The server is listening on port 3000.");

server.on("request", (req) => {
  console.log("event received: ", req.method, req.url);
});
