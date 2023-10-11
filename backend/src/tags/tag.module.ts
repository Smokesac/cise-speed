import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Tag, TagSchema } from 'src/tags/tag.schema';
import { TagService } from './tag.service';
import { TagsController } from './tag.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Tag.name, schema: TagSchema }])],
  controllers: [TagsController],
  providers: [TagService],
})
export class TagModule {}
