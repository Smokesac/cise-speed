import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModArticle } from './modArticle.schema';
import { CreateModArticleDto } from './models/CreateModArticleDto';

@Injectable()
export class ModArticleService {
  constructor(
    @InjectModel(ModArticle.name) private modArticleModel: Model<ModArticle>,
  ) {}

  async create(modArticle: CreateModArticleDto): Promise<ModArticle> {
    const createdModArticle = new this.modArticleModel(modArticle);
    return createdModArticle.save();
  }

  async findAll(): Promise<ModArticle[]> {
    return this.modArticleModel.find().exec();
  }
}
