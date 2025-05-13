const { Image, ImageModel } = require("./imageModels.js");
const { User, UserModel } = require("./userModels.js");
const { Comment, CommentModel } = require("./commentModels.js");
const { Bookmark, BookmarkModel } = require("./bookmarkModels.js");
const { Like, LikeModel } = require("./likeModels.js");
const { Follow, FollowModel } = require("./followModels.js");

function setupModels(sequelize) {
    Image.init(ImageModel, Image.config(sequelize));
    User.init(UserModel, User.config(sequelize));
    Comment.init(CommentModel, Comment.config(sequelize));
    Bookmark.init(BookmarkModel, Bookmark.config(sequelize));
    Like.init(LikeModel, Like.config(sequelize));
    Follow.init(FollowModel, Follow.config(sequelize));

    Image.associate(sequelize.models);
    User.associate(sequelize.models);
    Comment.associate(sequelize.models);
    Bookmark.associate(sequelize.models);
    Like.associate(sequelize.models);
    Follow.associate(sequelize.models);
}

module.exports = { setupModels };
