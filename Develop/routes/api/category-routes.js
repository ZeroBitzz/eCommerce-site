const express = require('express');
const router = express.Router();
const { Category, Product } = require('../../models');

router.get('/api/categories', async (req, res) => {
  try {
    const categoryData = await Category.findAll();
    res.status(200).json(categoryData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

router.get('/api/categories/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [Product]
    });

    if (!categoryData) {
      res.status(404).json({ message: 'Category not found' });
    } else {
      res.status(200).json(categoryData);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

router.post('/api/categories', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(201).json(categoryData);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Bad request' });
  }
});

router.put('/api/categories/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id);
    if (!categoryData) {
      res.status(404).json({ message: 'Category not found' });
    } else {
      await Category.update(req.body, {
        where: {
          id: req.params.id
        }
      });
      res.status(200).json({ message: 'Category updated' });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Bad request' });
  }
});

router.delete('/api/categories/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id);
    if (!categoryData) {
      res.status(404).json({ message: 'Category not found' });
    } else {
      await Category.destroy({
        where: {
          id: req.params.id
        }
      });
      res.status(200).json({ message: 'Category deleted' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

module.exports = router;
