export class CreateArticleDto {
  title: string;
  authors: string[];
  journal: string;
  publicationYear: number;
  volume: string;
  numberPages: string;
  DOI: string;
  sEPractice: string;
  claim: string;
  researchType: string;
  participantType: string;
  evidenceResult: string;
  tags: string[];
  summary: string;
}
