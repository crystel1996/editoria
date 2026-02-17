export enum ArticleStatusEnum {
  DRAFT = "Draft",
  PUBLISHED = "Published",
  ARCHIVED = "Archived",
}

export interface IArticle {
    id: string,
    title: string,
    content: string,
    excerpt: string,
    author: string,
    categories: string[],
    network: string,
    networkName?: string,
    status: ArticleStatusEnum,
    featured: boolean,
    publishedAt: Date | null,
    createdAt: Date,
    updatedAt: Date
}