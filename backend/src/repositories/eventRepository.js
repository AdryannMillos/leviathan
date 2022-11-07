const Models = require("../models/index");

const getAllEventsPaginated = async (limit, skip) => {
  const paginatedEvents = await Models.Event.findAll({
    include: ["decks"],
    limit: limit,
    offset: skip,
    order: [["id", "ASC"]],
  });

  const totalEvents = await Models.Event.count();

  return {eventsInPage:paginatedEvents, total:totalEvents};
};

async function getMostWinnerDecks(location, date) {
  if (!location && !date) {
    return await Models.sequelize.query(
      `SELECT d."commander", COUNT(d."commander") AS "occurrence" FROM "Decks" as d inner JOIN "Events" as e on  e."id" =  d."eventId" and "position" = '1' GROUP BY "commander" ORDER BY "occurrence" DESC;`,
      {
        type: Models.sequelize.QueryTypes.SELECT,
      }
    );
  }

  if (location && !date) {
    return await Models.sequelize.query(
     `SELECT d."commander", COUNT(d."commander") AS "occurrence" FROM "Decks" as d inner JOIN "Events" as e on  e."id" =  d."eventId" and e."location" like '%${location}%' and "position" = '1'  GROUP BY "commander" ORDER BY "occurrence" DESC;`,
      {
        type: Models.sequelize.QueryTypes.SELECT,
      }
    );
  }
  if (!location && date) {
    return await Models.sequelize.query(
      `SELECT d."commander", COUNT(d."commander") AS "occurrence" FROM "Decks" as d inner JOIN "Events" as e on  e."id" =  d."eventId" and  e."date" like '%${date}%' and "position" = '1' GROUP BY "commander" ORDER BY "occurrence" DESC;`,
      {
        type: Models.sequelize.QueryTypes.SELECT,
      }
    );
  }
  if (location && date) {
   return await Models.sequelize.query(
      `SELECT d."commander", COUNT(d."commander") AS "occurrence" FROM "Decks" as d inner JOIN "Events" as e on  e."id" =  d."eventId" and  e."date" like '%${date}%' and e."location" like '%${location}%' and "position" = '1'  GROUP BY "commander" ORDER BY "occurrence" DESC;`,
      {
        type: Models.sequelize.QueryTypes.SELECT,
      }
    );
  }
}

async function getMostTop4Decks(location, date) {
  if (!location && !date) {
    return await Models.sequelize.query(
      `SELECT d."commander", COUNT(d."commander") AS "occurrence" FROM "Decks" as d inner JOIN "Events" as e on  e."id" =  d."eventId" and ("position" = '1' or "position" = '2' or "position" = '3' or "position" = '4')  GROUP BY "commander" ORDER BY "occurrence" DESC;`,
      {
        type: Models.sequelize.QueryTypes.SELECT,
      }
    );
  }

  if (location && !date) {
    return await Models.sequelize.query(
     `SELECT d."commander", COUNT(d."commander") AS "occurrence" FROM "Decks" as d inner JOIN "Events" as e on  e."id" =  d."eventId" and e."location" like '%${location}%' and ("position" = '1' or "position" = '2' or "position" = '3' or "position" = '4')  GROUP BY "commander" ORDER BY "occurrence" DESC;`,
      {
        type: Models.sequelize.QueryTypes.SELECT,
      }
    );
  }
  if (!location && date) {
    return await Models.sequelize.query(
      `SELECT d."commander", COUNT(d."commander") AS "occurrence" FROM "Decks" as d inner JOIN "Events" as e on  e."id" =  d."eventId" and  e."date" like '%${date}%' and ("position" = '1' or "position" = '2' or "position" = '3' or "position" = '4')  GROUP BY "commander" ORDER BY "occurrence" DESC;`,
      {
        type: Models.sequelize.QueryTypes.SELECT,
      }
    );
  }
  if (location && date) {
   return await Models.sequelize.query(
      `SELECT d."commander", COUNT(d."commander") AS "occurrence" FROM "Decks" as d inner JOIN "Events" as e on  e."id" =  d."eventId" and  e."date" like '%${date}%' and e."location" like '%${location}%' and ("position" = '1' or "position" = '2' or "position" = '3' or "position" = '4')  GROUP BY "commander" ORDER BY "occurrence" DESC;`,
      {
        type: Models.sequelize.QueryTypes.SELECT,
      }
    );
  }
}

async function getMostPlayedDecks(location, date) {
  if (!location && !date) {
    return await Models.sequelize.query(
      'SELECT "commander", COUNT("commander") AS "occurrence" FROM "Decks" GROUP BY "commander" ORDER BY "occurrence" DESC;',
      {
        type: Models.sequelize.QueryTypes.SELECT,
      }
    );
  }

  if (location && !date) {
    return await Models.sequelize.query(
     `SELECT d."commander", COUNT(d."commander") AS "occurrence"  FROM "Decks" as d inner JOIN "Events" as e on  e."id" =  d."eventId" and  e."location" like '%${location}%' GROUP BY d."commander" ORDER BY "occurrence" DESC;`,
      {
        type: Models.sequelize.QueryTypes.SELECT,
      }
    );
  }
  if (!location && date) {
    return await Models.sequelize.query(
      `SELECT d."commander", COUNT(d."commander") AS "occurrence"  FROM "Decks" as d inner JOIN "Events" as e on  e."id" =  d."eventId" and  e."date" like '%${date}%' GROUP BY d."commander" ORDER BY "occurrence" DESC;`,
      {
        type: Models.sequelize.QueryTypes.SELECT,
      }
    );
  }
  if (location && date) {
   return await Models.sequelize.query(
      `	SELECT d."commander", COUNT(d."commander") AS "occurrence"  FROM "Decks" as d inner JOIN "Events" as e on  e."id" =  d."eventId" and  e."date" like '%${date}%' and e."location" like '%${location}%' GROUP BY d."commander" ORDER BY "occurrence" DESC;`,
      {
        type: Models.sequelize.QueryTypes.SELECT,
      }
    );
  }
}
module.exports = {
  getAllEventsPaginated,
  getMostPlayedDecks,
  getMostTop4Decks,
  getMostWinnerDecks
};
