import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ArticleDocument = HydratedDocument<Article>;

@Schema()
export class Article {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  authors: string[];

  @Prop({ required: true })
  source: string;

  @Prop({ required: true })
  publicationYear: number;

  @Prop({ required: true })
  DOI: string;
  
  @Prop({ required: true })
  summary: string;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);