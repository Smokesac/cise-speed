import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { MongooseModule } from '@nestjs/mongoose';
import { Article, ArticleSchema } from './articles/article.schema';
import { ArticleModule } from './articles/article.module';
import { ModArticleModule } from './modArticles/modArticles.module';
import { ModArticleSchema } from './modArticles/models/modArticle.model';

dotenv.config();
console.log('My connection');
console.log(process.env.CONNECTION_STRING);
@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.CONNECTION_STRING}/articles`,
    ),
    MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }]),
    ArticleModule,
    MongooseModule.forFeature([
      { name: 'ModArticle', schema: ModArticleSchema },
    ]),
    ModArticleModule,
  ],
})
export class AppModule {}
