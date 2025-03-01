const {sequelize} =  require("../libs/sequelize.js")
const {add, find, update, delet, findEmail} = require("../helpers/services.js");

class imageService {
  constructor() {
    this.models = sequelize.models.Image
  }

  async allPosts() {
    return await this.models.findAll();
  }

  async createPost(data) {
    return await add(this.models, data);
  }

  async deletePost(id) {
    return await delet(this.models, id);
  }

  async getPost(id) {
    return await find(this.models, id);
  }

  async getPostByUserId(user_id) {
    return await this.models.findAll({where: {user_id}});
  }

}

module.exports = { imageService };
