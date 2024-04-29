import shopifyAuthRouter from "#api/shopifyAuth/router.mjs";
import response from "#middleware/response.mjs";
import cors from "cors";
import express from "express";
import cookieRouter from "./cookie.mjs";
import privateRouter from "./private/router.mjs";
import publicRouter from "./public/router.mjs";
import v1Router from "./v1/router.mjs";

const publicMiddleware = [
  cors({
    origin: "*",
    methods: "OPTIONS,GET",
  }),
];
const middleware = [express.json({ limit: "50mb" }), response];

const router = express.Router();

router.get("/ping-server", async (req, res) => {
  res.status(200).json({ status: "OK" });
});

// router.use("/cookies", express.json({ limit: "50mb" }), cookieRouter);
// router.use("/public", publicMiddleware, publicRouter);
// router.use("/private", express.json({ limit: "50mb" }), privateRouter);

// router.use("/v1", middleware, v1Router);

export default router;
