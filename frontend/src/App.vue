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
      <div class="col-12 col-md-9">
        <Table :tables=tables></Table>
      </div>
      <div class="col-6 col-md-3">
        <Table />
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-9">
        <Table />
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
import Navbar from "./components/Navbar.vue";
import Table from "./components/Table.vue";
import Input from "./components/Input.vue";
import Chart from "./components/Chart.vue";

import list from "./services/list";

export default {
  name: "App",
  components: {
    Navbar,
    Table,
    Input,
    Chart,
  },
  data(){
    return{
      tables: null
    }
  },
  created(){
    this.getAll()
  },
  methods:{
    getAll(){
      list.getAll().then((response)=>{
        this.tables = response.data;
      })
    }
  }
};
</script>

<style></style>
