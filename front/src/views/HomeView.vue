<template>
  <div>
    <form @submit.prevent="filter">
      <div class="row mb-3 mt-3">
        <div class="col-7 mb-3">
          <label for="commander" class="form-label">Commander</label>
          <input
            label="Commander"
            v-model="commander"
            type="text"
            name="commander"
            id="commander"
            class="form-control"
            placeholder="'Esika, God of the tree'"
            aria-label="'Esika, God of the tree'"
          />
        </div>
        <div class="col-7 mb-3">
          <label for="location" class="form-label">Location</label>
          <input
            v-model="location"
            type="text"
            name="location"
            id="location"
            class="form-control"
            placeholder="'Teresina' or 'Brazil'"
          />
        </div>
        <div class="row mb-3 mt-3">
          <div class="col-4 mb-3">
            <input
              v-model="byYear"
              class="form-check-input"
              type="checkbox"
              name="byYear"
              id="byYear"
            />
            <label for="byYear" class="form-check-label ms-3">By Year</label>
          </div>
          <div class="col-3 mb-3">
            <input
              v-model="setInterval"
              class="form-check-input"
              type="checkbox"
              name="setInterval"
              id="setInterval"
            />
            <label for="setInterval" class="form-check-label ms-3"
              >Set Interval</label
            >
          </div>
        </div>
        <div class="row mb-3 mt-3">
          <div v-if="byYear" class="col-7 mb-3">
            <select class="form-select" aria-label="Default select example">
              <option selected>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <div v-if="setInterval" class="col-3 mb-3">
            <input
              v-model="initialDate"
              type="date"
              name="initialDate"
              id="initialDate"
              class="form-control"
            />
          </div>
          <div v-if="setInterval" class="col-3 mb-3">
            <input
              v-model="finalDate"
              type="date"
              name="finalDate"
              id="finalDate"
              class="form-control"
            />
          </div>
        </div>
        <div class="col-7">
          <button type="submit" class="btn btn-primary">Submit</button>
        </div>
      </div>
    </form>
    <!-- Tables -->
    <div class="row">
      <div class="col-11" v-if="$store.state.isEvent">
        <EventTable :tables="$store.state.tables" />
      </div>
      <div class="col-11" v-else>
        <DeckTable :tables="$store.state.tables" />
      </div>
      <div class="col-6">
        <FrequencyTable />
      </div>
    </div>
    <!-- Charts -->
    <br />
    <br />
    <div class="row mt-6">
      <div class="col-10 col-md-6">
        <Chart :info="$store.state.mostWinnerDecks" :top4="false" />
      </div>
      <div class="col-10 col-md-3">
        <Chart :info="$store.state.mostTop4Decks" :top4="true" />
      </div>
    </div>
  </div>
</template>

<script>
import EventTable from "../components/EventTable.vue";
import DeckTable from "../components/DeckTable.vue";
import FrequencyTable from "../components/FrequencyTable.vue";
import Chart from "../components/Chart.vue";

export default {
  name: "HomeView",
  components: {
    EventTable,
    FrequencyTable,
    Chart,
    DeckTable,
  },
  computed: {
    hasParams() {
      return window.location.href.indexOf("?") !== -1;
    },
  },
  watch: {
    byYear: function (newVal) {
      if (newVal) {
        this.setInterval = false;
      }
    },
    setInterval: function (newVal) {
      if (newVal) {
        this.byYear = false;
      }
    },
  },
  data() {
    return {
      commander: null,
      location: null,
      date: null,
      byYear: true,
      setInterval: false,
      initialDate: null,
      finalDate: null,
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
        page: urlParams.get("page"),
        initialDate: urlParams.get("initialDate"),
        finalDate: urlParams.get("finalDate"),
      };
      this.$store.dispatch("queryList", params);
    } else {
      this.$store.dispatch("fullList");
    }
  },
  methods: {
    filter() {
      const myUrlWithParams = new URL(process.env.VUE_APP_FRONT_URL);
      if (this.commander)
        myUrlWithParams.searchParams.append("commander", this.commander);

      if (this.location)
        myUrlWithParams.searchParams.append("location", this.location);

      if (this.date) myUrlWithParams.searchParams.append("date", this.date);

      if (this.date) myUrlWithParams.searchParams.append("date", this.date);
      if (this.initialDate && this.finalDate) {
        myUrlWithParams.searchParams.append("initialDate", this.initialDate);
        myUrlWithParams.searchParams.append("finalDate", this.finalDate);
      }
      window.location.href = myUrlWithParams;
    },
  },
};
</script>

<style>
.row {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
button {
  width: 100%;
}
</style>
