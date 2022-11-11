import { createStore } from "vuex";
import axios from "axios";
export default createStore({
  state: {
    tables: [],
    tableWinner: [],
    tableTop4: [],
    queryParams: [],
    commander: [],
    mostPlayedDecksFirst10: [],
    mostWinnerDecksFirst10: [],
    mostTop4DecksFirst10: [],
    mostWinnerDecksWithoutFirst10: [],
    mostTop4DecksWithoutFirst10: []

  },
  getters: {},
  mutations: {
    fullList(state, list) {
      state.tables = list.paginatedTable.events;
      state.mostPlayedDecksFirst10 = list.mostPlayedDecks.slice(0,10)
      state.mostWinnerDecksFirst10 = list.mostWinnerDecks.slice(0,10)
      state.mostTop4DecksFirst10 = list.mostTop4Decks.slice(0,10)
      //adicionar outros
      //retirar os 10 primeiros e lançar todos pros componentes e tratar lá
    },
    queryList(state, list) {
      state.tables = null;
      state.tableWinner = list.winner;
      state.tableTop4 = list.top4;
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
        myUrlWithParams.searchParams.append("commander", params.commander);

      if (params.location)
        myUrlWithParams.searchParams.append("location", params.location);

      if (params.year) myUrlWithParams.searchParams.append("year", params.year);

      axios
        .get(myUrlWithParams)
        .then((response) => {
          commit("queryList", response.data);
        });
    },
  },
  modules: {},
});
