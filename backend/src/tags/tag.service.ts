import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tag } from './tag.schema';
import { TagDto } from './models/TagDto';

@Injectable()
export class TagService {
  constructor(@InjectModel(Tag.name) private tagModel: Model<Tag>) {}

  async create(tag: TagDto): Promise<Tag> {
    const createdTag = new this.tagModel(tag);
    return createdTag.save();
  }

  async findAll(): Promise<Tag[]> {
    return this.tagModel.find().exec();
  }

  async findOne(id: string): Promise<Tag> {
    return await this.tagModel.findById(id).exec();
  }

  async update(id: string, post: Tag): Promise<Tag> {
    return await this.tagModel.findByIdAndUpdate(id, post, {
      new: true,
    });
  }

  async delete(id: string): Promise<Tag> {
    return await this.tagModel.findByIdAndRemove(id);
  }
}
