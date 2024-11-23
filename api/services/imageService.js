import {sequelize} from "../libs/sequelize.js"

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
}

export { imageService };
