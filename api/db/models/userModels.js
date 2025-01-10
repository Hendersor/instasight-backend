const { Model, DataTypes, Sequelize } = require("sequelize");

const USER_TABLE = "user";

const UserModel = {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        unique: true,
    },

    username: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
            isAlphanumeric: true,
            notEmpty: true,
            len: [1, 255],
        },
    },

    email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
        validate: {
            isEmail: true,
            notEmpty: true,
        },
    },

    password: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
            notEmpty: true,
            len: [8, 255],
        },
    },

    created_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    },
};

class User extends Model {
    static associate(models) {
        this.hasMany(models.Image, {
            as: "image",
            foreignKey: "user_id",
        });

        this.hasMany(models.Comment, {
            as: "comment",
            foreignKey: "user_id",
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: USER_TABLE,
            modelName: "User",
            timestamps: false,
        };
    }
}

module.exports = { User, UserModel, USER_TABLE };
