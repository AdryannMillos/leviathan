<template>
  <div class="chart">
    <h4>Vue Js Google Pie Chart Demo</h4>
    <GChart type="PieChart" :options="options" :data="data" />
  </div>
</template>

<script>
import { GChart } from "vue-google-charts";
export default {
  name: "App",
  props: ["info"],
  components: {
    GChart,
  },
  data() {
    return {
      data: [["Commander", "Occurrence"]],
      options: {
        width: 700,
        height: 450,
      },
    };
  },
  updated() {
    this.info.map((item) =>
      this.data.push([item.commander, Number(item.occurrence)])
    );
    console.log(this.data);
  },
};
</script>
