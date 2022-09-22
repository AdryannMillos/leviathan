const countChampionshipsService = require('./countChampionshipsService')
const runBotService = require('./runBotService')



async function execute(){
    const count = await countChampionshipsService.execute();
    console.log(count)
    if(count == true){
        runBotService.execute();
    }
}

module.exports = {
    execute,
}