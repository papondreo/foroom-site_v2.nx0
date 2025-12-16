export interface CatalogProduct {
  productId: string
  title: string
  system: string
  url: string
  setupUrl: string
  systemName: string
  sizesScheme: string
  img: string
  productAdvantages: AdvantageBlock[]
  productImages: any
  catalogParams: string[]
  productInfo: ProductInfoBlock[]
  windowImg: string
  model3Durl: string
  model3Dsize: string
  measure: Measure
  attachmentPoint: string
  box: number
  minWidth: string
  maxWidth: string
  minHeight: string
  maxHeight: string
  controls?: Controls
  controlParams?: ControlParams

  catalogUrl: string
  calculatorUrl: string
}

export interface Measure {
  photo: string
  video: string
}

export interface Controls {
  default: string
  checkboxes: string[]
}

export interface ControlParams {
  plasticChain: string[]
  remote: number[]
}

export interface ProductInfoBlock {
  img: string
  title: string
  text: string[]
}

export interface AdvantageBlock {
  img: string
  description: string[]
}
