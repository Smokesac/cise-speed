import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AnalystArticleDocument = HydratedDocument<AnalystArticle>;

@Schema()
export class AnalystArticle {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  authors: string[];

  @Prop({ required: true })
  journal: string;

  @Prop({ required: false })
  volume: string;

  @Prop({ required: true })
  numberPages: number;

  @Prop({ required: true })
  publicationYear: number;

  @Prop({ required: false })
  DOI: string;

  @Prop({ required: true })
  submitterId: string;
}

export const AnalystArticleSchema =
  SchemaFactory.createForClass(AnalystArticle);
