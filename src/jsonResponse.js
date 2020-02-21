// "DataModel"
const mangaList = {};

// returns json and head
const respondJSON = (req, res, status, object) => {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify(object));
  res.end();
};

// returns head
const respondJSONMeta = (req, res, status) => {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end();
};

// gets dataModel
const getManga = (req, res, meta) => {
  const responseJSON = {
    mangaList,
  };

  if (meta) {
    return respondJSONMeta(req, res, 200);
  }

  return respondJSON(req, res, 200, responseJSON);
};

// handles not found
const notFound = (req, res, meta) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  if (meta) {
    return respondJSONMeta(req, res, 404);
  }

  return respondJSON(req, res, 404, responseJSON);
};

// adds/updates manga to dataModel
const addManga = (req, res, body) => {
  const responseJSON = {
    message: 'Name and chapter details are required',
  };

  if (!body.title || !body.currentChapter || !body.maxChapter) {
    responseJSON.id = 'missingParams';
    return respondJSON(req, res, 400, responseJSON);
  }

  let responseCode = 201;

  if (mangaList[body.title]) {
    responseCode = 204;
  } else {
    mangaList[body.title] = {};
  }

  mangaList[body.title].title = body.title;
  mangaList[body.title].author = body.author;
  mangaList[body.title].currentChapter = body.currentChapter;
  mangaList[body.title].maxChapter = body.maxChapter;
  mangaList[body.title].description = body.description;

  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
    return respondJSON(req, res, responseCode, responseJSON);
  }

  return respondJSONMeta(req, res, responseCode);
};

module.exports = {
  getManga,
  addManga,
  notFound,
};
