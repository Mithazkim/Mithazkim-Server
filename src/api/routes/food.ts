import { Errors, StartGreaterThanTotalError } from './../../utils/errors';
import { isObjectEmpty } from './../../utils/common';
import express from 'express';
import { IFood } from './../../models/foodModel';
import { foodManager } from '../../managers';
import auth from '../middlewares/auth';
import parseToken from '../middlewares/parseToken';

const router = express.Router();

/**
 * Get /api/food
 * Public
 * get all food
 */
router.get('/', parseToken, async function(req, res) {
  const { search, page, limit } = req.query;
  try {
    const [total, data] = await foodManager.getFood(search, page, limit, req.user);
    res.status(200).json({ total, data });
  } catch (error) {
    if (error instanceof StartGreaterThanTotalError) {
      return res.status(400).json({ msg: error.message });
    }
    throw error;
  }
});

/**
 * GET /api/food/:id
 * Public
 * get food by id
 */
router.get('/:id', async function(req, res) {
  const food = await foodManager.getFoodById(req.params.id);
  res.status(200).json(food);
});

/**
 * POST /api/food
 * Private
 * Add food
 */
router.post('/', auth, async function(req, res) {
  const { name, berakhahId }: IFood = req.body;

  // Simple validations
  if (!name || !berakhahId) return res.status(400).json({ msg: Errors.MissingFields });

  const isFoodFound = await foodManager.getFoodByName(name);

  if (isFoodFound) return res.status(400).json({ msg: Errors.FoodExists });

  const food = await foodManager.createFood(req.body);
  res.status(201).json(food);
});

/**
 * PATCH /api/food/:id
 * Private
 * Edit food
 */
router.patch('/:id', auth, async function(req, res) {
  // Simple validations
  if (isObjectEmpty(req.body)) return res.status(400).json({ msg: Errors.MissingFields });

  const food = await foodManager.updateFood(req.params.id, req.body);
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
