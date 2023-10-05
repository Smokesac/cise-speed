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

export class ModArticle {
  constructor(
    public id: string,
    public title: string,
    public authors: string,
    public journal: string,
    public publicationYear: string,
    public volume: string,
    public numberPages: number,
    public DOI: string,
    public submitterId: string,
  ) {}
}
