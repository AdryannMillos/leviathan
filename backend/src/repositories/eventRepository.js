const Models = require("../models/index");

const findAll = async () => await Models.Event.findAll();

module.exports = {
  findAll,
};
