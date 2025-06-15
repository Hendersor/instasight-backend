const { sequelize } = require("../libs/sequelize.js");
const {add, find, update, delet, findEmail } = require("../helpers/services.js");
const bcrypt = require("bcrypt");
const cloudinary = require('cloudinary')


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


  async updateUser(id, { bio, file }) {
        const updateData = {};

    if (bio) {
      updateData.bio = bio;
    }

    if (file) {
      const uploadResponse = await cloudinary.uploader.upload(
        `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
        {
          folder: "instasight",
          use_filename: true,
          unique_filename: true,
          resource_type: "image",
        }
      );

      updateData.profile_picture = uploadResponse.secure_url;
    }

    return await update(this.models, id, updateData);
  
  }

  async deleteUser(id) {
    return await delet(this.models, id);
  }
}

module.exports = {userService};
