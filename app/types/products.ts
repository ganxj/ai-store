export interface Product {
  id: number
  slug: string
  type: 'tools' | 'gpts'
  name: string
  website_url: string
  description: string
  category: string
  developer: string
  email: string
  logo: string
  images: string[]
  overview: string
  approved: boolean
  create_time: number
  tags: string[]
  pricing_model: 'free' | 'free trial' | 'freemium'| 'paid'| 'price unknown'
  have_detail: boolean
}

export interface ProductContact {
  id: number
  type: 'tools' | 'gpts'
  name: string
  website_url: string
  description: string
  category: string
  developer: string
  email: string
  logo: string
  images: string[]
  tags: string[]
  overview: string
  pricing_model: 'free' | 'free trial' | 'freemium'| 'paid'| 'price unknown'
  create_time: number
  status: 'wait_deal' | 'refuse' | 'employ'
}
export interface Blog {
  id: string
  title: string
  date: string
}
export interface Post {
  title: string
  description: string
  date: string
  body: string
  slug: string
  slugAsParams: string
  currentPage: number
}

