import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AnalystArticle } from './analystArticle.schema';
import { AnalystArticleDto } from './models/AnalystArticleDto';

@Injectable()
export class AnalystArticleService {
  constructor(
    @InjectModel(AnalystArticle.name)
    private analystArticleModel: Model<AnalystArticle>,
  ) {}

  async create(analystArticle: AnalystArticleDto): Promise<AnalystArticle> {
    const createdAnalystArticle = new this.analystArticleModel(analystArticle);
    return createdAnalystArticle.save();
  }

  async findAll(): Promise<AnalystArticle[]> {
    return this.analystArticleModel.find().exec();
  }

  async findOne(id: string): Promise<AnalystArticle> {
    return await this.analystArticleModel.findById(id).exec();
  }

  async update(id: string, post: AnalystArticle): Promise<AnalystArticle> {
    return await this.analystArticleModel.findByIdAndUpdate(id, post, {
      new: true,
    });
  }

  async delete(id: string): Promise<AnalystArticle> {
    return await this.analystArticleModel.findByIdAndRemove(id);
  }
}
