export interface NewsI {
  status: string;
  totalResults: number;
  articles: ArticlesI[];
}

export interface ArticlesI {
  source: Source;
  author?: string | undefined;
  title?: string | undefined;
  description?: string | undefined;
  url: string;
  urlToImage?: string | undefined;
  publishedAt?: string | undefined;
  content?: string | undefined;
} 
export interface Source {
  id?: string | undefined;
  name?: string  | undefined; 
}