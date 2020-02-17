const express = require("express");
const bunyan = require("bunyan");
const bunyanMiddleware = require("bunyan-middleware");

const logger = bunyan.createLogger({ name: "Node App" });

const app = express();
const port = 3000;

app.use(
  bunyanMiddleware({
    headerName: "X-Request-Id",
    propertyName: "reqId",
    logName: "req_id",
    logger: logger
  })
);

const logResponseTime = (req, res, next) => {
  console.time("Response Time : " + req.path);

  res.on("finish", () => {
    console.timeEnd("Response Time : " + req.path);
  });

  next();
};

app.use(logResponseTime);

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/help", (req, res) => res.send({ success: true }));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
