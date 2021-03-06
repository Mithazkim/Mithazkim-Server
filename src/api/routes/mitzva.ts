import { Errors, StartGreaterThanTotalError } from './../../utils/errors';
import { isObjectEmpty } from './../../utils/common';
import express from 'express';
import { IMitzva } from './../../models/mitzvaModel';
import { mitzvaManager } from '../../managers';
import auth from '../middlewares/auth';
import parseToken from '../middlewares/parseToken';

const router = express.Router();

interface GetMitzvaQuery {
  search: string;
  categoryId: string;
  page: string;
  limit: string;
}

/**
 * GET /api/mitzva
 * Public
 * Get all mitzvot
 */
router.get<never, any, never, GetMitzvaQuery>('/', async function (req, res) {
  const { search, categoryId, page, limit } = req.query;

  try {
    const [total, data] = await mitzvaManager.getMitzvot(search, categoryId, page, limit);
    res.status(200).json({ total, data });
  } catch (error) {
    if (error instanceof StartGreaterThanTotalError) {
      return res.status(400).json({ msg: error.message });
    }
    throw error;
  }
});

/**
 * GET /api/mitzvot/:id
 * Public
 * get mitzva by id
 */
router.get('/:id', async function (req, res) {
  const mitzva = await mitzvaManager.getMitzvaById(req.params.id);
  res.status(200).json(mitzva);
});

/**
 * Post /api/mitzva
 * Private
 * Add mitzva
 */
router.post('/', auth, async function (req, res) {
  const { title, categoryId }: IMitzva = req.body;

  //simple validation
  if (!title || !categoryId) return res.status(400).json({ msg: Errors.MissingFields });

  const isMitzvaFound = await mitzvaManager.getMitzvaByTitle(title);

  if (isMitzvaFound) return res.status(400).json({ msg: Errors.MitzvaExists });

  const mitzva = await mitzvaManager.createMitzva(req.body);
  res.status(201).json(mitzva);
});

/**
 * POST /api/mitzva/:id
 * Public
 * Update rank value
 */
router.post('/r/:id', parseToken, async function (req, res) {
  if (req.user) {
    return res.status(400).json({ msg: Errors.AdminRankUpdate });
  } else {
    await mitzvaManager.updateRank(req.params.id);
    res.status(200).end();
  }
});

/**
 * PATCH /api/mitzva/:id
 * Private
 * Edit mitzva
 */
router.patch('/:id', auth, async function (req, res) {
  //simple validation
  if (isObjectEmpty(req.body)) return res.status(400).json(Errors.MissingFields);

  const mitzva = await mitzvaManager.updateMitzva(req.params.id, req.body);
  res.status(200).json(mitzva);
});

/**
 * DELETE /api/mitzva/:id
 * Private
 * Delete mitzva
 */
router.delete('/:id', auth, async function (req, res) {
  const mitzva = await mitzvaManager.deleteMitzva(req.params.id);
  res.status(200).json(mitzva);
});

export default router;
