import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RejectedArticle } from './rejectedArticle.schema';
import { RejectedArticleDto } from './models/RejectedArticleDto';

@Injectable()
export class RejectedArticleService {
  constructor(
    @InjectModel(RejectedArticle.name)
    private rejectedArticleModel: Model<RejectedArticle>,
  ) {}

  async create(rejectedArticle: RejectedArticleDto): Promise<RejectedArticle> {
    const createdRejectedArticle = new this.rejectedArticleModel(
      rejectedArticle,
    );
    return createdRejectedArticle.save();
  }

  async findAll(): Promise<RejectedArticle[]> {
    return this.rejectedArticleModel.find().exec();
  }

  async findOne(id: string): Promise<RejectedArticle> {
    return await this.rejectedArticleModel.findById(id).exec();
  }

  async update(id: string, post: RejectedArticle): Promise<RejectedArticle> {
    return await this.rejectedArticleModel.findByIdAndUpdate(id, post, {
      new: true,
    });
  }

  async delete(id: string): Promise<RejectedArticle> {
    return await this.rejectedArticleModel.findByIdAndRemove(id);
  }
}
