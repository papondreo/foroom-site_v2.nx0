const findMax = (array, key) => {
  let max = array[0]
  for (let i in array) {
    if (parseFloat(array[i][key]) > parseFloat(max[key])) {
      max = array[i]
    }
  }
  return max
}

export default ({ app, store }, inject) => {
  inject('getMaterials', () => {
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

    // если выбрано несколько створок фильтруем материалы по наибольшим размерам
    if (store.getters['calcCore/sizes'].length > 1) {
      const maxHeight = findMax(store.getters['calcCore/sizes'], 'height').height
      const maxWidth = findMax(store.getters['calcCore/sizes'], 'width').width

      return materials.filter(material => material.max.width >= maxWidth && material.max.height >= maxHeight)
    }
    return materials
  })
}
