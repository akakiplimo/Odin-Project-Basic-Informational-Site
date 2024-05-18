const http = require("http");
const fs = require("fs");
const url = require("url");

const host = "localhost";
const port = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
  const myUrl = url.parse(req.url, true);
  let filename;
  if (myUrl.pathname === "/") {
    filename = "./index.html";
  } else {
    filename = `.${myUrl.pathname}.html`;
  }

  fs.readFile(filename, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/html" });
      fs.readFile("./404.html", (error, errorPage) => res.end(errorPage));
      return;
    }
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(data);
    res.end();
  });
});

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
