import { Document, model, Schema } from 'mongoose';
import Consts from '../utils/consts';
import { Errors } from '../utils/errors';

export interface IQuote {
  title: string;
  writer: string;
}

export interface IQuoteDocument extends Document, IQuote {}

export const quoteSchema = new Schema({
  title: { type: String, required: [true, Errors.TitleRequired], trim: true, unique: true },
  writer: { type: String, required: [true, Errors.WriterRequired], trim: true }
});

const Quote = model<IQuoteDocument>(Consts.db.quotesTableName, quoteSchema, Consts.db.quotesTableName);

export default Quote;
