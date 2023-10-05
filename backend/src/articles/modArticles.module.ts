import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/Mongoose';
import { ModArticlesSchema } from './models/modArticles.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ModArticles', schema: ModArticlesSchema },
    ]),
  ],
})
export class ModArticlesModule {}
