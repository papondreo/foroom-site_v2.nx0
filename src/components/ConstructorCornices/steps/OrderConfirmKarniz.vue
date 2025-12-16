<template>
  <div class="col-12">
    <template v-if="!$route.query.systeminfo">
      <fieldset v-if="!inCart" class="fieldset__checkbox fieldset__checkbox_inline">
        <input name="step4" v-model="confirm" type="checkbox" class="checkbox" id="cat-7">
        <label for="cat-7">Я проверил(а), всё верно</label>
      </fieldset>

      <p v-if="inCart" class="tar min">
        {{ sizes.length }}
        {{ $declOfNum(sizes.length, ['изделие', 'изделия', 'изделий']) }} добавлено в корзину
      </p>

      <footer class="constructor-footer">
        <div>
          <button @click="toPrevStep()" class="button button-prev"><i class="fa fa-angle-left" aria-hidden="true"></i>
            Назад
          </button>
        </div>

        <div>
          <nuxt-link
            v-if="inCart"
            to="/order" class="button button-next p-0"
          >
            Перейти в корзину
          </nuxt-link>

          <button
            v-if="!inCart"
            @click="addToCart()"
            :disabled="!confirm || !parseFloat(count) > '0'"
            class="button button-next add-to-cart"
          >
            Добавить в корзину
          </button>
        </div>
      </footer>
    </template>


<!--    <div v-if="inCart" class="row mt-4">-->
<!--      <div class="col-12">-->
<!--        <p @click="toSizes()" class="link">Добавить такое же изделие <span>{{ system.title }}</span> с другими размерами-->
<!--        </p>-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>

