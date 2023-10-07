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
import { CreateArticleDto } from './models/CreateArticleDto';
import { Article } from './article.schema';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly ArticleService: ArticleService) {}

  //get request for http://localhost:5000/articles
  @Get()
  async getArticles(): Promise<Article[]> {
    return this.ArticleService.findAll().then();
  }

  //get request for http://localhost:5000/articles/[id here]
  @Get(':id')
  async getArticle(@Param('id') id: string): Promise<Article> {
    return await this.ArticleService.findOne(id);
  }

  //post request for http://localhost:5000/articles/new
  @Post()
  async createArticle(
    @Body() articles: CreateArticleDto,
  ): Promise<CreateArticleDto> {
    return this.ArticleService.create(articles).then();
  }

  //put request for http://localhost:5000/articles/[id here]
  @Put(':id')
  async updateArticle(
    @Param('id') id: string,
    @Body() post: Article,
  ): Promise<Article> {
    return await this.ArticleService.update(id, post);
  }

  //delete request for http://localhost:5000/articles/[id here]
  @Delete(':id')
  async deleteArticle(@Param('id') id: string): Promise<Article> {
    return await this.ArticleService.delete(id);
  }
}
