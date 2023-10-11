import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AnalystArticle, AnalystArticleSchema } from './analystArticle.schema';
import { AnalystArticleService } from './analystArticle.service';
import { AnalystArticlesController } from './analystArticle.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AnalystArticle.name, schema: AnalystArticleSchema },
    ]),
  ],
  controllers: [AnalystArticlesController],
  providers: [AnalystArticleService],
})
export class AnalystArticleModule {}
