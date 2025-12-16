import { findMin } from '@/libs/findMin'
import { calculatorStore } from '@/utils/store-accessor'

export default ({ app }, inject) => {
  inject('cheapestMaterial', (filterBySizes = false) => {
    let materials = calculatorStore.calculatedItemMaterials
    const { width, height } = calculatorStore.calculatedItem

    if (filterBySizes) {
      materials = materials.filter(
        (material) =>
          material.max.width >= width && material.max.height >= height
      )
    }

    const actionMaterials = materials.filter(
      (material) => material.isCurrentAction
    )

    // console.log('am', actionMaterials);

    const material = actionMaterials.length
      ? findMin(actionMaterials, 'cost')
      : findMin(materials, 'priceGroup')

    return material ? material : false
  })
}
