import { isObjectEmpty } from './../../utils/common';
import express from 'express';
import { IBerakhah } from './../../models/berakhahModel';
import { berakhahManager } from '../../managers';
import auth from '../middlewares/auth';

const router = express.Router();

/**
 * Get /api/berakhah
 * Public
 * get all berakhot
 */
router.get('/', async function(req, res) {
  const berakhot = await berakhahManager.getBerakhot();
  res.status(200).send(berakhot);
});

/**
 * GET /api/berakhah/:id
 * Public
 * get berakhah by id
 */
router.get('/:id', async function(req, res) {
  const berakhah = await berakhahManager.getBerakhahById(req.params.id);
  res.status(200).send(berakhah);
});

/**
 * POST /api/berakhah
 * Private
 * Add berakhah
 */
router.post('/', auth, async function(req, res) {
  const { shortName, fullName }: IBerakhah = req.body;

  // Simple validations
  if (!fullName) return res.status(400).json({ msg: 'fullName is required' });

  const berakhah = await berakhahManager.createBerakhah({ fullName, shortName });
  res.status(201).json(berakhah);
});

/**
 * PUT /api/berakhah/:id
 * Private
 * Add berakhah
 */
router.put('/:id', auth, async function(req, res) {
  // Simple validations
  if (isObjectEmpty(req.body)) return res.status(400).json({ msg: 'err_missing_fields' });

  const berakhah = await berakhahManager.updateBerakhah(req.params.id, req.body);
  res.status(200).json(berakhah);
});

/**
 * DELETE /api/berakhah/:id
 * Private
 * delete berakhah
 */
router.delete('/:id', auth, async function(req, res) {
  const berakhah = await berakhahManager.deleteBerakhah(req.params.id);
  res.status(200).json(berakhah);
});
export default router;
