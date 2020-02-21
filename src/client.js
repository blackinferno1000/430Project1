/* eslint-disable */

//Vue app
const app = new Vue({
  el: '#app',
  data: {
    mangaList: [],
    searchQuery: '',
    filters: {},
    genres: {},
    searching: true,
  },
  methods: {
    //toggle view
    getResultSection(e) {
      this.searching = true;
    },
    //toggle view
    getTrackedSection(e) {
      this.searching = false;
      this.getManga(e);
    },
    //parses incoming json from requests
    parseJSON(xhr, content) {
      const obj = JSON.parse(xhr.response);

      if (xhr.response) {
        this.mangaList = obj;
      }
    },
    //handles if json needs parsing
    handleResponse(xhr, parse) {
      const content = document.querySelector('#content');
      if (parse) {
        this.parseJSON(xhr, content);
      }
    },
    //sends post requests
    sendPost(e, postForm) {
      e.preventDefault();

      const action = postForm.getAttribute('action');
      const method = postForm.getAttribute('method');

      const title = postForm.querySelector('#title');
      const author = postForm.querySelector('#author');
      const currentChapter = postForm.querySelector('#currentChapter');
      const maxChapter = postForm.querySelector('#maxChapter');
      const description = postForm.querySelector('#description');

      const xhr = new XMLHttpRequest();
      xhr.open(method, action);

      xhr.setRequestHeader('Accept', 'application/json');
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

      xhr.onload = () => this.handleResponse(xhr, false);

      const formData = `title=${title.value}&author=${author.value}&currentChapter=${currentChapter.value}&maxChapter=${maxChapter.value}&description=${description.value}`;

      xhr.send(formData);

      e.preventDefault();

      return false;
    },
    //sends get requests
    sendGet(e, getForm) {
      e.preventDefault();

      const xhr = new XMLHttpRequest();
      xhr.open('GET', '/getManga');

      xhr.onload = () => this.handleResponse(xhr, true);

      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();

      e.preventDefault();

      return false;
    },
    //event listener to send get requests
    getManga(e) {
      const getForm = document.querySelector('#getForm');
      this.sendGet(e, getForm);
    },
    //event listener to send post requests
    addManga(e) {
      const addForm = document.querySelector('#addForm');
      this.sendPost(e, addForm);
    },
    //deletes cards from datamodel and view
    deleteCard(id) {
      console.log(this.mangaList.mangaList[id]);
      delete this.mangaList.mangaList[id];
      this.forceUpdate();
    },
    //updates view
    forceUpdate() {
      this.$forceUpdate(); 
    },
  },
});
