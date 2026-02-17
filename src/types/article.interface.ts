export enum ArticleStatusEnum {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  ARCHIVED = "ARCHIVED",
}

export interface IArticle {
    id: string,
    title: string,
    content: string,
    excerpt: string,
    author: string,
    categories: string[],
    network: string,
    status: ArticleStatusEnum,
    featured: boolean,
    publishedAt: Date | null,
    createdAt: Date,
    updatedAt: Date
}