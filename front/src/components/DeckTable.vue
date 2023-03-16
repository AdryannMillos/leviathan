<template>
  <div>
    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Commander</th>
            <th scope="col">Position</th>
            <th scope="col">Event</th>
            <th scope="col">Date</th>
            <th scope="col">Players</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="table in $store.state.commanders?.commanders"
            :key="table.id"
          >
            <td>
              <a target="_blank" :href="table.decklist">{{
                table.commander
              }}</a>
            </td>
            <td>{{ table.position }}</td>
            <td>
              <a :href="table.event.url">{{ table.event.name }}</a>
            </td>
            <td>{{ table.event.date }}</td>
            <td>{{ table.event.numberOfPlayers }}</td>
          </tr>
        </tbody>
      </table>
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

        <li v-if="page < $store.state.commanders.numberOfPages" class="page-item">
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
export default {
  name: "DeckTableComponent",
  data() {
    return {
      page: new URLSearchParams(window.location.search).get("page"),
    };
  },
  methods: {
    goToPage(page) {
      const urlParams = new URL(window.location.href);
      urlParams.searchParams.set("page", page);
      window.location.href = urlParams;
    },
  },
  computed: {
    pageOptions() {
      const options = [];

      if (this.$store.state.commanders.numberOfPages <= 5) {
        for (let i = 1; i <= this.$store.state.commanders.numberOfPages; i++) {
          options.push(i);
        }
      } else if (this.page <= 3) {
        for (let i = 1; i <= 5; i++) {
          options.push(i);
        }
      } else if (this.page >= this.$store.state.commanders.numberOfPages - 2) {
        for (
          let i = this.$store.state.commanders.numberOfPages - 4;
          i <= this.$store.state.commanders.numberOfPages;
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

<style></style>
