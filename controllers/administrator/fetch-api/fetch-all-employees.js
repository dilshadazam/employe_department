//models
import Employee from "../../../models/employee.js";
// EXPORT FUNCTION NAME FOR ROUTE
export const getEmployeeInfo = async (req, res, next) => {
  try {
    const employee = await Employee.findAll({
      attributes: ["name","email","departmentId" ,"createdAt"],
      raw: true,
    });
    res.status(200).json({
      message: "Fetched Employee with department id !",
      employee,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
