import {sequelize} from "../libs/sequelize.js"

class imageService {
  constructor() {
    this.models = sequelize.models.Image
  }

  async allPosts() {
    return await this.models.findAll();
  }

  async createPost(data) {
    console.log(data)
    return await this.models.create(data);
  }

  async deletePost(id) {
    console.log(id)
    return await this.models.destroy({where: {id}});
  }
}

export { imageService };
