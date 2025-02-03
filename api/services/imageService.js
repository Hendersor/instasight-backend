const {sequelize} =  require("../libs/sequelize.js")

class imageService {
  constructor() {
    this.models = sequelize.models.Image
  }

  async allPosts() {
    return await this.models.findAll();
  }

  async createPost(data) {
    return await this.models.create(data);
  }

  async deletePost(id) {
    return await this.models.destroy({where: {id}});
  }

  async getPost(id) {
    return await this.models.findOne({where: {id}});
  }

  async getPostByUserId(user_id) {
    return await this.models.findAll({where: {user_id}});
  }
}

module.exports = { imageService };
