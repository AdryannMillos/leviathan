const Models = require("../models/index");
const { QueryTypes } = require("sequelize");
const sequelize = require("sequelize");

async function execute(query) {
  if (Object.keys(query).length === 0) {
    const list = await Models.Championships.findAll();

    const listOfChampions = await Models.sequelize.query('SELECT champion, count(champion) as victorys FROM "Championships" c GROUP BY champion ORDER BY COUNT(champion) DESC LIMIT    4;', {
      type: Models.sequelize.QueryTypes.SELECT
    });
    
    return listOfChampions
  }

  const commander = query.commander ? query.commander.toLowerCase() : "";
  const date = query.date ? query.date : "";
  const location = query.location ? query.location.toLowerCase() : "";

  //  function cutDate(item){return item.date.substring(item.date.length - 4, item.date.length)}

  let list;
  let champion;
  let top4
  
  if (commander) {
    champion = await Models.Championships.findAll({
      where: {
        champion: sequelize.where(
          sequelize.fn("LOWER", sequelize.col("champion")),
          "LIKE",
          "%" + commander + "%"
        ),
      },
    });
    top4 = await Models.Championships.findAll({
      where: {
        top4: sequelize.where(
          sequelize.fn("LOWER", sequelize.col("top4")),
          "LIKE",
          "%" + commander + "%"
        ),
      },
    });

    top4 = top4.filter(
      (item) => !item.champion.toLowerCase().includes(commander)
    );

    if (date) {
      champion = champion.filter(
        (item) =>
          item.date.substring(item.date.length - 4, item.date.length) == date
      );
      top4 = top4.filter(
        (item) =>
          item.date.substring(item.date.length - 4, item.date.length) == date
      );
    }

    if (location) {
      champion = champion.filter((item) =>
        item.location.toLowerCase().includes(location)
      );
      top4 = top4.filter((item) =>
        item.location.toLowerCase().includes(location)
      );
    }
  }

  if (!commander && location && date) {
    return (list = await Models.Championships.findAll({
      where: {
        date: sequelize.where(
          sequelize.fn("LOWER", sequelize.col("date")),
          "LIKE",
          "%" + date + "%"
        ),
        location: sequelize.where(
          sequelize.fn("LOWER", sequelize.col("location")),
          "LIKE",
          "%" + location + "%"
        ),
      },
    }));
  }

  if (!commander && !date) {
    return (list = await Models.Championships.findAll({
      where: {
        location: sequelize.where(
          sequelize.fn("LOWER", sequelize.col("location")),
          "LIKE",
          "%" + location + "%"
        ),
      },
    }));
  }

  if (!commander && !location) {
    return (list = await Models.Championships.findAll({
      where: {
        date: sequelize.where(
          sequelize.fn("LOWER", sequelize.col("date")),
          "LIKE",
          "%" + date + "%"
        ),
      },
    }));
  }

  return { winner: champion, top4 };
}

module.exports = {
  execute,
};
