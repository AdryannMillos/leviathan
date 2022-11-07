const eventRepository = require("../repositories/eventRepository");

async function execute(query, limit, skip) {
  const commander = query.commander
    ? query.commander[0].toUpperCase() +
      query.commander.substring(1).toLowerCase()
    : null;

  const date = query.date ? query.date : null;

  const location = query.location
    ? query.location[0].toUpperCase() +
      query.location.substring(1).toLowerCase()
    : null;

 const paginated = await eventRepository.getAllEventsPaginated(limit, skip);
 const mostPlayedDecks = await eventRepository.getMostPlayedDecks(location, date);
 const mostTop4Decks = await eventRepository.getMostTop4Decks(location, date);
 const mostWinnerDecks = await eventRepository.getMostWinnerDecks(location, date);

 return {paginated, mostPlayedDecks, mostTop4Decks, mostWinnerDecks}
}

module.exports = {
  execute,
};
