const fs = require('fs');

// paths
const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);
const client = fs.readFileSync(`${__dirname}/client.js`);

// returns index
const getIndex = (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write(index);
  res.end();
};

// returns css
const getCSS = (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/css' });
  res.write(css);
  res.end();
};

// returns client.js
const getClientJS = (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/javascript' });
  res.write(client);
  res.end();
};

module.exports = {
  getIndex,
  getCSS,
  getClientJS,
};
