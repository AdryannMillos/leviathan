<template>
  <div>
    <form @submit.prevent="filter">
      <div class="row centering mb-3 mt-3">
        <div class="col-8 mb-3">
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
  </div>
</template>

<script>
export default {
  name: "FormFieldComponent",
  data() {
    return {
      tables: [],
      decks: [],
      page: new URLSearchParams(window.location.search).get("page"),
    };
  },
  updated() {
    this.tables = this.$store.state.tables;
    this.decks = this.tables.map((item) => item.decks);
    this.decks = this.decks.map((item) =>
      item.find((list) => list.position == 1)
    );
  },
  methods: {
    goToPage(page) {
      const urlParams = new URL(window.location.href);
      urlParams.searchParams.set("page", page);
      window.location.href = urlParams;
    },
  },
};
</script>

<style></style>
