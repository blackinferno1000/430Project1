/* eslint-disable */

//Vue app
const app = new Vue({
  el: "#app",
  data: {
    mangaList: [],
    searchQuery: "",
    filters: {},
    genres: {},
    searching: true,
    searchResults: {}
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
      const content = document.querySelector("#content");
      if (parse) {
        this.parseJSON(xhr, content);
      }
    },
    //sends post requests
    sendPost(e, postForms) {
      e.preventDefault();
      for (let form of postForms) {
        if (e.target.form.id === form.id) {
          const action = form.getAttribute("action");
          const method = form.getAttribute("method");

          let title, currentChapter, maxChapter, description;

          title = form.querySelector(".title");
          currentChapter = form.querySelector(".currentChapter");
          maxChapter = form.querySelector(".maxChapter");
          description = form.querySelector(".synopsis");

          const xhr = new XMLHttpRequest();
          xhr.open(method, action);

          xhr.setRequestHeader("Accept", "application/json");
          xhr.setRequestHeader(
            "Content-type",
            "application/x-www-form-urlencoded"
          );

          xhr.onload = () => this.handleResponse(xhr, false);
          let formData = `title=${title.textContent}&currentChapter=${currentChapter.value}&maxChapter=${maxChapter.textContent}&description=${description.value}`;

          xhr.send(formData);

          e.preventDefault();
        }
      }

      return false;
    },
    //sends get requests
    sendGet(e, getForm) {
      e.preventDefault();

      const action = getForm.getAttribute("action");
      const method = getForm.getAttribute("method");

      const xhr = new XMLHttpRequest();
      xhr.open(method, action);

      xhr.onload = () => this.handleResponse(xhr, true);

      xhr.setRequestHeader("Accept", "application/json");
      xhr.send();

      e.preventDefault();

      return false;
    },
    //sends put requests
    sendPut(e, updateForms) {
      e.preventDefault();

      for (let form of updateForms) {
        if (e.target.form.id === form.id) {
          const action = form.getAttribute("action");
          const method = form.getAttribute("method");

          let title, currentChapter, maxChapter, description;

          title = form.querySelector(".title");
          currentChapter = form.querySelector(".currentChapter");
          maxChapter = form.querySelector(".maxChapter");
          description = form.querySelector(".description");

          console.log(title);
          console.log(currentChapter);
          console.log(maxChapter);
          console.log(description);

          const xhr = new XMLHttpRequest();
          xhr.open(method, action);

          xhr.setRequestHeader("Accept", "application/json");
          xhr.setRequestHeader(
            "Content-type",
            "application/x-www-form-urlencoded"
          );

          xhr.onload = () => this.handleResponse(xhr, false);
          const formData = `title=${title.textContent}&currentChapter=${currentChapter.value}&maxChapter=${maxChapter.value}&description=${description.textContent}`;

          xhr.send(formData);

          e.preventDefault();
        }
      }

      return false;
    },
    //updates manga
    updateManga(e) {
      const updateForms = document.querySelectorAll(".updateForm");
      console.log(updateForms);
      this.sendPut(e, updateForms);
    },
    //event listener to send get requests
    getManga(e) {
      const getForm = document.querySelector("#getForm");
      this.sendGet(e, getForm);
    },
    //event listener to send post requests
    addManga(e) {
      const addForms = document.querySelectorAll(".addForm");
      console.log(addForms);
      this.sendPost(e, addForms);
    },
    //deletes cards from datamodel and view
    deleteCard(id) {
      delete this.mangaList.mangaList[id];
      this.deleteManga(id);
      this.forceUpdate();
    },
    //updates mangaList on server
    deleteManga(id) {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "/deleteManga");

      xhr.setRequestHeader("Accept", "application/json");
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

      xhr.onload = () => this.handleResponse(xhr, false);
      const formData = `title=${id}`;

      xhr.send(formData);
    },
    //updates view
    forceUpdate() {
      this.$forceUpdate();
    },
    searchManga() {
      fetch(
        `https://api.jikan.moe/v3/search/manga?q=${this.searchQuery}&page=1&limit=10&type=Manga`
      )
        .then(res => {
          return res.json();
        })
        .then(data => {
          console.log(data);
          this.searchResults = data;
        });
    }
  }
});
