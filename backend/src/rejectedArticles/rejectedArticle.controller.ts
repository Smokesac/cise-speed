import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { RejectedArticleService } from './rejectedArticle.service';
import { RejectedArticleDto } from './models/RejectedArticleDto';
import { RejectedArticle } from './rejectedArticle.schema';

@Controller('rejectedArticles')
export class RejectedArticlesController {
  constructor(
    private readonly RejectedArticleService: RejectedArticleService,
  ) {}

  //get request for http://localhost:5000/rejectedArticles
  @Get()
  async getRejectedArticles(): Promise<RejectedArticle[]> {
    return await this.RejectedArticleService.findAll();
  }

  //get request for http://localhost:5000/rejectedArticles/[id here]
  @Get(':id')
  async getRejectedArticle(@Param('id') id: string): Promise<RejectedArticle> {
    return await this.RejectedArticleService.findOne(id);
  }

  //post request for http://localhost:5000/rejectedArticles
  @Post()
  async createRejectedArticle(
    @Body() rejectedArticles: RejectedArticleDto,
  ): Promise<RejectedArticleDto> {
    return await this.RejectedArticleService.create(rejectedArticles);
  }

  //put request for http://localhost:5000/rejectedArticles/[id here]
  @Put(':id')
  async updateRejectedArticle(
    @Param('id') id: string,
    @Body() post: RejectedArticle,
  ): Promise<RejectedArticle> {
    return await this.RejectedArticleService.update(id, post);
  }

  //delete request for http://localhost:5000/rejectedArticles/[id here]
  @Delete(':id')
  async deleteRejectedArticle(
    @Param('id') id: string,
  ): Promise<RejectedArticle> {
    return await this.RejectedArticleService.delete(id);
  }
}
