import { createStore } from "vuex";
import axios from "axios";
export default createStore({
  state: {
    tables: [],
    mostPlayedDecksFirst10: [],
    mostWinnerDecks: [],
    mostTop4Decks: [],
    isEvent: true,
    numberOfPages: 0,
  },
  getters: {},
  mutations: {
    fullList(state, list) {
      state.tables = list.paginatedTable.events;
      state.mostPlayedDecksFirst10 = list.mostPlayedDecks.slice(0, 10);
      state.mostWinnerDecks = list.mostWinnerDecks;
      state.mostTop4Decks = list.mostTop4Decks;
      state.numberOfPages = list.paginatedTable.numberOfPages;
    },
    queryList(state, list) {
      state.isEvent = list.isEvent;
      state.tables = list.paginatedTable.events;
      state.mostPlayedDecksFirst10 = list.mostPlayedDecks.slice(0, 10);
      state.mostWinnerDecks = list.mostWinnerDecks;
      state.mostTop4Decks = list.mostTop4Decks;
      state.numberOfPages = list.paginatedTable.numberOfPages;
    },
  },
  actions: {
    fullList({ commit }) {
      axios.get(process.env.VUE_APP_API_URL).then((response) => {
        commit("fullList", response.data);
      });
    },
    queryList({ commit }, params) {
      const myUrlWithParams = new URL(process.env.VUE_APP_API_URL);
      if (params.commander) {
        myUrlWithParams.searchParams.append("commander", params.commander);
      }

      if (params.location) {
        myUrlWithParams.searchParams.append("location", params.location);
      }

      if (params.date) {
        myUrlWithParams.searchParams.append("date", params.date);
      }
      if (params.page) {
        myUrlWithParams.searchParams.append("page", params.page);
      }
      if (params.initialDate && params.finalDate) {
        myUrlWithParams.searchParams.append("initialDate", params.initialDate);
        myUrlWithParams.searchParams.append("finalDate", params.finalDate);
      }

      axios.get(myUrlWithParams).then((response) => {
        commit("queryList", response.data);
      });
    },
  },
  modules: {},
});
