const { sequelize } = require("../libs/sequelize.js");

class FollowUserService{
    constructor(){
        this.models = sequelize.models.Follow;
    }


    async followUser(followerId, followingId) {
    const follow = await this.models.create({ followerId, followingId });
    return follow;
  }

  async getFollowers(userId){
    const followers = await this.models.findAll({
      where: {followingId: userId},
      include: [
        {
          model: sequelize.models.User,
          as: 'follower',
          attributes: ['id', 'username']
        }
      ]})
    return followers.map(follower => follower.follower);
  }

  async getFollowing(userId){
    const following = await this.models.findAll({
      where: {followerId: userId},
      include:[
        {
          model: sequelize.models.User,
          as: 'following',
          attributes: ['id', 'username']
        }
      ]
    })
    return following.map(follow => follow.following);
  }
}

module.exports = {FollowUserService};