import { Sequelize } from 'sequelize';
export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'pelmeneproject',
  username: 'postgres',
  password: 'pelmene0628',
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