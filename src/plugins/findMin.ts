export default ({ app }, inject) => {
  inject('findMin', (array: any, key: string) => {
    let min = array[0]
    for (const i in array) {
      if (parseFloat(array[i][key]) < parseFloat(min[key])) {
        min = array[i]
      }
    }
    return min
  })
}
