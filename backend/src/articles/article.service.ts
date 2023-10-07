import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Article } from './article.schema';
import { ArticleDto } from './models/ArticleDto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<Article>,
  ) {}

  async create(article: ArticleDto): Promise<Article> {
    const createdArticle = new this.articleModel(article);
    return createdArticle.save();
  }

  async findAll(): Promise<Article[]> {
    return this.articleModel.find().exec();
  }

  async findOne(id: string): Promise<Article> {
    return await this.articleModel.findById(id).exec();
  }

  async update(id: string, post: Article): Promise<Article> {
    return await this.articleModel.findByIdAndUpdate(id, post, {
      new: true,
    });
  }

  async delete(id: string): Promise<Article> {
    return await this.articleModel.findByIdAndRemove(id);
  }
}
