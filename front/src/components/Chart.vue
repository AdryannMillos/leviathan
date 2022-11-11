<template>
  <div class="chart">
    <h4>{{ top4 == true ? "Top 10 decks at top 4" : "Top 10 most winner decks"}}</h4>
    <GChart type="PieChart" :options="options" :data="data" />
  </div>
</template>

<script>
import { GChart } from "vue-google-charts";
export default {
  name: "App",
  props: ["info", "top4"],
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
    let top10Decks = this.info
    top10Decks = top10Decks.slice(0,10)

    let otherDecks =this.info
    otherDecks = otherDecks.slice(10,otherDecks.length)

    let otherDecksOccurrence = otherDecks.reduce((prev, next) => prev += Number(next.occurrence), 0)

    top10Decks.map((item) =>
      this.data.push([item.commander, Number(item.occurrence)])
    );
    this.data.push(["others", otherDecksOccurrence])
  },
};
</script>
