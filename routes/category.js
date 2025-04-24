import express from 'express';
import Category from '../models/Category.js';

const router = express.Router();

// GET /api/categories - fetch all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find().select('name');
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch categories' });
  }
});

// POST /api/categories - add a new category
router.post('/', async (req, res) => {
  const { name } = req.body; // name ko body se retrieve karein

  if (!name) {
    return res.status(400).json({ message: 'Category name is required' });
  }

  try {
    const newCategory = new Category({ name });
    await newCategory.save(); // Category ko save karein
    res.status(201).json({ message: 'Category added successfully', category: newCategory });
  } catch (error) {
    console.error('Error adding category:', error);
    res.status(500).json({ message: 'Failed to add category' });
  }
});

export default router;
