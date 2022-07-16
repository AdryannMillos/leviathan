const countChampionshipsService = require('./countChampionshipsService')
const runBotService = require('./runBotService')



async function execute(){
    const count = countChampionshipsService.execute();
    if(count == true){
        runBotService.execute();
    }
}

module.exports = {
    execute,
}