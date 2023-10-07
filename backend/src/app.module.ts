import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { MongooseModule } from '@nestjs/mongoose';
import { Article, ArticleSchema } from './articles/article.schema';
import { ArticleModule } from './articles/article.module';
import { ModArticle, ModArticleSchema } from './modArticles/modArticle.schema';
import { ModArticleModule } from './modArticles/modArticle.module';
import { AnalystArticleModule } from './analystArticles/analystArticle.module';
import { RejectedArticleModule } from './rejectedArticles/rejectedArticle.module';
import { TagModule } from './tags/tag.module';
import {
  AnalystArticle,
  AnalystArticleSchema,
} from './analystArticles/analystArticle.schema';
import {
  RejectedArticle,
  RejectedArticleSchema,
} from './rejectedArticles/rejectedArticle.schema';
import { Tag, TagSchema } from './tags/tag.schema';

dotenv.config();
console.log('My connection');
console.log(process.env.CONNECTION_STRING);
@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.CONNECTION_STRING}/articles`,
    ),
    MongooseModule.forFeature([
      { name: Article.name, schema: ArticleSchema },
      { name: ModArticle.name, schema: ModArticleSchema },
      { name: AnalystArticle.name, schema: AnalystArticleSchema },
      { name: RejectedArticle.name, schema: RejectedArticleSchema },
      { name: Tag.name, schema: TagSchema },
    ]),
    ArticleModule,
    ModArticleModule,
    AnalystArticleModule,
    RejectedArticleModule,
    TagModule,
  ],
})
export class AppModule {}
