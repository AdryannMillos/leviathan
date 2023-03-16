<template>
  <div>
    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Event</th>
            <th scope="col">Location</th>
            <th scope="col">Date</th>
            <th scope="col">Players</th>
            <th scope="col">Champion</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="table in $store.state.events.events" :key="table.id">
            <td>
              <a target="_blank" :href="table.url">{{ table.name }}</a>
            </td>
            <td>{{ table.location }}</td>
            <td>{{ table.date }}</td>
            <td>{{ table.numberOfPlayers }}</td>
            <td>
              <a
                target="_blank"
                :href="
                  table.decks.find((item) => item.position == 1)
                    ? table.decks.find((item) => item.position == 1).decklist
                    : null
                "
                >{{
                  table.decks.find((item) => item.position == 1)
                    ? table.decks.find((item) => item.position == 1).commander
                    : null
                }}</a
              >
            </td>
          </tr>
        </tbody>
        <tfoot></tfoot>
      </table>
    </div>
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li v-if="page > 1" class="page-item">
          <a class="page-link" href="#" aria-label="Previous" @click="goToPage(Number(page)-1)">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li v-for="page in pageOptions" :key="page" class="page-item">
          <a class="page-link" href="#" @click="goToPage(page)">{{ page }}</a>
        </li>

        <li v-if="page < $store.state.events.numberOfPages" class="page-item">
          <a class="page-link" href="#" aria-label="Next" @click="goToPage(Number(page)+1)">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
    <!-- <ul class="pagination justify-content-center">
      <li v-if="page > 1" @click="goToPage(page - 1)"><a>&laquo;</a></li>
      <li
        v-for="page in $store.state.events.numberOfPages"
        :key="page"
        :class="{ active: page === page }"
        @click="goToPage(page)"
      >
        <a>{{ page }}</a>
      </li>
      <li v-if="page < $store.state.events.numberOfPages" @click="goToPage(page + 1)">
        <a>&raquo;</a>
      </li> -->
    <!-- <li class="page-item">
        <button class="page-link" @click="goToPage(Number(1))">
          {{ Number(1) }}
        </button>
      </li>
      <li class="page-item">
        <button class="page-link" @click="goToPage(Number(1) + 1)">
          {{ Number(1) + 1 }}
        </button>
      </li>
      <li class="page-item">
        <button class="page-link" @click="goToPage(Number(3))">
          {{ Number(3) }}
        </button>
      </li>
      <li class="page-item">
        <button class="page-link" @click="goToPage(Number(page) + 1)">
          <span aria-hidden="true">&raquo; </span>
        </button>
      </li>
      <li class="page-item">
        <button
          class="page-link"
          @click="goToPage(Number($store.state.numberOfPages))"
        >
          {{ $store.state.numberOfPages }}
        </button>
      </li> -->
    <!-- </ul> -->
  </div>
</template>

<script>
export default {
  name: "EventTableComponent",
  data() {
    return {
      page: new URLSearchParams(window.location.search).get("page"),
    };
  },
  // mounted() {
  //   this.tables = [...this.$store.state.events];
  // },
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

      if (this.$store.state.events.numberOfPages <= 5) {
        for (let i = 1; i <= this.$store.state.events.numberOfPages; i++) {
          options.push(i);
        }
      } else if (this.page <= 3) {
        for (let i = 1; i <= 5; i++) {
          options.push(i);
        }
      } else if (this.page >= this.$store.state.events.numberOfPages - 2) {
        for (
          let i = this.$store.state.events.numberOfPages - 4;
          i <= this.$store.state.events.numberOfPages;
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
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination li {
  display: inline-block;
  margin: 0 5px;
}

.pagination li a {
  display: block;
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

.pagination li.active a {
  background-color: #007bff;
  color: #fff;
  border-color: #007bff;
}
</style>
