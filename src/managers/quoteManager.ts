import { quoteRepository } from '../repositories';
import { IQuote } from '../models/quoteModel';

export function getQuotes() {
  return quoteRepository.getQuotes();
}

export function getQuoteById(id: string) {
  return quoteRepository.getQuoteById(id);
}

export function getRandomQuote() {
  return quoteRepository.getRandomQuote();
}

export function createQuote(quote: IQuote) {
  return quoteRepository.createQuote(quote);
}

export function updateQuote(id: string, quote: IQuote) {
  return quoteRepository.updateQuote(id, quote);
}

export function deleteQuote(id: string) {
  return quoteRepository.deleteQuote(id);
}
