import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ModArticleDocument = HydratedDocument<ModArticle>;

@Schema()
export class ModArticle {
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

export const ModArticleSchema = SchemaFactory.createForClass(ModArticle);
