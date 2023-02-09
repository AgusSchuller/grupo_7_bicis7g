module.exports = (sequelize, dataTypes) => {
  let alias = "Product";
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
    description: {
      type: dataTypes.STRING,
    },
    price: {
      type: dataTypes.DECIMAL,
    },
    discount: {
      type: dataTypes.INTEGER,
    },
    image: {
      type: dataTypes.STRING,
    },
    modelId: {
      type: dataTypes.INTEGER,
    },
  };
  /*
  let config = {
    tableName: "",
    timeStamps: false,
  };*/
  const Product = sequelize.define(alias, cols);
  Product.associate = function (models) {
    Product.belongsTo(models.Model, {
      as: "model" /* el nombre de aca, es con el cual nosotros vamos a hacer el include de esa asociacion*/,
      foreignKey: "modelId",
    });
  };

  return Product;
};
