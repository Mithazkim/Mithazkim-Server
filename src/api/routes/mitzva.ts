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
  res.status(200).json(mitzvot);
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
router.post('/', auth, async function(req, res) {
  const { title, categoryId }: IMitzva = req.body;

  //simple validation
  if (!title || !categoryId) return res.status(400).json({ msg: 'err_missing_fields' });

  const mitzva = await mitzvaManager.createMitzva(req.body);
  res.status(201).json(mitzva);
});

/**
 * PATCH /api/mitzva/:id
 * Private
 * Edit mitzva
 */
router.patch('/:id', auth, async function(req, res) {
  const { title, how, why, active, categoryId, rank }: IMitzva = req.body;

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
router.delete('/:id', auth, async function(req, res) {
  const mitzva = await mitzvaManager.deleteMitzva(req.params.id);
  res.status(200).json(mitzva);
});

export default router;
