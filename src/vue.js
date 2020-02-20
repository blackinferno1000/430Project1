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
    getResultSection() {
      this.searching = true;
    },
    getTrackedSection() {
      this.searching = false;
    },

  },
});
