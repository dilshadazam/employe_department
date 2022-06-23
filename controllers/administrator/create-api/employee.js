//models
import Employee from "../../../models/employee.js";

// EXPORT FUNCTION NAME FOR ROUTE
export const createEmployee = async (req, res, next) => {
  const { name, email, departmentId } = req.body;
  try {
    const preExistingEmployee = await Employee.findOne({
      where: {
        email,
      },
    });

    if (preExistingEmployee) {
      const error = new Error("Already Exists Employee!");
      error.statusCode = 403;
      return next(error);
    }

    //response in postman when data successfully inserted
    const response = await Employee.create({
      name,
      email,
      departmentId,
    });
    res.status(201).json({
      message: "Employee add successfully",
      response,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
