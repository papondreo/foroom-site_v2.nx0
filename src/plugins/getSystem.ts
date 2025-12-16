import { catalogStore } from '@/utils/store-accessor'

export default ({ app, store }, inject) => {
  inject('getSystem', (systemName: string) => {
    const template = store.getters['calcCore/template']
    const systems = catalogStore.catalogGetter
    return systems.find(
      (system) => system.productId === template.type + template.subtype
    )
  })
}
