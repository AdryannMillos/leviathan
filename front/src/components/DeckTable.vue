<template>
  <div>
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
        <tr v-for="table in $store.state.tables" :key="table.id">
          <td>
            <a :href="table.decklist">{{ table.commander }}</a>
          </td>
          <td>{{ table.position }}</td>
          <td>
            <a :href="table.event.url">{{ table.event.name }}</a>
          </td>
          <td>{{ table.event.date }}</td>
          <td>{{ table.event.numberOfPlayers }}</td>
          <td>+</td>
        </tr>
      </tbody>
    </table>
    <ul class="pagination justify-content-center" v-if="page == 1 || !page">
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
          <span aria-hidden="true">&raquo;</span>
        </button>
      </li>
      <li class="page-item">
        <button class="page-link" @click="goToPage(Number(page) + 1)">
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
      <li class="page-item" v-if="!(page == ($store.state.numberOfPages-1))">
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
};
</script>

<style>
table {
  margin-top: 50px;
}
</style>
