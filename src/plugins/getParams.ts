export default ({ app, store }, inject) => {
  inject('getParams', (param: string) => {
    const obj = store.getters['calcCore/params'].oParams[param].options
    return Object.keys(obj)
      .map(key => obj[key])
      .filter(option => option.visible)
  })
}
