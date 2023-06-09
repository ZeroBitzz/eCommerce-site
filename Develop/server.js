const express = require('express');
const routes = require('./routes');
// import sequelize connection
const app = express();
const PORT = process.env.PORT || 3001;
const Category = require('./models/Category')
const Product = require('./models/Product')
const ProductTag = require('./models/ProductTag')
const Tag = require('./models/Tag')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
const syncModels = async () => {
  await Category.sync()
  await Product.sync()
  await ProductTag.sync()
  await Tag.sync()
}
syncModels()

app.listen(PORT, async () => {
  console.log(`App listening on port ${PORT}!`);
});
