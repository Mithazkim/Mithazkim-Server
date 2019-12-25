import express from 'express';
import { ICategoryMitzva } from './../../models/categoryMitzvaModel';
import { categoryMitzvaManager } from '../../managers';
import auth from '../middlewares/auth';

const router = express.Router();

/**
 * Get /api/categorymitzva
 * Public
 * get all categories
 */
router.get('/', async function(req, res) {
  const categories = await categoryMitzvaManager.getCategories();
  res.status(200).send(categories);
});

/**
 * Get /api/categorymitzva/:id
 * Public
 * get category by id
 */
router.get('/:id', async function(req, res) {
  const category = await categoryMitzvaManager.getCategoryById(req.params.id);
  res.status(200).send(category);
});

/**
 * POST /api/categorymitzva/
 * Private
 * Add category
 */
router.post('/', async function(req, res) {
  const { title }: ICategoryMitzva = req.body;

  //Simple validation
  if (!title) return res.status(400).json({ msg: 'err_title_required' });

  const category = await categoryMitzvaManager.createCategory({ title });
  res.status(201).json(category);
});

/**
 * PUT /api/categorymitzva/:id
 * Private
 * Edit category
 */
router.put('/:id', async function(req, res) {
  const { title }: ICategoryMitzva = req.body;

  //Simple validation
  if (!title) return res.status(400).json({ msg: 'err_title_required' });

  const category = await categoryMitzvaManager.updateCategory(req.params.id, { title });
  res.status(200).json(category);
});

/**
 * DELETE /api/categorymitzva/:id
 * Private
 * Delete category
 */
router.delete('/:id', async function(req, res) {
  const category = await categoryMitzvaManager.deleteCategory(req.params.id);
  res.status(200).json(category);
});

export default router;
