const http = require("http");

const server = http.createServer((req, res) => {
  // Set the response headers to specify content type as HTML
  res.writeHead(200, { "Content-Type": "text/html" });

  // Check the URL of the incoming request
  if (req.url === "/") {
    // Root URL: Send a welcome message
    res.end("<h1>Welcome to the Homepage!</h1>");
  } else if (req.url === "/about") {
    // '/about' URL: Send an About Us message
    res.end("<h1>About Us Page</h1>");
  } else {
    // For any other URL: Send a 404 error page
    res.end("<h1>404 Not Found</h1>");
  }
});

// Start the server and listen on port 3000
server.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});
