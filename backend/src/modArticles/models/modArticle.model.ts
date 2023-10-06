import * as mongoose from 'mongoose';

export const ModArticleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  authors: { type: String, required: true },
  journal: String,
  publicationYear: { type: String, required: true },
  volume: String,
  numberPages: Number,
  DOI: String,
  submitterId: String,
});

export interface ModArticle {
  id: string;
  title: string;
  authors: string;
  journal: string;
  publicationYear: string;
  volume: string;
  numberPages: number;
  DOI: string;
  submitterId: string;
}
