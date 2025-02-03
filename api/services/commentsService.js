const { sequelize } = require("../libs/sequelize.js");

class commentService{
    constructor(){
        this.models = sequelize.models.Comment
    }

    async commentsByImage(photo_id){
        try{
            return await this.models.findAll({where: {photo_id: photo_id}});
        }catch(error){
            console.log(error)
        }
    }

    async createComment(data){
        return await this.models.create(data)
    }    
}

module.exports = {commentService}