import { Sequelize } from 'sequelize';
import colors from 'colors';
import { exit } from 'node:process';

// Initialize Sequelize with environment variables
const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASS as string,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
  }
);

export const connectDB = async (): Promise<Sequelize> => {
  try {
    await sequelize.authenticate();
    console.log(colors.magenta.bold(`MySQL connected on: ${process.env.DB_HOST}`));
  } catch (error) {
    console.log(colors.bgRed.bold(`Error: Unable to connect to the database`));
    exit(1);
  }

  // Return the sequelize instance for further usage
  return sequelize;
};

export default sequelize;