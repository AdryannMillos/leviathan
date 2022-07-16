const bodyParser = require("body-parser");
const schedule = require("node-schedule");
const express = require("express");
const leviathanCompareService = require("./modules/leviathanChampionships/services/leviathanCompareService");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
    "/api/v1/leviathan",
    require("./modules/leviathanChampionships/routes/api.leviathan.route")
  );

  schedule.scheduleJob("* 00 * * * *", async () => {
    console.log("Running");
    console.log(new Date().getHours());
    await leviathanCompareService.execute();
  });

module.exports = app;
