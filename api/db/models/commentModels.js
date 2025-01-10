const { Model, DataTypes, Sequelize } = require("sequelize");

const COMMENT_TABLE = "comment";

const CommentModel = {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        unique: true,
    },

    content: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
            notEmpty: true,
            len: [1, 500],
        },
    },

    user_id: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
            model: "user",
            key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },

    photo_id: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
            model: "image",
            key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },

    created_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    },
};

class Comment extends Model {
    static associate(models) {
        this.belongsTo(models.User, {
            as: "user",
            foreignKey: "user_id",
        });

        this.belongsTo(models.Image, {
            as: "photo",
            foreignKey: "photo_id",
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: COMMENT_TABLE,
            modelName: "Comment",
            timestamps: false,
        };
    }
}

module.exports = { Comment, CommentModel, COMMENT_TABLE };
