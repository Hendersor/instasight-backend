const { sequelize } = require("../libs/sequelize.js");
const {
  add,
  find,
  update,
  delet,
  findEmail,
} = require("../helpers/services.js");
const { claudinary } = require("../libs/claudinary.js");
const { v4: uuidv4 } = require("uuid");

class imageService {
  constructor() {
    this.models = sequelize.models.Image;
  }

  async allPosts() {
    return await this.models.findAll();
  }

  async createPost({ file, description, userId }) {
    const uploadResponse = await claudinary.uploader.upload(
      `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
      {
        folder: "instasight/posts",
        use_filename: true,
        unique_filename: true,
        resource_type: "image",
      }
    );

    return uploadResponse

  //   const post = {
  //     id: uuidv4(),  
  //     img: uploadResponse.secure_url, 
  //     user_id: userId,
  //     description,
  //     created_at: new Date(),
  //   };

  //   return await add(this.models, post);
  }

  async deletePost(id) {
    return await delet(this.models, id);
  }

  async getPost(id) {
    return await find(this.models, id);
  }

  async getPostByUserId(user_id) {
    return await this.models.findAll({ where: { user_id } });
  }
}

module.exports = { imageService };
