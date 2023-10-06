import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModArticle } from './models/modArticle.model';

@Injectable()
export class ModArticleService {
  constructor(
    @InjectModel('ModArticle') private modArticleModel: Model<ModArticle>,
  ) {}

  async insertModArticle(
    title: string,
    authors: string,
    journal: string,
    publicationYear: string,
    volume: string,
    numberPages: number,
    DOI: string,
    submitterId: string,
  ) {
    const newModArticle = new this.modArticleModel({
      title,
      authors,
      journal,
      publicationYear,
      volume,
      numberPages,
      DOI,
      submitterId,
    });
    const result = await newModArticle.save();
    return result.id;
  }
}