<script>
import config from '@/config'
import { calculatorStore, cartStore } from "@/utils/store-accessor";
export default {
  name: 'OrderConfirmKarniz',
  props: [
    'systemName',
    'data'
  ],
  data: function () {
    return {
      config,
      confirm: false,
      inCart: false,
      count: 1,
      publicPath: '/_images/constructor/',
    }
  },
  created: function () {
    // this.issetInCart()
  },
  methods: {
    toSizes: function () {
      const steps = this.$store.getters['calcSteps/stepsMap'][this.system.productId].filter(step => step.inPaginator)
      let step = 1
      for (let i in steps) {
        if (steps[i].components.find(comp => comp.name === 'Sizes')) {
          step = parseInt(i) + 1
          this.$store.dispatch('calcSteps/setStep', step)
        }
      }

      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
    toPrevStep: function () {
      this.step > 1 ? this.$store.dispatch('calcSteps/setStep', this.step - 1) : false
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
    calcSale: function () {
      const old_price = this.template.old_price
      const price = this.template.price

      if (old_price > price) {
        return Math.round(100 - 100 * price / old_price);
      } else {
        return Math.round(100 - 100 * old_price / price);
      }
    },
    issetInCart: function () {
      // const orders = JSON.parse(localStorage.getItem('PSorder__items'))
      //
      // const template = {}
      // Object.assign(template, this.template)
      // delete template.amount
      //
      // if (orders) {
      //     for (let order of orders) {
      //         delete order.izd_ico
      //         delete order.material_ico
      //         delete order.color_ico
      //         delete order.wall_ico
      //         delete order.lambr_ico
      //         delete order.aspMatt
      //         delete order.aspTName
      //         delete order.amount
      //
      //         if(this.objectEq(order, template)) {
      //             this.inCart = true
      //             return
      //         }
      //     }
      // }

    },

    objectEq: function (x, y) {
      if (x === y) return true;
      if (!(x instanceof Object) || !(y instanceof Object)) return false;
      if (x.constructor !== y.constructor) return false;
      for (var p in x) {
        if (!x.hasOwnProperty(p)) continue;
        if (!y.hasOwnProperty(p)) return false;
        if (x[p] === y[p]) continue;
        if (typeof (x[p]) !== "object") return false;
        if (!this.objectEq(x[p], y[p])) return false;
      }

      for (p in y) {
        if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) return false;
      }
      return true;
    },
    addToCart: function () {
      const product = this.$store.getters['calcCore/products'].filter(product => product.ptype + product.category === this.system.productId)

      let nameRus
      switch (this.systemName) {
        case 'rolo':
          nameRus = 'РУЛОННЫЕ ШТОРЫ'
          break;
        case 'duo':
          nameRus = 'РУЛОННЫЕ ШТОРЫ DUO'
          break;
        case 'hblinds':
          nameRus = 'ГОРИЗОНТАЛЬНЫЕ ЖАЛЮЗИ'
          break;
        case 'vblinds':
          nameRus = 'ВЕРТИКАЛЬНЫЕ ЖАЛЮЗИ'
          break;
        case 'plisse':
          nameRus = 'ШТОРЫ ПЛИССЕ'
          break;
        case 'roma':
          nameRus = 'РИМСКИЕ ШТОРЫ'
          break;
        case 'karniz':
          nameRus = 'ПРОФИЛЬНЫЕ КАРНИЗЫ'
          break;
      }

      this.cartTemplates.templates.map((template, i) => {
        const order = {
          ...template,
          // izd_ico: "https://media.foroom.ru/docs/kons/load/" + product[0].icom,
          // material_ico: "https://media.foroom.ru/docs/kons/load/" + this.material.pic_turn,
          window_img: this.system.windowImg,
          izd_ico: config.rootPath + 'img/' + this.prvImg,
          material_ico: config.rootPath + 'img/' + this.materialImg,
          color_ico: "https://media.foroom.ru/2012/images/null.png",
          wall_ico: "https://media.foroom.ru/2012/images/null.png",
          lambr_ico: "https://media.foroom.ru/2012/images/null.png",
          aspMatt: '',
          aspTName: nameRus
        }
        order.amount = this.count
        order.NumberOfRows = this.calcCornices.NumberOfRows
          if(this.template.subtype != 1){
              order.currentTemplates = this.calcCornices.currentTemplates
          }else{
              let arr = []
              let materials = this.$store.getters['calcCore/params']['oParams']['karniz']['oParams']['karn_tube1_type']['materials']
              let name = materials[this.template.karniz.karn_tube1_type].name.slice(materials[this.template.karniz.karn_tube1_type].name.indexOf('м'), materials[this.template.karniz.karn_tube1_type].name.length).split(',')
              name =  name.length > 2 ? name[name.length-1] + ',' + name[name.length-2] : name[name.length-1]
              arr.push({url:this.publicPath+'cornices/check/tube'+name+'.png', val:0})
              arr.push({url:this.publicPath+'cornices/check/tube'+name+'.png', val:1})
              // Затем кронштейн
              arr.push({url:this.publicPath+'cornices/check/bracket_'+this.template.karniz.karn_bracket_type+'.png', val:2})
              //Затем наконечник
              arr.push({url:this.publicPath+'cornices/check/tip_'+this.template.karniz.karn_tip1_type+'.png', val:3})
              //Затем кольца
              arr.push({url:this.publicPath+'cornices/check/ring_'+this.template.karniz.karn_ring1_type+'.png', val:4})
              order.currentTemplates = arr
          }

        order.templateRus = this.calcCornices.templateRus
        order.oldPrice = this.calcCornices.oldPrice
        order.price = this.calcCornices.price

        // const template = Object.assign({}, res.item)
        template.amount = this.count
        // if(!order.name)order.name = {val: product[0].name};
        // const templateRus =  Object.assign({}, res.item_rus)
        this.cartTemplates.templatesRus[i].amount.val = this.count
        // templateRus.amount.val = this.count

        //console.log('send to cart', order);

        // localStorage.setItem('PSforoom__calculatorPSlast__item', JSON.stringify(template))
        const a = localStorage.getItem('cartItems')

        let items = false
        if (a) {
          items = JSON.parse(a)
        }

        if (items && items.length) {
          const itemsRus = JSON.parse(localStorage.getItem('cartItemsParams'))

          items.push(order)
          itemsRus.push(this.cartTemplates.templatesRus[i])

          try {
            localStorage.setItem('cartItems', JSON.stringify(items))
            localStorage.setItem('cartItemsParams', JSON.stringify(itemsRus))
            console.log('---->')
          } catch (e) {
            console.log('errrrr')
            console.log(e);
          }

        } else {
          let o = []
          let or = []
          o.push(order)
          or.push(this.cartTemplates.templatesRus[i])
            if(!or[0].height) or[0].height = {val: ''}
          o = JSON.stringify(o)
          or = JSON.stringify(or)
            //console.log(or);
          // console.log(order);
           //console.log(this.cartTemplates.templatesRus[i])

          try {
            localStorage.setItem('cartItems', o)
            localStorage.setItem('cartItemsParams', or)
            // console.log('<----')
          } catch (e) {
            //console.log('errrrr2222')
            console.log('Ошибка ' + e.name + ":" + e.message + "\n" + e.stack);
          }
        }


        cartStore.updateCart({
          item: order,
          itemRus: this.cartTemplates.templatesRus[i]
        })
      })

      this.inCart = true
      this.count = 1
      this.$store.dispatch('common/setMessage', `${this.sizes.length} ${this.$declOfNum(this.sizes.length, ['изделие', 'изделия', 'изделий'])} добавлено в Корзину`)
      setTimeout(() => {
        this.$store.dispatch('common/clearMessage')
      }, 3000)

      this.goalTracking()

      const cartItems = JSON.parse(localStorage.getItem('cartItems'))
      const cartItemsCount = cartItems.reduce((acc, item) => acc + item.amount, 0)
      this.$store.dispatch('common/setCartCount', cartItemsCount)
    },

    goalTracking() {
      this.$saleForoomCounter('addbusket');
      this.$yandexMetrika.reachGoal('NF_addToCart');

      // this.$saleForoomCounter('addbusket')
      // this.$yandexMetrika.reachGoal('NF_addToCart');
      // this.$ga().event('screen', 'NF_addToCart')
    },
  },
  computed: {
    template: function () {
      return this.$store.getters['calcCore/template']
    },
    templateRus: function () {
      return this.$store.getters['calcCore/templateRus']
    },
    system: function () {
      return this.$getSystem(this.systemName)
    },
    step: function () {
      return this.$store.getters['calcSteps/step']
    },
    material: function () {
      return this.$store.getters['calcCore/material']
    },
    sizes: function () {
      return this.$store.getters['calcCore/sizes']
    },
    cartTemplates: function () {
      return this.$store.getters['calcCore/cartTemplates']
    },
    prvImg: function () {
        if(this.template.type + this.template.subtype === 'karniz1'){
            return '0.jpg'
        }else{
            const pic = this.template.MaterialCalc == 2 ? this.material.img.prv2: this.material.img.prv1
            if (pic === '0.jpg') {
                return this.material.img.prv2
            }
            return pic
        }
    },

    materialImg: function () {
        if (this.template.type + this.template.subtype === 'karniz1') {
            return '0.jpg'
        } else {
            const pic = this.template.MaterialCalc == 2 ? this.material.img.ico2 : this.material.img.ico1
            if (pic === '0.jpg') {
                return this.material.img.ico2
            }
            return pic
        }
    },
      calcCornices () {
          return this.$store.getters['calcCornices/data']
      },
  }
}
</script>


<style lang="sass" scoped>
/deep/
@import "@/assets/sass/utils/vars"
@import "@/assets/sass/constructor/scheme-system-step"
</style>
