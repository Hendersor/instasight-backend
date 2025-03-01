const { sequelize } = require("../libs/sequelize.js");
const {add, find, delet} = require('../helpers/services.js');

class bookmarksService {
  constructor() {
    this.models = sequelize.models.Bookmark;
  }

  async deleteBookmark(id) {
    return await delet(this.models, id);
  }

  async createBookmark(data) {
    
    const { image_id } = data;
    const image = await find(sequelize.models.Image, image_id);
    if (!image) {
      throw new Error("Invalid image ID: image does not exist!");
    }

    return await add(this.models, data);
  }

  async findByUser(userId) {
    const bookmarks = await this.models.findAll({
      where: {
        user_id: userId, 
      },
      include: [
        {
          association: 'user', 
        },
        {
          association: 'image', 
        },
      ],
    });
    return bookmarks; 
  }

  async allBookmarks() {
    return await this.models.findAll();
  }

  async bookmarksByUser(userId) {
    return await this.models.findAll({
      where: {
        user_id: userId,
      },
    });
  }
 
}

module.exports = { bookmarksService };
