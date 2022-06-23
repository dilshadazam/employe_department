import Sequelize from "sequelize";

import sequelize from "../utilities/database.js";
import department from "./department.js";

const Employee = sequelize.define("employee", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  departmentId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: department,
      key: "id",
    },
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});
export default Employee;
