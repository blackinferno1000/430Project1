var app = new Vue({
    el: '#app',
    data: {
      mangaList: [],
      searchQuery: '',
      filters: {},
      genres: {},
      searching: true,
    },
    methods: {
        getResultSection: function () {
            this.searching = true;
        },
        getTrackedSection: function () {
            this.searching = false;
        },
        
    }
  })