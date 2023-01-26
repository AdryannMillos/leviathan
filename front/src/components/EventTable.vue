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
          <tr v-for="table in tables" :key="table.id">
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
    <ul
      class="pagination justify-content-center"
      v-if="(page == 1 || !page) && page !== $store.state.numberOfPages"
    >
      <li class="page-item">
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
      </li>
    </ul>
    <ul
      class="pagination justify-content-center"
      v-if="page && page != 1 && page != $store.state.numberOfPages"
    >
      <li v-if="page != 2" class="page-item">
        <button class="page-link" @click="goToPage(1)">{{ 1 }}</button>
      </li>
      <li v-if="page != 2" class="page-item">
        <button class="page-link" @click="goToPage(Number(page) - 1)">
          <span aria-hidden="true">&laquo;</span>
        </button>
      </li>
      <li class="page-item">
        <button class="page-link" @click="goToPage(Number(page) - 1)">
          {{ Number(page) - 1 }}
        </button>
      </li>
      <li class="page-item">
        <button class="page-link" @click="goToPage(Number(page))">
          {{ Number(page) }}
        </button>
      </li>
      <li class="page-item">
        <button class="page-link" @click="goToPage(Number(page) + 1)">
          {{ Number(page) + 1 }}
        </button>
      </li>
      <li class="page-item">
        <button class="page-link" @click="goToPage(Number(page) + 1)">
          <span aria-hidden="true">&raquo;</span>
        </button>
      </li>
      <li class="page-item">
        <button
          class="page-link"
          @click="goToPage(Number($store.state.numberOfPages))"
        >
          {{ $store.state.numberOfPages }}
        </button>
      </li>
    </ul>

    <ul
      class="pagination justify-content-center"
      v-if="page == $store.state.numberOfPages"
    >
      <li v-if="page != 2" class="page-item">
        <button class="page-link" @click="goToPage(1)">{{ 1 }}</button>
      </li>
      <li v-if="page != 2" class="page-item">
        <button class="page-link" @click="goToPage(Number(page) - 1)">
          <span aria-hidden="true">&laquo;</span>
        </button>
      </li>
      <li class="page-item">
        <button class="page-link" @click="goToPage(Number(page) - 2)">
          {{ Number(page) - 2 }}
        </button>
      </li>
      <li class="page-item">
        <button class="page-link" @click="goToPage(Number(page) - 1)">
          {{ Number(page) - 1 }}
        </button>
      </li>
      <li class="page-item">
        <button class="page-link" @click="goToPage(Number(page))">
          {{ Number(page) }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "EventTableComponent",
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
