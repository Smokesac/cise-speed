import { Module } from '@nestjs/common';
import * as dotenv from "dotenv";
import { MongooseModule } from '@nestjs/mongoose';
import { Article, ArticleSchema } from './articles/article.schema';
import { ArticleModule } from './articles/article.module';

dotenv.config();
console.log("My connection");
console.log(process.env.CONNECTION_STRING);
@Module({
  imports: [
    MongooseModule.forRoot(`mongodb+srv://${process.env.CONNECTION_STRING}/articles`),
    MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema}]),
    ArticleModule,
  ]
})
export class AppModule {}
