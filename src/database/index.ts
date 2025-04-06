import { Sequelize } from 'sequelize';


let instance: any = null;

  function connect() {
  if (instance != null) {
    return instance;
  }
  instance = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD, 
    {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
  });

  instance.authenticate().then(() => {
    console.log('Connection has been established successfully.');
  }).catch((e) => {
    console.error('Unable to connect to the database:', e.message);
  });

  return instance;
}

  connect();

export {instance};
