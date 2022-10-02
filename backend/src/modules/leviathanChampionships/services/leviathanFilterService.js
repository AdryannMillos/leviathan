const Models = require("../../../models/index");
const { QueryTypes } = require('sequelize');
const sequelize = require('sequelize');

async function execute(query){
    if(Object.keys(query).length === 0){
      return await Models.Championships.findAll();
    }
    const commander = query.commander ? query.commander.toLowerCase() : ''
    const date = query.date ? query.date : ''
    const location = query.location ? query.location.toLowerCase() : ''
    
    let champion = await Models.Championships.findAll({
        where:{
                champion: sequelize.where(sequelize.fn('LOWER', sequelize.col('champion')), 'LIKE', '%' + commander + '%')
        }
        });
    let top4 = await Models.Championships.findAll({
        where:{
                top4: sequelize.where(sequelize.fn('LOWER', sequelize.col('top4')), 'LIKE', '%' + commander + '%')
        }
        });
       top4 = top4.filter(item => !item.champion.toLowerCase().includes(commander))

    if(date){
      champion = champion.filter(item => item.date.substring(item.date.length-4,item.date.length) == date)
      top4 = top4.filter(item => item.date.substring(item.date.length-4,item.date.length) == date)
    }
    if(location){
        champion = champion.filter(item => item.location.toLowerCase().includes(location))
        top4 = top4.filter(item => item.location.toLowerCase().includes(location))
    }
    return {winner:champion, top4}
}

module.exports = {
    execute,
}