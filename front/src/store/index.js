import { createStore } from "vuex";
import axios from "axios";
export default createStore({
  state: {
    tables: null,
    tableWinner: null,
    tableTop4: null,
    queryParams: null,
    commander: null,
  },
  getters: {},
  mutations: {
    fullList(state, list) {
      state.tables = list;
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
