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
    return this.ModArticleService.findAll().then();
  }

  //post request for http://localhost:5000/modArticles/new
  @Post()
  async createModArticle(
    @Body() modArticles: CreateModArticleDto,
  ): Promise<CreateModArticleDto> {
    return this.ModArticleService.create(modArticles).then();
  }
}
