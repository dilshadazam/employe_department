import path from "path";
// import fs from "fs";
import cluster from "cluster";
import os from "os";
import express from "express";
// import multer from "multer";
import sequelize from "./utilities/database.js";
import helmet from "helmet";
import compression from "compression";
import userRoutes from "./routes/user_routes.js";

//all routes imported here

const cpu = os.cpus().length;

const port = process.env.PORT || 3300;

const app = express();

if (cluster.isMaster) {
  console.log(`Master  ${process.pid} is running`);
  for (let i = 0; i < cpu; i++) {
    cluster.fork();
  }
  console.log(cpu);
  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use(helmet());
  app.use(compression());

  app.use("/administrator", userRoutes);

  //central error handler here

  // sync with database
  sequelize
    .sync()
    .then(() => {
      app.listen(port);
      console.log(`✔️  Server listening on port: ${port} ✔️ `);
    })
    .catch((err) => {
      console.log(err);
    });
}
