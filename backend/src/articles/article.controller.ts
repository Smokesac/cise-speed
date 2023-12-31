import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleDto } from './models/ArticleDto';
import { Article } from './article.schema';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly ArticleService: ArticleService) {}

  //get request for [backend url]/articles
  @Get()
  async getArticles(): Promise<Article[]> {
    return await this.ArticleService.findAll().then();
  }

  //get request for [backend url]/articles/[id here]
  @Get(':id')
  async getArticle(@Param('id') id: string): Promise<Article> {
    return await this.ArticleService.findOne(id);
  }

  //post request for [backend url]/articles/new
  @Post()
  async createArticle(@Body() articles: ArticleDto): Promise<ArticleDto> {
    return await this.ArticleService.create(articles).then();
  }

  //put request for [backend url]/articles/[id here]
  @Put(':id')
  async updateArticle(
    @Param('id') id: string,
    @Body() post: Article,
  ): Promise<Article> {
    return await this.ArticleService.update(id, post);
  }

  //delete request for [backend url]/articles/[id here]
  @Delete(':id')
  async deleteArticle(@Param('id') id: string): Promise<Article> {
    return await this.ArticleService.delete(id);
  }
}
