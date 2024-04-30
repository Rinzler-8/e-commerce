import { INDEX_PATH, PORT } from "#shared/constants/env.mjs";
import { UNKNOWN } from "#shared/constants/apiError.mjs";
import express from "express";
import { readFileSync } from "fs";
import { StatusCodes } from "http-status-codes";
import { join } from "path";
import connectMongo from "#configs/mongo.mjs";
import apiRouter from "#api/router.mjs";
import bodyParser from "body-parser";

const runServer = async () => {
  await connectMongo();
  const app = express();

  const bodyParserMiddleware = [
    bodyParser.json({
      verify: (req, res, buf) => {
        req.rawBody = buf;
      },
      limit: "5mb",
    }),
    bodyParser.urlencoded({ extended: true }),
    bodyParser.text(),
  ];

  app.use(bodyParserMiddleware);
  app.use("/api", apiRouter);

  // eslint-disable-next-line no-unused-vars
  app.use((error, req, res) => {
    const response = error?.data?.response ?? error?.response;

    const result = {
      code: error.httpCode ?? StatusCodes.UNPROCESSABLE_ENTITY,
      message: error?.description ?? UNKNOWN,
    };

    if (response) {
      result.code = response.code;
      result.errors = response;
    }

    const errors = JSON.stringify(error) !== "{}" ? error : error.toString();

    result.errors = errors;

    return res.status(result.code).json(result);
  });

  app.use(
    "*",
    async (req, res, next) => {
      try {
        const shop = req.query.shop;
        return next();
      } catch (error) {
        return next();
      }
    },
    async (req, res) => {
      return res
        .status(200)
        .set("Content-Type", "text/html")
        .send(readFileSync(join(INDEX_PATH, "index.html")));
    }
  );

  app.listen(PORT);
};

runServer();
