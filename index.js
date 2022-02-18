const http = require('http');
const url = require('url');
const fs = require('fs');
const myURL = new URL('https://localhost:8080');

const port = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  const q = url.parse(req.url, true);
  console.log(q);
  const file = q.pathname === '/' ? `./index.html` : `.${q.pathname}.html`;

  fs.readFile(file, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      return res.end(
        `<h1>Error: 404</h1><p>The page you are looking for doesn't exist.</p> <a href="/">Back home.</a>`
      );
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(data);
    return res.end();
  });
});

server.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
