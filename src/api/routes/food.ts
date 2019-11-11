import express from 'express';
import { IFood } from './../../models/foodModel';
import { foodManager } from '../../managers';
import auth from '../middlewares/auth';

const router = express.Router();

/**
 * Get /api/food
 * Public
 * get all food
 */
router.get('/', async function(req, res) {
  const food = await foodManager.getFood();
  res.status(200).send(food);
});

/**
 * GET /api/food/:id
 * Public
 * get food by id
 */
router.get('/:id', async function(req, res) {
  const food = await foodManager.getFoodById(req.params.id);
  res.status(200).send(food);
});

/**
 * POST /api/food
 * Private
 * Add food
 */
router.post('/', auth, async function(req, res) {
  const { name, berakhahId }: IFood = req.body;

  // Simple validations
  if (!name || !berakhahId) return res.status(400).json({ msg: 'fullName is required' });

  const food = await foodManager.createFood({ name, berakhahId });
  res.status(201).json(food);
});

/**
 * PUT /api/food/:id
 * Private
 * Add food
 */
router.put('/:id', auth, async function(req, res) {
  const { name, berakhahId }: IFood = req.body;

  // Simple validations
  if (!name || !berakhahId) return res.status(400).json({ msg: 'fullName is required' });

  const food = await foodManager.updateFood(req.params.id, { name, berakhahId });
  res.status(200).json(food);
});

/**
 * DELETE /api/food/:id
 * Private
 * delete food
 */
router.delete('/:id', auth, async function(req, res) {
  const food = await foodManager.deleteFood(req.params.id);
  res.status(200).json(food);
});

export default router;
