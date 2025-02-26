const {Model, DataTypes, Sequelize} = require("sequelize");
const {USER_TABLE} = require("./userModels.js");
const {IMAGE_TABLE} = require("./imageModels.js");

const LIKE_TABLE = "like";

const LikeModel = {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        unique: true,
        defaultValue: Sequelize.UUIDV4,
    },

    user_id: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
            model: USER_TABLE,
            key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },

    image_id: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
            model: IMAGE_TABLE,
            key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },

    created_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    }
}

class Like extends Model{
    static associate(models){
        this.belongsTo(models.User, {
            as: "user",
            foreignKey: "user_id",
        })

        this.belongsTo(models.Image, {
            as: "image",
            foreignKey: "image_id",
        })
    }

    static config(sequelize){
        return{
            sequelize,
            tableName: LIKE_TABLE,
            modelName: "Like",
            timestamps: false,
        }
    }
}

module.exports = { Like, LikeModel, LIKE_TABLE };