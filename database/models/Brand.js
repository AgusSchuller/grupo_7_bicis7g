module.exports = (sequelize, dataTypes) => {
    let alias = "Brand";
    let cols = {
      id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull : false
      },
      name: {
        type: dataTypes.STRING,
        allowNull: false,
      },
    }
    /*
    let config = {
      tableName: "",
      timeStamps: false,
    };*/
    const Brand = sequelize.define(alias, cols);
    Brand.associate = function(models){
        Brand.belongsTo(models.Model, {
            as : 'model',
            foreignKey : 'brandId'
        })
    }
  
    return Brand;
  };
  