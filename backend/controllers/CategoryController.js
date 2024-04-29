const { getPagination, getPagingData } = require("./paginationController");
const db = require("../models/db.js");
const Category = db.category;
const Op = db.Sequelize.Op;

let bcrypt = require("bcryptjs");

exports.createNewCategory = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  // Create a Category
  const category = {
    name: req.body.name,
    price: req.body.price,
    category_info: req.body.category_info,
    category_detail: req.body.category_detail,
    ratingStar: req.body.ratingStar,
    category_image_name: req.body.category_image_name,
    category_id: req.body.category_id, 
  };

  // Save Category in the database
  Category.create(category)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Category."
      });
    });
};

exports.getAllCategories = async (req, res) => {
  const { page, size, title } = req.query;
  const { limit, offset } = getPagination(page, size);

  try {
    const data = await Category.findAndCountAll({
      limit,
      offset,
      order: [["category_id", "ASC"]],
    });

    const response = await getPagingData(data, page, limit);
    res.send(response);
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving the Category.",
    });
  }
};

exports.getCategoryById = (req, res) => {
  const id = req.params.id;
  Category.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find the category with id:${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving category with id= " + id,
      });
    });
};

// Update a Category identified by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Category.update(req.body, { where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Category was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Category with id=${id}. Maybe Category was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Category with id=" + id,
      });
    });
};

// Delete a Category with the specified id in the request
exports.delProdById = (req, res) => {
  const id = req.params.id;

  Category.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Category was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Category with id=${id}. Maybe Category was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Category with id=" + id,
      });
    });
};

// Delete all Categorys from the database.
exports.delAllCategorys = (req, res) => {
  Category.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Categorys were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials.",
      });
    });
};
