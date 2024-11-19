import { Image, ImageModel } from "./imageModels.js";
import {User, UserModel} from "./userModels.js";
import {Comment, CommentModel} from "./commentModels.js";


function setupModels(sequelize){
    Image.init(ImageModel, Image.config(sequelize));
    User.init(UserModel, User.config(sequelize));
    Comment.init(CommentModel, Comment.config(sequelize));

    Image.associate(sequelize.models)
    User.associate(sequelize.models)
    Comment.associate(sequelize.models)
}

export {setupModels}