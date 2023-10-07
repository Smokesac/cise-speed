import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { TagService } from './tag.service';
import { TagDto } from './models/TagDto';
import { Tag } from './tag.schema';

@Controller('tags')
export class TagsController {
  constructor(private readonly TagService: TagService) {}

  //get request for http://localhost:5000/tags
  @Get()
  async getTags(): Promise<Tag[]> {
    return await this.TagService.findAll();
  }

  //get request for http://localhost:5000/tags/[id here]
  @Get(':id')
  async getTag(@Param('id') id: string): Promise<Tag> {
    return await this.TagService.findOne(id);
  }

  //post request for http://localhost:5000/tags
  @Post()
  async createTag(@Body() tags: TagDto): Promise<TagDto> {
    return await this.TagService.create(tags);
  }

  //put request for http://localhost:5000/tags/[id here]
  @Put(':id')
  async updateTag(@Param('id') id: string, @Body() post: Tag): Promise<Tag> {
    return await this.TagService.update(id, post);
  }

  //delete request for http://localhost:5000/tags/[id here]
  @Delete(':id')
  async deleteTag(@Param('id') id: string): Promise<Tag> {
    return await this.TagService.delete(id);
  }
}
