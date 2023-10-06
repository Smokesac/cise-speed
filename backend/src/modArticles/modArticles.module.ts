import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/Mongoose';
import { ModArticleSchema } from './models/modArticle.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ModArticles', schema: ModArticleSchema },
    ]),
  ],
})
export class ModArticlesModule {}
