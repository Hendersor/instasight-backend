import { Model, DataTypes, Sequelize } from "sequelize";

const BOOKMARK_TABLE = 'bookmark';

const BookmarkModel = {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        unique: true,
    },

    created_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    },

    user_id: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
            model: 'user', 
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },

    image_id: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
            model: 'image', 
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
};

class Bookmark extends Model {
    static associate(models) {
        this.belongsTo(models.User, {
            as: "user",
            foreignKey: "user_id",
        });

        this.belongsTo(models.Image, {
            as: "image",
            foreignKey: "image_id",
        });

        this.hasMany(models.Comment, {
            as: "comments",
            foreignKey: "bookmark_id",
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: BOOKMARK_TABLE,
            modelName: "Bookmark",
            timestamps: false,
        };
    }
}

export { Bookmark, BookmarkModel, BOOKMARK_TABLE };
