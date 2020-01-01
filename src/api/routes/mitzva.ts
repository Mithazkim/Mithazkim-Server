import express from 'express';
import { IMitzva } from './../../models/mitzvaModel';
import { mitzvaManager } from '../../managers';
import auth from '../middlewares/auth';

const router = express.Router();

/**
 * GET /api/mitzva
 * Public
 * Get all mitzvot
 */
router.get('/', async function(req, res) {
  const { search, page, limit } = req.query;
  const mitzvot = await mitzvaManager.getMitzvot(search, page, limit);
  res.status(200).send(mitzvot);
});

/**
 * GET /api/mitzvot/:id
 * Public
 * get mitzva by id
 */
router.get('/:id', async function(req, res) {
  const mitzva = await mitzvaManager.getMitzvaById(req.params.id);
  res.status(200).send(mitzva);
});

/**
 * Post /api/mitzva
 * Private
 * Add mitzva
 */
router.post('/', async function(req, res) {
  //need to add auth
  const { title, how, why, active, categoryId }: IMitzva = req.body;

  //simple validation
  if (!title || !categoryId) return res.status(400).json('err_title_and_categoryId_required');

  const rank: number = 0;
  const mitzva = await mitzvaManager.createMitzva({ title, how, why, active, categoryId, rank });
  res.status(201).json(mitzva);
});

/**
 * PUT /api/mitzva/:id
 * Private
 * Edit mitzva
 */
router.put('/:id', async function(req, res) {
  const { title, how, why, active, categoryId, rank }: IMitzva = req.body;
  //need to add auth

  //simple validation
  if (!title || !categoryId) return res.status(400).json('err_title_and_categoryId_required');

  const mitzva = await mitzvaManager.updateMitzva(req.params.id, { title, how, why, active, categoryId, rank });
  res.status(200).json(mitzva);
});

/**
 * DELETE /api/mitzva/:id
 * Private
 * Delete mitzva
 */
router.delete('/:id', async function(req, res) {
  //need to add auth
  const mitzva = await mitzvaManager.deleteMitzva(req.params.id);
  res.status(200).json(mitzva);
});

export default router;
