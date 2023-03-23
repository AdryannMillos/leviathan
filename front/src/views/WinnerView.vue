<template>
  <div>
    <form @submit.prevent="filter">
      <div class="row centering mb-3 mt-3">
        <div class="col-8 mb-3">
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
        <div class="row centering mb-3 mt-3">
          <div class="col-8 col-md-5 mb-3">
            <input
              v-model="byYear"
              class="form-check-input"
              type="checkbox"
              name="byYear"
              id="byYear"
            />
            <label for="byYear" class="form-check-label ms-3">By Year</label>
          </div>
          <div class="col-8 col-md-3 mb-3">
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
        <div class="row centering mb-3 mt-3">
          <div v-if="byYear" class="col-8 mb-3">
            <select
              class="form-select"
              v-model="date"
              aria-label="Default select example"
            >
              <option value="null">All years</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
            </select>
          </div>
          <div v-if="setInterval" class="col-4 mb-3">
            <label for="initialDate" class="form-check-label ms-3"
              >Initial</label
            >
            <input
              v-model="initialDate"
              type="date"
              name="initialDate"
              id="initialDate"
              class="form-control"
            />
          </div>
          <div v-if="setInterval" class="col-4 mb-3">
            <label for="initialDate" class="form-check-label ms-3">Final</label>

            <input
              v-model="finalDate"
              type="date"
              name="finalDate"
              id="finalDate"
              class="form-control"
            />
          </div>
        </div>
        <div class="col-6">
          <button type="submit" class="btn btn-primary">Submit</button>
        </div>
      </div>
    </form>
    <!-- Tables -->
    <div class="row centering">
      <div class="col-11">
        <FrequencyTable :info="$store?.state?.winners?.winners"/>
      </div>
    </div>
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li v-if="page > 1" class="page-item">
          <a
            class="page-link"
            href="#"
            aria-label="Previous"
            @click="goToPage(Number(page) - 1)"
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li v-for="page in pageOptions" :key="page" class="page-item">
          <a class="page-link" href="#" @click="goToPage(page)">{{ page }}</a>
        </li>

        <li v-if="page < $store.state.winners.numberOfPages" class="page-item">
          <a
            class="page-link"
            href="#"
            aria-label="Next"
            @click="goToPage(Number(page) + 1)"
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
//   import EventTable from "../components/EventTable.vue";
//   import DeckTable from "../components/DeckTable.vue";
import FrequencyTable from "../components/FrequencyTable.vue";
//   import Chart from "../components/Chart.vue";

export default {
  name: "WinnerView",
  components: {
    //   EventTable,
    FrequencyTable,
    //   Chart,
    //   DeckTable,
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
      location: null,
      date: null,
      byYear: true,
      setInterval: false,
      initialDate: null,
      finalDate: null,
      page: new URLSearchParams(window.location.search).get("page"),
    };
  },
  beforeCreate() {
    const params = window.location.href.includes("?");
    if (params) {
      const urlParams = new URLSearchParams(window.location.search);

      const params = {
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
    goToPage(page) {
      const urlParams = new URL(window.location.href);
      urlParams.searchParams.set("page", page);
      window.location.href = urlParams;
    },
    filter() {
      const myUrlWithParams = new URL(window.location.href.split("?")[0]);

      if (this.location)
        myUrlWithParams.searchParams.append("location", this.location);

      if (this.date) myUrlWithParams.searchParams.append("date", this.date);

      if (this.initialDate && this.finalDate) {
        myUrlWithParams.searchParams.append("initialDate", this.initialDate);
        myUrlWithParams.searchParams.append("finalDate", this.finalDate);
      }
      window.location.href = myUrlWithParams;
    },
  },
  computed: {
    pageOptions() {
      const options = [];

      if (this.$store.state.winners.numberOfPages <= 5) {
        for (let i = 1; i <= this.$store.state.winners.numberOfPages; i++) {
          options.push(i);
        }
      } else if (this.page <= 3) {
        for (let i = 1; i <= 5; i++) {
          options.push(i);
        }
      } else if (this.page >= this.$store.state.winners.numberOfPages - 2) {
        for (
          let i = this.$store.state.winners.numberOfPages - 4;
          i <= this.$store.state.winners.numberOfPages;
          i++
        ) {
          options.push(i);
        }
      } else {
        for (
          let i = this.page - 2;
          i <= this.page + 2 && options.length < 5;
          i++
        ) {
          options.push(i);
        }
      }

      return options;
    },
  },
};
</script>

<style>
.centering {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 12;
  max-width: 100%;
}
button {
  width: 100%;
}
.row {
  max-width: 100%;
}
</style>
