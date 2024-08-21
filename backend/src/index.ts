import colors from 'colors';
import app from './server';
import sequelize from './config/database';

const port = process.env.PORT || 4000;

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log(colors.green.bold('Connection has been established successfully.'));

    await sequelize.sync({ force: true }); // Use { force: true } only in development to drop and recreate tables
    console.log(colors.green.bold('Database synchronized.'));

    app.listen(port, () => {
      console.log(colors.blue.bold(`REST API funcionando en el puerto ${port}`));
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

start();