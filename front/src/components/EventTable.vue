<template>
  <table class="table table-striped">
    <thead>
      <tr>
        <th scope="col">Event Name</th>
        <th scope="col">Location</th>
        <th scope="col">Date</th>
        <th scope="col">Number of Players</th>
        <th scope="col">Champion</th>
        <th scope="col">Details</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="table in $store.state.tables" :key="table.id">
        <td><a :href='table.url'>{{ table.name }}</a></td>
        <td>{{ table.location }}</td>
        <td>{{ table.date }}</td>
        <td>{{ table.numberOfPlayers }}</td>
        <td><a :href='table.decks.find(item => item.position == 1).decklist'>{{ table.decks.find(item => item.position == 1).commander }}</a></td>
        <td>+</td>

      </tr>
    </tbody>
  </table>
</template>

<script>

export default {
  name: "EventTableComponent",
};
</script>

<style>
table {
  margin-top: 50px;
}
</style>
