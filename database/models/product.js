module.exports = (sequelize, dataTypes) => {
  let alias = "Product";
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
    brandId: {
      type: dataTypes.INTEGER
    },
    modelId: {
      type: dataTypes.INTEGER
    },
    sizeId:  {
      type: dataTypes.INTEGER
    }
  }
  /*
  let config = {
    tableName: "",
    timeStamps: false,
  };*/
  const Product = sequelize.define(alias, cols);


  return Product;
};
