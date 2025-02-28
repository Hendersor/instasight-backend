const {sequelize} =  require("../libs/sequelize.js")

class LikeService{
    constructor(){
        this.models = sequelize.models.Like
    }

    async toggleLike(image_id, user_id){
        const existingLike = await this.models.findOne({where: {user_id, image_id}});
        if(existingLike){
            await this.models.destroy({where: {user_id, image_id}});
        }else{
            await this.models.create({user_id, image_id});
            return {liked: true};
        }
    }
}

module.exports = {LikeService};