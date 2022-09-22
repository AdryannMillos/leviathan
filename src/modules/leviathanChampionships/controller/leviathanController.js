const leviathanCompareService = require("../services/leviathanCompareService");
const leviathanFilterService = require("../services/leviathanFilterService");

async function compare(req, res) {
  try {

    await leviathanCompareService.execute();
    return res.status(200);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function filter(req, res) {
  try {
    const filtered = await leviathanFilterService.execute(req.query);
    return res.status(200).json(filtered);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
compare,
filter
};
