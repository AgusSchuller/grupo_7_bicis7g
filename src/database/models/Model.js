module.exports = (sequelize, dataTypes) => {
  let alias = "Model";
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: dataTypes.INTEGER,
    },
  };
  /*
    let config = {
      tableName: "products",
      timeStamps: false,
    };*/
  const Model = sequelize.define(alias, cols);
  Model.associate = function (models) {
    Model.belongsTo(models.ProductModel, {
      as: "productModel",
      foreignKey: "modelId",
    });
  };
  return Model;
};
