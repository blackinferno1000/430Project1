
const parseJSON = (xhr, content) => {
  const obj = JSON.parse(xhr.response);

  if (xhr.response) {

  }
};

const handleResponse = (xhr, parse) => {
  const content = document.querySelector('#content');

  parseJSON(xhr, content);
};

const sendPost = (e, postForm) => {
  const action = nameForm.getAttribute('action');
  const method = nameForm.getAttribute('method');

  const title = postForm.querySelector('#title');
  const author = postForm.querySelector('#author');
  const currentChapter = postForm.querySelector('#currentChapter');
  const maxChapter = postForm.querySelector('#maxChapter');
  const description = postForm.querySelector('#description');

  const xhr = new XMLHttpRequest();
  xhr.open(method, action);

  xhr.setRequestHeader('Accept', 'application/json');
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  xhr.onload = () => handleResponse(xhr, true);

  const formData = `title=${title.value}&author=${author.value}&currentChapter=${currentChapter.value}&maxChapter=${maxChapter.value}&description=${description.value}`;

  xhr.send(formData);

  e.preventDefault();

  return false;
};

const sendGet = (e, getForm) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', '/getManga');

  xhr.onload = () => handleResponse(xhr);

  xhr.setRequestHeader('Accept', 'application/json');
  xhr.send();

  e.preventDefault();

  return false;
};

const init = () => {
  const getForm = document.querySelector('#getForm');
  const addForm = document.querySelector('#addForm');

  const getManga = (e) => sendGet(e, getForm);
  getForm.addEventListener('click', getManga);

  const addManga = (e) => sendPost(e, addForm);
  addForm.addEventListener('click', addManga);
};
window.onload = init;
