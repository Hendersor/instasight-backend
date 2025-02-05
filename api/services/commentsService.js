const { sequelize } = require("../libs/sequelize.js");

class commentService{
    constructor(){
        this.models = sequelize.models.Comment
    }

    async commentsByImage(photo_id){
        return await this.models.findAll({
            where: {photo_id},
            attributes: ['id','content', 'created_at'],
            include: [
                {
                    model: sequelize.models.User,
                    association: 'user',
                    attributes: ['id', 'username'],
                },
            ],
        });
    }

    async createComment(data){
        return await this.models.create(data)
    }    
}

module.exports = {commentService}