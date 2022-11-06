const Models = require("../models/index");

const findAll = async () => await Models.Event.findAll();
const noParamsQuery = async (limit, skip) => {

 const events = await Models.Event.findAll({
  include: ["decks"],
  limit: limit,
  offset: skip,
  order: [["id", "ASC"]]})

 const mostPayed = await Models.sequelize.query('SELECT "commander", COUNT("commander") AS "occurrence" FROM "Decks" GROUP BY "commander" ORDER BY "occurrence" DESC;', {
      type: Models.sequelize.QueryTypes.SELECT
    });

  const mostWinner = await Models.sequelize.query(`SELECT "commander", COUNT("commander") AS "wins" FROM "Decks" Where ("position" = '1') GROUP BY "commander" ORDER BY "wins" DESC;`, {
    type: Models.sequelize.QueryTypes.SELECT
  });

  const mostTop4 = await Models.sequelize.query(`SELECT "commander", COUNT("commander") AS "top4" FROM "Decks" Where "position" = '1' or "position" = '2' or "position" = '3' or "position" = '4'  GROUP BY "commander" ORDER BY "top4" DESC;`, {
    type: Models.sequelize.QueryTypes.SELECT
  });

 return events

}
module.exports = {
  findAll,
  noParamsQuery
};
