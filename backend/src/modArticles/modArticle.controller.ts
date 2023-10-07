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
import { CreateModArticleDto } from './models/CreateModArticleDto';
import { ModArticle } from './modArticle.schema';

@Controller('modArticles')
export class ModArticlesController {
  constructor(private readonly ModArticleService: ModArticleService) {}

  //get request for http://localhost:5000/modArticles
  @Get()
  async getModArticles(): Promise<ModArticle[]> {
    return this.ModArticleService.findAll();
  }

  //get request for http://localhost:5000/modArticles/[id here]
  @Get(':id')
  async getModArticle(@Param('id') id: string): Promise<ModArticle> {
    return await this.ModArticleService.findOne(id);
  }

  //post request for http://localhost:5000/modArticles
  @Post()
  async createModArticle(
    @Body() modArticles: CreateModArticleDto,
  ): Promise<CreateModArticleDto> {
    return this.ModArticleService.create(modArticles);
  }

  //put request for http://localhost:5000/modArticles/[id here]
  @Put(':id')
  async updateModArticle(
    @Param('id') id: string,
    @Body() post: ModArticle,
  ): Promise<ModArticle> {
    return await this.ModArticleService.update(id, post);
  }

  //delete request for http://localhost:5000/modArticles/[id here]
  @Delete(':id')
  async deleteModArticle(@Param('id') id: string): Promise<ModArticle> {
    return await this.ModArticleService.delete(id);
  }
}
