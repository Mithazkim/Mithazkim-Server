import Quote, { IQuote } from '../models/quoteModel';

export function getQuotes() {
  return Quote.find();
}

export function getQuoteById(id: string) {
  return Quote.findById(id);
}

export function getRandomQuote() {
  return Quote.aggregate([{ $sample: { size: 1 } }]);
}

export function createQuote(quote: IQuote) {
  return Quote.create(quote);
}

export function updateQuote(id: string, quote: IQuote) {
  return Quote.findByIdAndUpdate(id, quote, { new: true, runValidators: true });
}

export function deleteQuote(id: string) {
  return Quote.findByIdAndDelete(id);
}
