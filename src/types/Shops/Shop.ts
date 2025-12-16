import { Payer } from '@/types/Shops/Payer'

export interface Shop {
  id: number
  name: string
  contragent_id: number
  payer_id: number
  pf_id: number
  dpf_id: number
  rt_id: number
  scenario_id: number
  pic_img: string
  city: string
  address: string
  email: string
  site: string
  isWww: boolean
  isPartner: boolean
  isComplect: boolean
  isService: boolean
  coords_geo: string[]
  schedule_json: any[]
  types_json: string[]
  company_name: string
  company_address: string
  comment: string
  payer: Payer
  phones: string[]
  distance: number
}
