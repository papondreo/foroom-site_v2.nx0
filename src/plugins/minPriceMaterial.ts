import { findMin } from '@/libs/findMin'

export default ({ app, store }, inject) => {
  inject('minPriceMaterial', () => {
    const { materialRest } = store.getters['calcCore/params']

    const materials = Object.values(store.getters['calcCore/params'].materials)
      .filter(
        (material) =>
          material.calc_enabled && parseFloat(material.ost) > materialRest.red
      )
      .map((material) => {
        material.tabAlias = material.isCurrentAction
          ? material.currentActionInfo.alias
          : 'mainCollection'
        return material
      })

    const actionMaterials = materials.filter(
      (material) => material.isCurrentAction
    )
    const material = actionMaterials.length
      ? findMin(actionMaterials, 'cost')
      : findMin(materials, 'priceGroup')

    return material ? material : false
  })
}
