import { createStore } from "vuex";
import axios from "axios";
export default createStore({
  state: {
    tables: null,
    tableWinner: null,
    tableTop4: null,
    queryParams: null
  },
  getters: {},
  mutations: {
    fullList(state, list) {
      state.tables = list;
    },
    queryList(state, list) {
      state.tables = null;
      state.tableWinner = list.winner;
      state.tableTop4 = list.top4
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
    queryList({ commit }) {
      axios
        .get("http://localhost:3333/api/v1/leviathan/list?date=2022&commander=ragavan")
        .then((response) => {
          commit("queryList", response.data);
        });
    },
  },
  modules: {},
});
