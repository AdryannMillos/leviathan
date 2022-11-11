<template>
  <table class="table table-striped">
    <thead>
      <tr>       
        <th scope="col">Commander</th>
        <th scope="col">Position</th>
        <th scope="col">Event</th>
        <th scope="col">Date</th>
        <th scope="col">Players</th>
        <th scope="col">Details</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="table in $store.state.tables" :key="table.id">
        <td><a :href='table.decklist'>{{table.commander}}</a></td>
        <td>{{table.position}}</td>
        <td><a :href='table.event.url'>{{ table.event.name }}</a></td>
        <td>{{ table.event.date }}</td>
        <td>{{ table.event.numberOfPlayers }}</td>
        <td>+</td>
      </tr>
    </tbody>
  </table>
</template>

<script>

export default {
  name: "DeckTableComponent",
};
</script>

<style>
table {
  margin-top: 50px;
}
</style>
