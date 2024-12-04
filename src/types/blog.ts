export interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  status: 'draft' | 'published';
  createdAt: Date;
  updatedAt: Date;
}

export interface PostFormData {
  title: string;
  content: string;
  excerpt: string;
}