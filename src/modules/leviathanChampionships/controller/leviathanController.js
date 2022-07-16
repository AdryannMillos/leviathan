const leviathanCompareService = require("../services/leviathanCompareService");

async function compare(req, res) {
  try {

    await leviathanCompareService.execute();
    return res.status(200);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
compare
};
