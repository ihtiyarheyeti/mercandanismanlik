export interface Blog {
  id: number
  title: string
  content: string
  excerpt: string
  featured_image: string
  author_name: string
  category_id: number
  category_name: string
  published_at: string
  tags: string[]
}

export interface BlogCategory {
  id: number
  name: string
  slug: string
  description?: string
}

export interface BlogComment {
  id: number
  yazar: string
  tarih: string
  icerik: string
} 