const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);
const vue = fs.readFileSync(`${__dirname}/vue.js`);
const client = fs.readFileSync(`${__dirname}/client.js`);

const getIndex = (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write(index);
  res.end();
};

const getCSS = (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/css' });
  res.write(css);
  res.end();
};

const getVue = (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/javascript' });
  res.write(vue);
  res.end();
};

const getClientJS = (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/javascript' });
  res.write(client);
  res.end();
};

module.exports = {
  getIndex,
  getCSS,
  getVue,
  getClientJS,
};
