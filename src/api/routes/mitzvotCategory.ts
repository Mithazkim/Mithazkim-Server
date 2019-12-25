import express from 'express';
import { IMitzvotCategory } from '../../models/mitzvotCategoryModel';
import { mitzvotCategoryManager } from '../../managers';
import auth from '../middlewares/auth';

const router = express.Router();

/**
 * Get /api/mitzvotCategory
 * Public
 * get all categories
 */
router.get('/', async function(req, res) {
  const categories = await mitzvotCategoryManager.getCategories();
  res.status(200).send(categories);
});

/**
 * Get /api/mitzvotCategory/:id
 * Public
 * get category by id
 */
router.get('/:id', async function(req, res) {
  const category = await mitzvotCategoryManager.getCategoryById(req.params.id);
  res.status(200).send(category);
});

/**
 * POST /api/mitzvotCategory/
 * Private
 * Add category
 */
router.post('/', auth, async function(req, res) {
  const { title }: IMitzvotCategory = req.body;

  //Simple validation
  if (!title) return res.status(400).json({ msg: 'err_title_required' });

  const category = await mitzvotCategoryManager.createCategory({ title });
  res.status(201).json(category);
});

/**
 * PUT /api/mitzvotCategory/:id
 * Private
 * Edit category
 */
router.put('/:id', auth, async function(req, res) {
  const { title }: IMitzvotCategory = req.body;

  //Simple validation
  if (!title) return res.status(400).json({ msg: 'err_title_required' });

  const category = await mitzvotCategoryManager.updateCategory(req.params.id, { title });
  res.status(200).json(category);
});

/**
 * DELETE /api/mitzvotCategory/:id
 * Private
 * Delete category
 */
router.delete('/:id', auth, async function(req, res) {
  const category = await mitzvotCategoryManager.deleteCategory(req.params.id);
  res.status(200).json(category);
});

export default router;
