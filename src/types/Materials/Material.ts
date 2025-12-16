export interface Material {
  id: number
  tid: number
  name: string
  width1: number
  height1: number
  width2: number
  height2: number
  cost: number
  ost: number
  rev: number
  priceGroup: number
  colorGroup: number
  blackoutGroup: number
  disabled: number
  new: number
  eco: number
  enabled: boolean
  rol_width: number
  rol_width_width: number
  img: Images
  currentActionInfo: CurrentActionInfo
  isCurrentAction: boolean
  minWidth: number
  minHeight: number
  maxWidth: number
  maxHeight: number
  maxWR: number
  maxHR: number
  calc_rev: number
  calc_enabled: boolean
  icon: string
  min: Sizes
  max: Sizes
  tabAlias?: string
}

interface Sizes {
  width: number
  height: number
}

interface Images {
  ico: string
  ico1?: string
  ico2?: string
  prv1?: string
  prv2?: string
}

interface Colors {
  txt: string
  bgr: string
}

interface CurrentActionInfo {
  img: string
  cost: number
  old_cost: number
  show_old_price: boolean
  slider_top: boolean
  slider_top_json: any[]
  alias: string
  name: string
  perc: number
  colors: Colors
}
