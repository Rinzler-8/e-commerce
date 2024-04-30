import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "#models/User.mjs";

const config = {
  secret: "fuchz-e-commerce",
};

const controller = {
  login: async (req, res) => {
    try {
      console.log("req ", req?.body);
      const user = await User.findOne({
        email: req?.body?.email,
      });

      if (!user) {
        await User.create({
          email: req?.body?.email,
          password: req?.body?.password,
        });
        return res.status(404).send({ message: "User Not found." });
      }

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      const roles = await user.getRoles();
      const authorities = roles.map((role) => role.name.toUpperCase());

      const accessToken = jwt.sign(
        { id: user.id, role: authorities },
        config.secret,
        { expiresIn: 10000 }
      );

      const refreshToken = jwt.sign(
        { id: user.id, role: authorities },
        config.secret,
        { expiresIn: 30000 }
      );

      res.success({
        id: user.id,
        username: user.username,
        email: user.email,
        // status: Status[user.status],
        // roles: authorities,
        // token: accessToken,
        // refreshToken: refreshToken,
      });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },
};

// export const signup = async (req, res) => {
//   const currentTimeStamp = moment().format("YYYY-MM-DD HH:mm:ss");

//   try {
//     const user = await User.create({
//       username: req.body.username,
//       email: req.body.email,
//       createdAt: currentTimeStamp,
//       password: bcrypt.hashSync(req.body.password, 8),
//     });

//     let roles;
//     if (req.body.roles) {
//       roles = await Role.findAll({
//         where: {
//           name: {
//             [Op.or]: req.body.roles,
//           },
//         },
//       });
//     } else {
//       roles = await Role.findAll({ where: { name: "user" } });
//     }

//     await user.setRoles(roles);
//     res.send({ message: "User was registered successfully!" });
//   } catch (err) {
//     res.status(500).send({ message: err.message });
//   }
// };

export default controller;
