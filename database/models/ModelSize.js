module.exports = (sequelize, dataTypes) => {
    let alias = "ModelSize";
    let cols = {
      id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull : false
      },
      sizeId: {
        type: dataTypes.INTEGER
      },
      modelId: {
        type: dataTypes.INTEGER
      }
    }
    /*
    let config = {
      tableName: "products",
      timeStamps: false,
    };*/
    const ModelSize = sequelize.define(alias, cols);
    ModelSize.associate = function(models){
        ModelSize.hasMany(models.Model, {
            as : 'model',
            foreignKey : 'modelId'
        })
    }
    ModelSize.associate = function(models){
        ModelSize.hasMany(models.Size, {
            as : 'size',
            foreignKey : 'sizeId'
        })
    }
  
    return ModelSize;
  };
  