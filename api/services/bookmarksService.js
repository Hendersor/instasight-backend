import { sequelize } from "../libs/sequelize.js";

class bookmarksService {
  constructor() {
    this.models = sequelize.models.Bookmark
  }

  async deleteBookmark(id) {
    return await this.models.destroy({where: {id}});
  }

  async createBookmark(data) {
    const {user_id, image_id} = data;

    const user = await sequelize.models.User.findByPk(user_id)
    if(!user){
      throw new Error("Invalid user ID: User does not exist!");
    }

    const image = await sequelize.models.Image.findByPk(image_id)
    if(!image){
      throw new Error("Invalid image ID: image does not exist!");
    }


    return await this.models.create(data)
  }

  async allBookmarks() {
    return await this.models.findAll();
  }
}

export { bookmarksService };
