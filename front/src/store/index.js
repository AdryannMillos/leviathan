import { createStore } from "vuex";
import axios from "axios";
export default createStore({
  state: {
    // tables: [],
    // mostPlayedDecksFirst10: [],
    // mostWinnerDecks: [],
    // mostTop4Decks: [],
    // isEvent: true,
    // numberOfPages: 0,
    events: [],
    commanders: [],
    winners: [],
    played: [],
    top4: [],
  },
  getters: {},
  mutations: {
    fullList(state, list) {
      // state.tables = list.paginatedTable.events;
      // state.mostPlayedDecksFirst10 = list.mostPlayedDecks.slice(0, 10);
      // state.mostWinnerDecks = list.mostWinnerDecks;
      // state.mostTop4Decks = list.mostTop4Decks;
      // state.numberOfPages = list.paginatedTable.numberOfPages;
      state.events = list.event.paginatedTable;
      state.top4 = list.top4.paginatedTable;
      state.winners = list.winner.paginatedTable;
      state.played = list.played.paginatedTable;
    },
    queryList(state, list) {
      // state.tables = list.paginatedTable.events;
      // state.mostPlayedDecksFirst10 = list.mostPlayedDecks.slice(0, 10);
      // state.mostWinnerDecks = list.mostWinnerDecks;
      // state.mostTop4Decks = list.mostTop4Decks;
      // state.numberOfPages = list.paginatedTable.numberOfPages;
      // state.events = list.event.paginatedTable.events;
      state.commanders = list.commander?.paginatedTable;
      state.top4 = list.top4.paginatedTable;
      state.winners = list.winner.paginatedTable;
      state.played = list.played.paginatedTable;
      if (!state.commanders?.commanders) {
        state.events = list.event.paginatedTable;
      }
    },
  },
  actions: {
    fullList({ commit }) {
      const eventUrl = new URL(process.env.VUE_APP_API_URL + "/list/event");
      const playedUrl = new URL(process.env.VUE_APP_API_URL + "/list/played");
      const winnerUrl = new URL(process.env.VUE_APP_API_URL + "/list/winner");
      const top4Url = new URL(process.env.VUE_APP_API_URL + "/list/top4");
      Promise.all([
        axios.get(eventUrl),
        axios.get(top4Url),
        axios.get(winnerUrl),
        axios.get(playedUrl),
      ])
        .then((responses) => {
          const result = {
            event: responses[0].data,
            top4: responses[1].data,
            winner: responses[2].data,
            played: responses[3].data,
          };
          commit("fullList", result);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    queryList({ commit }, params) {
      const eventUrl = new URL(process.env.VUE_APP_API_URL + "/list/event");
      const commanderUrl = new URL(
        process.env.VUE_APP_API_URL + "/list/commander"
      );
      const playedUrl = new URL(process.env.VUE_APP_API_URL + "/list/played");
      const winnerUrl = new URL(process.env.VUE_APP_API_URL + "/list/winner");
      const top4Url = new URL(process.env.VUE_APP_API_URL + "/list/top4");

      if (params.commander) {
        commanderUrl.searchParams.append("commander", params.commander);
      }

      if (params.location) {
        eventUrl.searchParams.append("location", params.location);
        commanderUrl.searchParams.append("location", params.location);
        playedUrl.searchParams.append("location", params.location);
        winnerUrl.searchParams.append("location", params.location);
        top4Url.searchParams.append("location", params.location);
      }

      if (params.date) {
        eventUrl.searchParams.append("date", params.date);
        commanderUrl.searchParams.append("date", params.date);
        playedUrl.searchParams.append("date", params.date);
        winnerUrl.searchParams.append("date", params.date);
        top4Url.searchParams.append("date", params.date);
      }
      if (params.page) {
        eventUrl.searchParams.append("page", params.page);
        commanderUrl.searchParams.append("page", params.page);
        if(window.location.href.includes("frequency")){
          playedUrl.searchParams.append("page", params.page);
        }
        if(window.location.href.includes("winner")){
          winnerUrl.searchParams.append("page", params.page);
        }
        if(window.location.href.includes("top4")){
          top4Url.searchParams.append("page", params.page);
        }
      }
      if (params.initialDate && params.finalDate) {
        eventUrl.searchParams.append("initialDate", params.initialDate);
        eventUrl.searchParams.append("finalDate", params.finalDate);
        commanderUrl.searchParams.append("initialDate", params.initialDate);
        commanderUrl.searchParams.append("finalDate", params.finalDate);
        playedUrl.searchParams.append("initialDate", params.initialDate);
        playedUrl.searchParams.append("finalDate", params.finalDate);
        winnerUrl.searchParams.append("initialDate", params.initialDate);
        winnerUrl.searchParams.append("finalDate", params.finalDate);
        top4Url.searchParams.append("initialDate", params.initialDate);
        top4Url.searchParams.append("finalDate", params.finalDate);
      }
      Promise.all([
        axios.get(eventUrl),
        axios.get(top4Url),
        axios.get(winnerUrl),
        axios.get(playedUrl),
        params.commander ? axios.get(commanderUrl) : Promise.resolve(null) // Add condition here
      ])
        .then((responses) => {
          const result = {
            event: responses[0].data,
            top4: responses[1].data,
            winner: responses[2].data,
            played: responses[3].data,
          };
          if(params.commander){
            result.commander = responses[4].data
          }
          commit("queryList", result);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  modules: {},
});
