import Sequelize from "sequelize";

import sequelize from "../utilities/database.js";

const Department = sequelize.define("department", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  dep_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
 
});
export default Department;
