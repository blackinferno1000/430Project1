const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponse.js');
const jsonHandler = require('./jsonResponse.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

// handles post requests
const handlePost = (req, res, parsedUrl) => {
  if (parsedUrl.pathname === '/addManga') {
    const body = [];

    // if theres an issue give status 400 and end
    req.on('error', (err) => {
      console.dir(err);
      res.statusCode = 400;
      res.end();
    });

    req.on('data', (chunk) => {
      body.push(chunk);
    });

    req.on('end', () => {
      // Buffer takes parts of an array and turns it into one variable on string
      const bodyString = Buffer.concat(body).toString();
      const bodyParams = query.parse(bodyString);
      jsonHandler.addManga(req, res, bodyParams);
    });
  } else if (parsedUrl.pathname === '/deleteManga') {
    const body = [];

    // if theres an issue give status 400 and end
    req.on('error', (err) => {
      console.dir(err);
      res.statusCode = 400;
      res.end();
    });

    req.on('data', (chunk) => {
      body.push(chunk);
    });

    req.on('end', () => {
      // Buffer takes parts of an array and turns it into one variable on string
      const bodyString = Buffer.concat(body).toString();
      const bodyParams = query.parse(bodyString);
      jsonHandler.deleteManga(req, res, bodyParams);
    });
  }
};

const handlePut = (req, res, parsedUrl) => {
  if (parsedUrl.pathname === '/updateManga') {
    const body = [];

    // if theres an issue give status 400 and end
    req.on('error', (err) => {
      console.dir(err);
      res.statusCode = 400;
      res.end();
    });

    req.on('data', (chunk) => {
      body.push(chunk);
    });

    req.on('end', () => {
      // Buffer takes parts of an array and turns it into one variable on string
      const bodyString = Buffer.concat(body).toString();
      const bodyParams = query.parse(bodyString);
      jsonHandler.addManga(req, res, bodyParams);
    });
  }
};

// handles get requests
const handleGet = (req, res, parsedUrl) => {
  if (parsedUrl.pathname === '/style.css') {
    htmlHandler.getCSS(req, res);
  } else if (parsedUrl.pathname === '/client.js') {
    htmlHandler.getClientJS(req, res);
  } else if (parsedUrl.pathname === '/getManga') {
    jsonHandler.getManga(req, res, false);
  } else if (parsedUrl.pathname === '/') {
    htmlHandler.getIndex(req, res);
  } else {
    jsonHandler.notFound(req, res, false);
  }
};

// handles head requests
const handleHead = (req, res, parsedUrl) => {
  if (parsedUrl.pathname === '/getManga') {
    jsonHandler.getManga(req, res, true);
  } else {
    jsonHandler.notFound(req, res, true);
  }
};

// handles requests
const onRequest = (req, res) => {
  const parsedUrl = url.parse(req.url);

  if (req.method === 'POST') {
    handlePost(req, res, parsedUrl);
  } else if (req.method === 'GET') {
    handleGet(req, res, parsedUrl);
  } else if (req.method === 'PUT') {
    handlePut(req, res, parsedUrl);
  } else {
    handleHead(req, res, parsedUrl);
  }
};

// creates server
http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
