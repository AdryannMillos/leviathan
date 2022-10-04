<template>
  <div>
    <Navbar />
    <form action="">
      <div class="row">
        <div class="col-md-8">
          <Input />
        </div>
        <div class="col-md-8">
          <Input />
        </div>
        <div class="col-md-8">
          <Input />
        </div>
      </div>
    </form>
    <div class="row">
      <div v-show="$store.state.tables" class="col-12 col-md-9">
        <Table :tables="$store.state.tables"/>
      </div>
      <div v-show="$store.state.tableWinner" class="col-12 col-md-9">
        <Table :tables="$store.state.tableWinner"/>
      </div>
      <div class="col-6 col-md-3">
        <Table />
      </div>
    </div>
    <div v-show="$store.state.tableTop4" class="row">
      <div class="col-12 col-md-9">
        <Table :tables="$store.state.tableTop4"></Table>
      </div>
      <div class="col-6 col-md-3">
        <Table />
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-6">
        <Chart />
      </div>
      <div class="col-12 col-md-6">
        <Chart />
      </div>
    </div>
  </div>
</template>

<script>

import Navbar from "../components/Navbar.vue";
import Table from "../components/Table.vue";
import Input from "../components/Input.vue";
import Chart from "../components/Chart.vue";


export default {
  name: "HomeView",
  components: {
    Navbar,
    Table,
    Input,
    Chart,
},

created(){
  this.$store.dispatch('queryList')
}
};
</script>

<style></style>
