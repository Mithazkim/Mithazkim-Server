import { isObjectEmpty } from './../../utils/common';
import express from 'express';
import { IQuote } from './../../models/quoteModel';
import { quoteManager } from '../../managers';
import auth from '../middlewares/auth';
import { Errors } from '../../utils/errors';

const router = express.Router();

/**
 * Get /api/quote
 * Public
 * Get all quotes
 */
router.get('/', async function(req, res) {
  const quotes = await quoteManager.getQuotes();
  res.status(200).send(quotes);
});

/**
 * GET /api/quote/random
 * Public
 * Get random quote
 */
router.get('/random', async function(req, res) {
  console.log('test');
  const quote = await quoteManager.getRandomQuote();
  res.status(200).send(quote);
});

/**
 * GET /api/quote/:id
 * Public
 * Get quote by id
 */
router.get('/:id', async function(req, res) {
  const quote = await quoteManager.getQuoteById(req.params.id);
  res.status(200).send(quote);
});

/**
 * POST /api/quote
 * Private
 * Add quote
 */
router.post('/', auth, async function(req, res) {
  const { title, writer }: IQuote = req.body;

  // Simple validations
  if (!title) return res.status(400).json({ msg: Errors.TitleRequired });
  if (!writer) return res.status(400).json({ msg: Errors.WriterRequired });

  const quote = await quoteManager.createQuote({ title, writer });
  res.status(201).json(quote);
});

/**
 * PATCH /api/quote/:id
 * Private
 * Edit quote
 */
router.patch('/:id', auth, async function(req, res) {
  // Simple validations
  if (isObjectEmpty(req.body)) return res.status(400).json({ msg: Errors.MissingFields });

  const quote = await quoteManager.updateQuote(req.params.id, req.body);
  res.status(200).json(quote);
});

/**
 * DELETE /api/quote/:id
 * Private
 * delete quote
 */
router.delete('/:id', auth, async function(req, res) {
  const quote = await quoteManager.deleteQuote(req.params.id);
  res.status(200).json(quote);
});
export default router;
