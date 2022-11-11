const Models = require("../models/index");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const findAll = async () => Models.Event.findAll();
const getAllEventsPaginated = async (limit, skip, location, date) => {
  let paginatedEvents;
  if (!location && !date) {
    paginatedEvents = await Models.Event.findAll({
      include: ["decks"],
      limit: limit,
      offset: skip,
      order: [["id", "ASC"]],
    });
  }
  if (!location && date) {
    paginatedEvents = await Models.Event.findAll({
      where: { date: { [Op.like]: `%${date}%` } },
      include: ["decks"],
      limit: limit,
      offset: skip,
      order: [["id", "ASC"]],
    });
  }
  if (location && !date) {
    paginatedEvents = await Models.Event.findAll({
      where: { location: { [Op.like]: `%${location}%` } },
      include: ["decks"],
      limit: limit,
      offset: skip,
      order: [["id", "ASC"]],
    });
  }
  if (location && date) {
    paginatedEvents = await Models.Event.findAll({
      where: {
        location: { [Op.like]: `%${location}%` },
        date: { [Op.like]: `%${date}%` },
      },
      include: ["decks"],
      limit: limit,
      offset: skip,
      order: [["id", "ASC"]],
    });
  }

  const totalEvents = await Models.Event.count();

  return { inPage: paginatedEvents, total: totalEvents };
};
const getCommanderPaginated = async (
  limit,
  skip,
  location,
  date,
  commander
) => {
  let paginatedDecks;
  if (!location && !date) {
    paginatedDecks = await Models.Deck.findAll({
      where: { commander: { [Op.like]: `%${commander}%` } },
      include: ["event"],
      limit: limit,
      offset: skip,
      order: [["id", "ASC"]],
    });
  }
  if (!location && date) {
    paginatedDecks = await Models.Deck.findAll({
      where: {
        commander: { [Op.like]: `%${commander}%` },
        "$event.date$": { [Op.like]: `%${date}%` },
      },
      include: ["event"],
      limit: limit,
      offset: skip,
      order: [["id", "ASC"]],
    });
  }
  if (location && !date) {
    paginatedDecks = await Models.Deck.findAll({
      where: {
        commander: { [Op.like]: `%${commander}%` },
        "$event.location$": { [Op.like]: `%${location}%` },
      },
      include: ["event"],
      limit: limit,
      offset: skip,
      order: [["id", "ASC"]],
    });
  }
  if (location && date) {
    paginatedDecks = await Models.Deck.findAll({
      where: {
        commander: { [Op.like]: `%${commander}%` },
        "$event.date$": { [Op.like]: `%${date}%` },
        "$event.location$": { [Op.like]: `%${location}%` },
      },
      include: ["event"],
      limit: limit,
      offset: skip,
      order: [["id", "ASC"]],
    });
  }

  const totalDecks = await Models.Deck.count();

  return { inPage: paginatedDecks, total: totalDecks };
};

async function getMostWinnerDecks(location, date) {
  if (!location && !date) {
    return await Models.sequelize.query(
      `SELECT d."commander", COUNT(d."commander") AS "occurrence" FROM "Decks" as d inner JOIN "Events" as e on  e."id" =  d."eventId" and "position" = '1' GROUP BY "commander" ORDER BY "occurrence" DESC;`,
      {
        type: Models.sequelize.QueryTypes.SELECT,
      },
      { where: { id: "1" } }
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
  getMostWinnerDecks,
  findAll,
  getCommanderPaginated,
};
