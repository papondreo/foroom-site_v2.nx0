export interface Page {
  id?: number
  parentId?: number
  public?: number
  showInMenu?: number
  positionInMenu?: number
  breadcrumbsTitle: string
  menuTitle: string
  h1: string
  url: string
  cover?: string
  seoTitle?: string
  seoKeywords?: string
  seoDescription?: string
}
