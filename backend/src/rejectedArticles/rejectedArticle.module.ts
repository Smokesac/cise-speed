import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  RejectedArticle,
  RejectedArticleSchema,
} from './rejectedArticle.schema';
import { RejectedArticleService } from './rejectedArticle.service';
import { RejectedArticlesController } from './rejectedArticle.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RejectedArticle.name, schema: RejectedArticleSchema },
    ]),
  ],
  controllers: [RejectedArticlesController],
  providers: [RejectedArticleService],
})
export class RejectedArticleModule {}
