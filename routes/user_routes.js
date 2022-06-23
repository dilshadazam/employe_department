import express from "express";
import { body } from "express-validator";
const router = express.Router();

import { createEmployee } from "../controllers/administrator/create-api/employee.js";
import { createDepartment } from "../controllers/administrator/create-api/department.js";
import { getEmployeeInfo } from "../controllers/administrator/fetch-api/fetch-all-employees.js";

router.post(
  "/addemployee",
  [
    body("name").trim().not().isEmpty().withMessage("Name is required"),
    body("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("Should be in a valid email format"),
  ],
  createEmployee
);

router.post(
  "/adddepartment",
  [body("dep_name").trim().not().isEmpty().withMessage("Name is required")],
  createDepartment
);

router.get(
  "/fetchallemployee",

  getEmployeeInfo
);

export default router;
