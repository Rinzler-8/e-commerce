const { getPagination, getPagingData } = require("./paginationController");
const db = require("../models/db.js");
const Product = db.product;
const Category = db.category;
const Op = db.Sequelize.Op;

let bcrypt = require("bcryptjs");

exports.createNewProduct = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  // Create a Product
  const product = {
    name: req.body.name,
    price: req.body.price,
    info: req.body.info,
    detail: req.body.detail,
    ratingStar: req.body.ratingStar,
    imageName: req.body.imageName,
    category_id: req.body.category_id,
  };

  // Save Product in the database
  Product.create(product)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Product.",
      });
    });
};

exports.getAllProducts = async (req, res) => {
  const { page, size, search } = req.query;
  const { limit, offset } = getPagination(page, size);

  try {
    const productDB = await Product.findAndCountAll({
      limit,
      offset,
      order: [["productId", "ASC"]],
    });
    const productDtos = await Promise.all(
      productDB.rows.map(async (product) => {
        let catName = "";
        if (product.category_id) {
          const cat = await Category.findByPk(product.category_id);
          if (cat) {
            catName = cat.name;
          }
        }
        const productDto = {
          productId: product.productId,
          name: product.name,
          price: product.price,
          info: product.info,
          detail: product.detail,
          ratingStar: product.ratingStar,
          imageName: product.imageName,
          categoryName: product.category_id ? catName : "",
          stockQty: product.stockQty,
        };
        return productDto;
      })
    );

    const response = await getPagingData(productDB, page, limit);
    response.items = productDtos;

    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({
      message:
        err.message || "Some error occurred while retrieving the Product.",
    });
  }
};

exports.getProductById = (req, res) => {
  const id = req.params.id;
  Product.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find the product with id:${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving product with id= " + id,
      });
    });
};

// Update a Product identified by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Product.update(req.body, { where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Product was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Product with id=${id}. Maybe Product was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Product with id=" + id,
      });
    });
};

// Delete a Product with the specified id in the request
exports.delProdById = (req, res) => {
  const id = req.params.id;

  Product.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Product was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Product with id=${id}. Maybe Product was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Product with id=" + id,
      });
    });
};

// Delete all Products from the database.
exports.delAllProducts = (req, res) => {
  Product.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Products were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials.",
      });
    });
};
