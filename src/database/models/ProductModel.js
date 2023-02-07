module.exports = (sequelize, dataTypes) => {
  let alias = "ProductModel";
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    sizeId: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    modelId: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
  };
  /*
    let config = {
      tableName: "products",
      timeStamps: false,
    };*/
  const ProductModel = sequelize.define(alias, cols);
  ProductModel.associate = function (models) {
    ProductModel.hasMany(models.Product, {
      as: "product",
      foreignKey: "productId",
    });
  };
  ProductModel.associate = function (models) {
    ProductModel.hasMany(models.Model, {
      as: "model",
      foreignKey: "modelId",
    });
  };

  return ProductModel;
};
