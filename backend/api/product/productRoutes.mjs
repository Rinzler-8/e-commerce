// const { authJwt } = require("../../middleware");
// const controller = require("../../controllers/productController");
// // const uploadController = require("../controllers/upload");
// const upload = require("../../middleware/upload");

// module.exports = function (app) {
//   app.use(function (req, res, next) {
//     res.header(
//       "Prodess-Control-Allow-Headers",
//       "x-access-token, Origin, Content-Type, Prodept"
//     );
//     next();
//   });

//   app.get("/api/v1/products", controller.getAllProducts);

//   app.delete("/api/v1/products", controller.delAllProducts);

//   app.post("/api/v1/products/create", controller.createNewProduct);

//   app.get("/api/v1/products/:id", controller.getProductById);

//   app.delete("/api/v1/products/:id", controller.delProdById);

//   app.put("/api/v1/products/:id", controller.getProductById);

//   // app.post("/api/upload", upload.single("file"), uploadController.uploadFiles);
// };
