import { createStore } from "vuex";
import axios from "axios";
export default createStore({
  state: {
    tables: [],
    mostPlayedDecksFirst10: [],
    mostWinnerDecks: [],
    mostTop4Decks: [],
    isEvent: true
  },
  getters: {},
  mutations: {
    fullList(state, list) {
      state.tables = list.paginatedTable.events;
      state.mostPlayedDecksFirst10 = list.mostPlayedDecks.slice(0,10)
      state.mostWinnerDecks = list.mostWinnerDecks
      state.mostTop4Decks = list.mostTop4Decks
    },
    queryList(state, list) {
      state.isEvent = list.isEvent
      state.tables = list.paginatedTable.events;
      state.mostPlayedDecksFirst10 = list.mostPlayedDecks.slice(0,10)
      state.mostWinnerDecks = list.mostWinnerDecks
      state.mostTop4Decks = list.mostTop4Decks
    },
    setCommander(state, newValue) {
      state.commander = newValue
    }
  },
  actions: {
    fullList({ commit }) {
      axios
        .get("http://localhost:3333/api/v1/leviathan/list")
        .then((response) => {
          commit("fullList", response.data);
        });
    },
    queryList({ commit }, params) {

      const myUrlWithParams = new URL("http://localhost:3333/api/v1/leviathan/list");
      if (params.commander)
       { myUrlWithParams.searchParams.append("commander", params.commander);}

      if (params.location){
        myUrlWithParams.searchParams.append("location", params.location);}

      if (params.date){ myUrlWithParams.searchParams.append("date", params.date);}

      axios
        .get(myUrlWithParams)
        .then((response) => {
          commit("queryList", response.data);
        });
    },
  },
  modules: {},
});
