export interface Product {
  id: number
  tid: number
  name: string
  nameRu: string
  type: string
  subtype: number
  minWidth?: number
  maxWidth?: number
  minHeight?: number
  maxHeight?: number
  rol_width?: number
  ico_img?: string
  prv_img?: string
  disabled: number
  sort: number

  attachmentPoint: string
  publicOnSite: number
  positionOnSiteMenu: number
}
