import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ModArticleService } from './modArticle.service';
import { ModArticleDto } from './models/ModArticleDto';
import { ModArticle } from './modArticle.schema';

@Controller('modArticles')
export class ModArticlesController {
  constructor(private readonly ModArticleService: ModArticleService) {}

  //get request for [backend url]/modArticles
  @Get()
  async getModArticles(): Promise<ModArticle[]> {
    return await this.ModArticleService.findAll();
  }

  //get request for [backend url]/modArticles/[id here]
  @Get(':id')
  async getModArticle(@Param('id') id: string): Promise<ModArticle> {
    return await this.ModArticleService.findOne(id);
  }

  //post request for [backend url]/modArticles
  @Post()
  async createModArticle(
    @Body() modArticles: ModArticleDto,
  ): Promise<ModArticleDto> {
    return await this.ModArticleService.create(modArticles);
  }

  //put request for [backend url]/modArticles/[id here]
  @Put(':id')
  async updateModArticle(
    @Param('id') id: string,
    @Body() post: ModArticle,
  ): Promise<ModArticle> {
    return await this.ModArticleService.update(id, post);
  }

  //delete request for [backend url]/modArticles/[id here]
  @Delete(':id')
  async deleteModArticle(@Param('id') id: string): Promise<ModArticle> {
    return await this.ModArticleService.delete(id);
  }
}
