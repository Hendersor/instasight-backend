const { sequelize } = require("../libs/sequelize.js");
const {add, find, update, delet, findEmail } = require("../helpers/services.js");
const bcrypt = require("bcrypt");


class userService {
  constructor() {
    this.models = sequelize.models.User;
  }

  async allUsers() {
    return await this.models.findAll();
  }

  async findUser(id) {
    return await find(this.models, id);
  }

  async findByEmail(email) {
    const rta = await findEmail(this.models, email);
    return rta
  }  

  async createUser(data) {
    const hash = await bcrypt.hash(data.password, 10);
    const newUser = await add(this.models, { ...data, password: hash });
    delete newUser.dataValues.password;
    return newUser
  }

  async updateUser(id, body) {
    return await update(this.models, id, body);
  }

  async deleteUser(id) {
    return await delet(this.models, id);
  }


  async followUser(followerId, followingId) {
    const Follow = sequelize.models.Follow;
    const follow = await Follow.create({ followerId, followingId });
    return follow;
  }

  async getFollowers(userId){
    const followers = await this.models.findAll({
      where: {followingId: userId},
      include: [
        {
          model: this.models,
          as: 'follower',
          attributes: ['id', 'name']
        }
      ]})
    return followers.map(follower => follower.follower);
  }

  async getFollowing(userId){
    const following = await this.models.findAll({
      where: {followerId: userId},
      include:[
        {
          model: this.models,
          as: 'following',
          attributes: ['id', 'name']
        }
      ]
    })
    return following.map(follow => follow.following);
  }
}

module.exports = {userService};
