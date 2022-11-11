<template>
  <div>
    <Navbar />
    <form @submit.prevent="filter">
      <div class="row">
        <div class="col-md-8">
          <input
            v-model="commander"
            type="text"
            name="commander"
            id="commander"
            class="form-control"
            placeholder="commander"
          />
        </div>
        <div class="col-md-8">
          <input
            v-model="location"
            type="text"
            name="location"
            id="location"
            class="form-control"
            placeholder="location"
          />
        </div>
        <div class="col-md-8">
          <input
            v-model="date"
            type="text"
            name="date"
            id="date"
            class="form-control"
            placeholder="date"
          />
        </div>
      </div>
      <button>submit</button>
    </form>
    <div class="row">
      <div class="col-12 col-md-9" v-if="$store.state.isEvent">
        <EventTable :tables="$store.state.tables" />
      </div>
      <div class="col-12 col-md-9" v-else>
        <DeckTable :tables="$store.state.tables" />
      </div>
      <div class="col-6 col-md-3">
        <FrequencyTable />
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-6">
        <Chart :info="$store.state.mostWinnerDecks" :top4="false"/>
      </div>
      <div class="col-12 col-md-6">
        <Chart :info="$store.state.mostTop4Decks" :top4="true"/>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import EventTable from "../components/EventTable.vue";
import DeckTable from "../components/DeckTable.vue";
import FrequencyTable from "../components/FrequencyTable.vue";
import Chart from "../components/Chart.vue";

export default {
  name: "HomeView",
  components: {
    Navbar,
    EventTable,
    FrequencyTable,
    Chart,
    DeckTable
  },
  computed: {
    hasParams() {
      return window.location.href.indexOf("?") !== -1;
    },
  },
  data() {
    return {
      commander: null,
      location: null,
      date: null,
    };
  },
 beforeCreate() {
    const params = window.location.href.includes("?");
    if (params) {
      const urlParams = new URLSearchParams(window.location.search);

      const params = {
        commander: urlParams.get("commander"),
        location: urlParams.get("location"),
        date: urlParams.get("date"),
      };
      
      this.$store.dispatch("queryList", params);
    } else {
      this.$store.dispatch("fullList");
    }
  },
  methods: {
    filter() {
      const myUrlWithParams = new URL("http://localhost:8080/");
      if (this.commander)
        myUrlWithParams.searchParams.append("commander", this.commander);

      if (this.location)
        myUrlWithParams.searchParams.append("location", this.location);

      if (this.date) myUrlWithParams.searchParams.append("date", this.date);

      window.location.href = myUrlWithParams;
    },
  },
};
</script>

<style></style>
