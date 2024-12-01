import { sequelize } from "../libs/sequelize.js";

class bookmarksService {
  constructor() {
    this.models = sequelize.models.Bookmark
  }

  async deleteBookmark(id) {
    return await this.models.destroy({where: {id}});
  }

  async createBookmark(data) {
    return await this.models.create(data)
  }

  async allBookmarks() {
    return await this.models.findAll();
  }
}

export { bookmarksService };
