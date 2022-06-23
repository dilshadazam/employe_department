//models
import Department from "../../../models/department.js";

// EXPORT FUNCTION NAME FOR ROUTE
export const createDepartment = async (req, res, next) => {
  const { dep_name } = req.body;
  try {
    const preExistingDepartment = await Department.findOne({
      where: {
        dep_name,
      },
    });

    if (preExistingDepartment) {
      const error = new Error("Already Exists Employee!");
      error.statusCode = 403;
      return next(error);
    }

    //response in postman when data successfully inserted
    const response = await Department.create({
      dep_name,
    });
    res.status(201).json({
      message: "Department add successfully",
      response,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
