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
  journal: string;

  @Prop({ required: true })
  publicationYear: number;

  @Prop({ required: false })
  volume: string;

  @Prop({ required: true })
  numberPages: string;

  @Prop({ required: false })
  DOI: string;

  @Prop({ required: true })
  sEPractice: string;

  @Prop({ required: true })
  claim: string;

  @Prop({ required: true })
  researchType: string;

  @Prop({ required: true })
  participantType: string;

  @Prop({ required: true })
  evidenceResult: string;

  @Prop({ required: true })
  tags: string[];

  @Prop({ required: true })
  summary: string;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
