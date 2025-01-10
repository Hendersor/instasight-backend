const { Model, DataTypes, Sequelize } = require("sequelize");

const IMAGE_TABLE = 'image';

const ImageModel = {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        unique: true,
    },
    img: {
        allowNull: false,
        type: DataTypes.BLOB('long'),
    },
      

    user_id:{
        allowNull: false,
        type: DataTypes.UUID,
        references: {
            model: "user",
            key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },

    description: {
        allowNull: true,
        type: DataTypes.STRING,
        validate:{
            len:[0,255],
        },
    },

    created_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    }
}

class Image extends Model{
    static associate(models){
        this.belongsTo(models.User, {
            as: "user",
            foreignKey: "user_id",
        })
    }

    static config(sequelize){
        return{
            sequelize,
            tableName: IMAGE_TABLE,
            modelName: "Image",
            timestamps: false,
        }
    }
}


module.exports = { Image, ImageModel, IMAGE_TABLE };
