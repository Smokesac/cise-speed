import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ModArticle,
  ModArticleSchema,
} from 'src/modArticles/modArticle.schema';
import { ModArticleService } from './modArticle.service';
import { ModArticlesController } from './modArticle.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ModArticle.name, schema: ModArticleSchema },
    ]),
  ],
  controllers: [ModArticlesController],
  providers: [ModArticleService],
})
export class ModArticleModule {}
