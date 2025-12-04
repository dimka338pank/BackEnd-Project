import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize({
    dialect: 'sqlite',
<<<<<<< HEAD
    storage: './database.sqlite', 
=======
    storage: './db/database.sqlite',
>>>>>>> d4342cd772fb7be568102516a1d09105d52649ed
    logging: false           
});

export async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

}

export default sequelize;