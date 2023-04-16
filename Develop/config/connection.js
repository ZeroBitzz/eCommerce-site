require('dotenv').config();

const Sequelize = require('sequelize');

const sequelize = new Sequelize('ecommerce_db', 'root', '32289216', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
  dialectOptions: {
    decimalNumbers: true,
  },
})

//test the connection to the database
async function test(){
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully broh.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
test()

module.exports = sequelize;