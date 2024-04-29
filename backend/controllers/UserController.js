const { getPagination, getPagingData } = require("./paginationController");
const db = require("../models/db.js");
const Status = require("../models/eStatus.js");
const User = db.user;
const Role = db.role;
const UserDTO = db.userDTO;
const Op = db.Sequelize.Op;

let bcrypt = require("bcryptjs");

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.createNewAccount = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  // Create a User
  const user = {
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 8),
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    mobile: req.body.mobile,
    address: req.body.address,
  };

  // Save User in the database
  User.create(user)
    .then((createdUser) => {
      if (req.body.role) {
        const roleNames = req.body.role;
        Role.findAll({ where: { name: roleNames } }).then((roles) => {
          if (roles.length > 0) {
            createdUser.setRoles(roles);
          }
          res.send(createdUser);
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    });
};

exports.getAllAccounts = async (req, res) => {
  const { page, size, title } = req.query;
  const { limit, offset } = getPagination(page, size);

  try {
    const userDB = await User.findAndCountAll({
      limit,
      offset,
      order: [["id", "ASC"]],
    });

    const userDtos = await Promise.all(
      userDB.rows.map(async (user) => {
        const roles = await user.getRoles();
        let authorities = [];
        for (let j = 0; j < roles.length; j++) {
          authorities.push(roles[j].name.toUpperCase());
        }
        user.roles = authorities;
        const userDto = {
          username: user.username,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          mobile: user.mobile,
          address: user.address,
          url_avatar: user.url_avatar,
          roles: user.roles,
          status: Status[user.status],
        };
        return userDto;
      })
    );

    const response = await getPagingData(userDB, page, limit);
    response.items = userDtos;
    res.send(response);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving the User.",
    });
  }
};

exports.getAccountById = (req, res) => {
  const id = req.params.id;
  UserDTO.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find the user with id:${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving user with id= " + id,
      });
    });
};

// Update a User identified by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, { where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User with id=" + id,
      });
    });
};

// Delete a User with the specified id in the request
exports.delAccById = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id=" + id,
      });
    });
};

// Delete all Users from the database.
exports.delAllAccounts = (req, res) => {
  User.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Users were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials.",
      });
    });
};
