const { authJwt } = require("../../middleware/index.mjs");
const controller = require("../../controllers/UserController");
// const uploadController = require("../controllers/upload");
const upload = require("../../middleware/upload");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/v1/accounts", controller.getAllAccounts);

  app.delete("/api/v1/accounts", controller.delAllAccounts);

  app.post("/api/v1/accounts/create", controller.createNewAccount);

  app.get("/api/v1/accounts/:id", controller.getAccountById);

  app.delete("/api/v1/accounts/:id", controller.delAccById);

  app.put("/api/v1/accounts/:id", controller.getAccountById);

  app.get("/api/test/all", controller.allAccess);

  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

  // app.post("/api/upload", upload.single("file"), uploadController.uploadFiles);

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};
