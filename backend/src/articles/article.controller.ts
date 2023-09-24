import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './models/CreateArticleDto';
import { Article } from './article.schema';

@Controller("articles")
export class ArticlesController {
  constructor(private readonly ArticleService: ArticleService) {}

  //get request for http://localhost:5000/articles
  @Get()
  async getArticles(): Promise<Article[]> {
    return this.ArticleService.findAll().then();
  }

  //post request for http://localhost:5000/articles/new
  @Post()
  async createArticle(@Body() articles: CreateArticleDto): Promise<CreateArticleDto> {
    return this.ArticleService.create(articles).then();
  }
  
}
