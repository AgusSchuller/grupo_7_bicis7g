module.exports = (sequelize, dataTypes) => {
    let alias = "Size";
    let cols = {
      id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull : false
      },
      Name: {
        type: dataTypes.STRING,
        allowNull: false,
      }
    }
    /*
    let config = {
      tableName: "products",
      timeStamps: false,
    };*/
    const Size = sequelize.define(alias, cols);
    Size.associate = function(models){
        Size.belongsTo(models.ModelSize, {
            as : 'modelSize',
            foreignKey : 'sizeId'
        })
    }
  
    return Size;
  };
  