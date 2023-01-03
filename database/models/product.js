module.exports = (sequelize, dataTypes) => {
  let alias = "products";
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: dataTypes.STRING,
    },
    descripcion: {
      type: dataTypes.STRING,
    },
    precio: {
      type: dataTypes.INTEGER,
    },
    descuento: {
      type: dataTypes.INTEGER,
    },
    talla: {
      // type:
    },
    color: {
      type: dataTypes.STRING,
    },
    img: {
      //type:
    },
  };
  let config = {
    tableName: "products",
    timeStamps: false,
  };
  const product = sequelize.define(alias, cols, config);

  return product;
};
