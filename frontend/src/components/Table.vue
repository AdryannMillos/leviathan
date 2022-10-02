<template>
    <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">location</th>
              <th scope="col">date</th>
              <th scope="col">players</th>
              <th scope="col">champion</th>
              <th scope="col">top4</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="table in localTables" :key="table.id">
              <td>{{table.location}}</td>
              <td>{{table.date}}</td>
              <td>{{table.players}}</td>
              <td>{{table.champion}}</td>
              <td>{{table.top4}}</td>
            </tr>
          </tbody>
        </table>
</template>

<script>
export default {
  name: "TableComponent",
  props: {
    tables: {
      type: Object,
    },
  },
  data() {
    return {
      localTables: null,
    };
  },
  mounted() {
    this.localTables = this.tables;
  },
};
</script>

<style>
table {
  margin-top: 50px;
}
</style>
