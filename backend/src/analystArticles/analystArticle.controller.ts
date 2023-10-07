import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { AnalystArticleService } from './analystArticle.service';
import { AnalystArticleDto } from './models/AnalystArticleDto';
import { AnalystArticle } from './analystArticle.schema';

@Controller('analystArticles')
export class AnalystArticlesController {
  constructor(private readonly AnalystArticleService: AnalystArticleService) {}

  //get request for http://localhost:5000/analystArticles
  @Get()
  async getAnalystArticles(): Promise<AnalystArticle[]> {
    return await this.AnalystArticleService.findAll();
  }

  //get request for http://localhost:5000/analystArticles/[id here]
  @Get(':id')
  async getAnalystArticle(@Param('id') id: string): Promise<AnalystArticle> {
    return await this.AnalystArticleService.findOne(id);
  }

  //post request for http://localhost:5000/analystArticles
  @Post()
  async createAnalystArticle(
    @Body() analystArticles: AnalystArticleDto,
  ): Promise<AnalystArticleDto> {
    return await this.AnalystArticleService.create(analystArticles);
  }

  //put request for http://localhost:5000/analystArticles/[id here]
  @Put(':id')
  async updateAnalystArticle(
    @Param('id') id: string,
    @Body() post: AnalystArticle,
  ): Promise<AnalystArticle> {
    return await this.AnalystArticleService.update(id, post);
  }

  //delete request for http://localhost:5000/analystArticles/[id here]
  @Delete(':id')
  async deleteAnalystArticle(@Param('id') id: string): Promise<AnalystArticle> {
    return await this.AnalystArticleService.delete(id);
  }
}
