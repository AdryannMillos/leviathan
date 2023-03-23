<template>
  <table class="table table-striped">
    <thead>
      <tr>
        <th scope="col">Commander</th>
        <th scope="col">Frequency</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for=" table in !info ? $store.state.played.played : info" :key="table.id">
        <td>{{ table.commander }}</td>
        <td>{{ table.occurrence }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>

export default {
  name: "FrequencyTableComponent",
  props: ["info"],
};
</script>

<style>
table {
  margin-top: 50px;
}
</style>
