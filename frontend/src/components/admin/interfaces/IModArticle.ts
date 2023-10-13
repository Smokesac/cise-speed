export interface IModArticle {
  _id: string;
  title: string;
  authors: string[];
  journal: string;
  volume: string;
  numberPages: number;
  publicationYear: number;
  DOI: string;
  submitterId: string;
}
