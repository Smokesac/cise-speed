import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModArticle } from './modArticle.schema';
import { ModArticleDto } from './models/ModArticleDto';

@Injectable()
export class ModArticleService {
  constructor(
    @InjectModel(ModArticle.name) private modArticleModel: Model<ModArticle>,
  ) {}

  async create(modArticle: ModArticleDto): Promise<ModArticle> {
    const createdModArticle = new this.modArticleModel(modArticle);
    return createdModArticle.save();
  }

  async findAll(): Promise<ModArticle[]> {
    return this.modArticleModel.find().exec();
  }

  async findOne(id: string): Promise<ModArticle> {
    return await this.modArticleModel.findById(id).exec();
  }

  async update(id: string, post: ModArticle): Promise<ModArticle> {
    return await this.modArticleModel.findByIdAndUpdate(id, post, {
      new: true,
    });
  }

  async delete(id: string): Promise<ModArticle> {
    return await this.modArticleModel.findByIdAndRemove(id);
  }
}
