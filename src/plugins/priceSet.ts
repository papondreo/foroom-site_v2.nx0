export default ({ app }, inject) => {
  inject('priceSet', (num: number | string) => {
    if (typeof num === 'string') {
      num = parseFloat(num)
    }

    const price = Number.prototype.toFixed.call(num || 0, 2)
    const priceSep = price.replace(/(\D)/g, ',')

    if (parseFloat(price) >= 10000) {
      return priceSep.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
    }
    return priceSep
  })
}
