const { sequelize } = require("../libs/sequelize.js");

class commentService{
    constructor(){
        this.models = sequelize.models.Comment
    }

    async allComments(){
        try{
            return await this.models.findAll();
        }catch(error){
            console.log(error)
        }
    }

    async createComment(data){
        return await this.models.create(data)
    }    
}

module.exports = {commentService}