const path = require("path");
const db = require("../../database/models");
const sequelize = db.sequelize;

const User = db.User;

const usersApiController = {
  list: async (req, res) => {
    try {
      let users = await User.findAll({
        attributes: ["id", "name", "lastName", "email"],
      });
      let usersApi = users.map((user) => {
        //por cada elemento del array usuario se le agrega la propiedad urlDetail
        return {
          ...user.dataValues,
          urlDetail: `http://localhost:3000/api/users/${user.iduser}`,
        };
      });
      res.json({
        meta: {
          status: 200,
          count: users.length,
        },
        data: {
          usersApi,
        },
      });
    } catch (err) {
      console.log(err);
    }
  },

  detail: (req, res) => {
    User.findByPk(req.params.id).then((user) => {
      //console.log(user);
      if (
        user?.dataValues?.id !== null &&
        user?.dataValues?.id == req.params.id
      ) {
        let respuesta = {
          meta: {
            status: 200,
            total: user.length,
            url: "/api/users/:id",
          },
          data: {
            id: user.dataValues.id,
            Nombre: user.dataValues.name,
            Apellido: user.dataValues.lastName,
            Email: user.dataValues.email,
            Url: `localhost:3000/users/${user.dataValues.id}`,
          },
        };
        return res.json(respuesta);
      }
      return res.status(200).json("No existe el usuario");
    });
  },
};
module.exports = usersApiController;

// (req, res) => {
//     User.findAll().then((users) => {
//         console.log(users)
//       let respuesta = {
//         meta: {
//           status: 200,
//           total: users.length,
//           url: "api/users",
//         },
//         data: {
//           id: users.dataValues.id,
//           Nombre: users.dataValues.name,
//           Apellido: users.dataValues.lastName,
//           Email: users.dataValues.email,
//           Url: "localhost:3000/users",
//         },
//       };
//       res.json(respuesta);
//     });
//   },
