<template>
  <table class="table table-striped">
    <thead>
      <tr>
        <th scope="col">Event</th>
        <th scope="col">Location</th>
        <th scope="col">Date</th>
        <th scope="col">Players</th>
        <th scope="col">Champion</th>
        <th scope="col">Details</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="table in tables" :key="table.id">
        <td><a :href='table.url'>{{ table.name }}</a></td>
        <td>{{ table.location }}</td>
        <td>{{ table.date }}</td>
        <td>{{ table.numberOfPlayers }}</td>
        <td><a :href='table.decks.find(item => item.position == 1)? table.decks.find(item => item.position == 1).decklist: null'>{{ table.decks.find(item => item.position == 1) ? table.decks.find(item => item.position == 1).commander : null }}</a></td>
        <td>+</td>

      </tr>
    </tbody>
  </table>
</template>

<script>

export default {
  name: "EventTableComponent",
  data(){
    return {
    tables: [],
    decks: []
    }
  },
  updated(){
    this.tables = this.$store.state.tables
    this.decks = this.tables.map(item => item.decks);
    this.decks = this.decks.map(item=>item.find(list=>list.position == 1));
  }
};
</script>

<style>
table {
  margin-top: 50px;
}
</style>
