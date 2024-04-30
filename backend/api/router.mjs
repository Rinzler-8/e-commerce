import response from "#middleware/response.mjs";
import cors from "cors";
import express from "express";
import authRouter from "./auth/router.mjs";

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

router.use(response);
router.use("/auth", authRouter);

export default router;
