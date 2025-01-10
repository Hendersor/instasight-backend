const { Image, ImageModel } = require("./imageModels.js");
const { User, UserModel } = require("./userModels.js");
const { Comment, CommentModel } = require("./commentModels.js");
const { Bookmark, BookmarkModel } = require("./bookmarkModels.js");

function setupModels(sequelize) {
    Image.init(ImageModel, Image.config(sequelize));
    User.init(UserModel, User.config(sequelize));
    Comment.init(CommentModel, Comment.config(sequelize));
    Bookmark.init(BookmarkModel, Bookmark.config(sequelize));

    Image.associate(sequelize.models);
    User.associate(sequelize.models);
    Comment.associate(sequelize.models);
    Bookmark.associate(sequelize.models);
}

module.exports = { setupModels };
