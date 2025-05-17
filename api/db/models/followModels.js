const {Model, DataTypes, Sequelize} = require("sequelize");
const {USER_TABLE} = require("./userModels");

const FOLLOW_TABLE = "follow";

const FollowModel = {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        unique: true,
    },
    
    followerId: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
        model: USER_TABLE,
        key: "id",
        },
    },
    
    followingId: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
        model: USER_TABLE,
        key: "id",
        },
    },
    
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    },
}

class Follow extends Model {
    static associate(models) {
        this.belongsTo(models.User, {as: "follower", foreignKey: "followerId"});
        this.belongsTo(models.User, {as: "following", foreignKey: "followingId"});
    }
    
    static config(sequelize) {
        return {
            sequelize,
            tableName: FOLLOW_TABLE,
            modelName: "Follow",
            timestamps: false,
        };
    }
}

module.exports = {FOLLOW_TABLE, FollowModel, Follow};