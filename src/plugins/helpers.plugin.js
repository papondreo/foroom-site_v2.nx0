export default {
  install(Vue, options) {
    Vue.prototype.$findMin = function (array, key) {
      let min = array[0]
      for (const i in array) {
        if (parseFloat(array[i][key]) < parseFloat(min[key])) {
          min = array[i]
        }
      }
      return min
    }

    Vue.prototype.$findMax = function (array, key) {
      let max = array[0]
      for (const i in array) {
        if (parseFloat(array[i][key]) > parseFloat(max[key])) {
          max = array[i]
        }
      }
      return max
    }

    Vue.prototype.$autoSwitchKeyboard = function (str) {
      const replacer = {
        q: 'й',
        w: 'ц',
        e: 'у',
        r: 'к',
        t: 'е',
        y: 'н',
        u: 'г',
        i: 'ш',
        o: 'щ',
        p: 'з',
        '[': 'х',
        ']': 'ъ',
        a: 'ф',
        s: 'ы',
        d: 'в',
        f: 'а',
        g: 'п',
        h: 'р',
        j: 'о',
        k: 'л',
        l: 'д',
        ';': 'ж',
        "'": 'э',
        z: 'я',
        x: 'ч',
        c: 'с',
        v: 'м',
        b: 'и',
        n: 'т',
        m: 'ь',
        ',': 'б',
        '.': 'ю',
        '/': '.'
      }

      return str.replace(/[A-z/,.;\'\]\[]/g, function (x) {
        return x == x.toLowerCase()
          ? replacer[x]
          : replacer[x.toLowerCase()].toUpperCase()
      })
    }

    Vue.prototype.$ucFirst = function (str) {
      if (!str) return str
      return str[0].toUpperCase() + str.slice(1)
    }

    Vue.prototype.$upperFirst = function (str) {
      if (!str) return str
      return str[0].toUpperCase() + str.slice(1).toLowerCase()
    }

    Vue.prototype.$declOfNum = function (number, titles) {
      const cases = [2, 0, 1, 1, 1, 2]
      return titles[
        number % 100 > 4 && number % 100 < 20
          ? 2
          : cases[number % 10 < 5 ? number % 10 : 5]
      ]
    }

    Vue.prototype.$priceSet = function (num) {
      const price = Number.prototype.toFixed.call(parseFloat(num) || 0, 2)
      const price_sep = price.replace(/(\D)/g, ',')

      if (price >= 10000) {
        return price_sep.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
      }
      return price_sep
    }

    Vue.prototype.$clearPhone = function (phone) {
      if (phone) {
        let a = phone.replace(/\D+/g, '')
        if (parseInt(a[0]) === 8) {
          a = 7 + a.slice(1)
        }
        return `+${a[0]} ${a.substring(1, 4)} ${a.substring(
          4,
          7
        )}-${a.substring(7, 9)}-${a.substring(9, 11)}`
      }
      return ''
    }
  }
}
