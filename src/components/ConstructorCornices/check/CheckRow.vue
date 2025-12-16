<template>
  <div>
    <p
      v-if="stepNum"
      class="step-title"
      @click="open = !open"
    >
      Шаг {{ stepNum }}
      <i
        class="fa"
        :class="{'fa-angle-down' : open, 'fa-angle-up' : !open}"
      />
    </p>
    <div :class="{'check-step-block' : stepNum, 'check-step-block_hidden':  !open }">
      <div
        v-for="row in params"
        :key="row.alias"
        v-if="row.alias !== 'rol_width' || sizes.length === 1"
        class="row"
      >
        <div class="col-12" v-if="row.alias === 'sizes'">
          <div class="row">
            <div class="col-12" v-if="row.params.length > 1">
              <p :class="{'not-selected-item': step < stepNum}">
                {{ $ucFirst(row.name) }}
              </p>
            </div>
          </div>

          <div
            v-for="(r, i) in row.params"
            :key="`p${i}`"
            class="row"
          >
            <div class="col-auto">
              <p :class="{'not-selected-item': step < stepNum}">
                {{ $ucFirst(r.name) }}
              </p>
            </div>
            <div class="col right">
              <p
                v-if="!loading"
                :class="[step < stepNum ? 'not-selected-item' : 'selected-item', {'system-title': parseInt(stepNum) === 0}]"
              >
                {{ r.val }}
              </p>
              <Loader v-else/>
            </div>
          </div>
        </div>

        <template v-else>
          <div class="col-auto">
            <p :class="{'not-selected-item': step < stepNum}">
              {{ $ucFirst(row.name) }}
              <template v-if="row.mes">, {{ row.mes.replace(/\./g, "") }}</template>
              :
            </p>
          </div>
          <div class="col right">
            <p
              v-if="!loading"
              :class="[step < stepNum ? 'not-selected-item' : 'selected-item', {'system-title': parseInt(stepNum) === 0}]"
            >
              <a
                v-if="row.alias === 'MaterialCalc'"
                href="https://sale.foroom.ru/adv_uploads/rotateMaterial.pdf"
                target="_blank"
                class="tdu"
              >
                <i class="fa fa-info-circle mr-1"></i>
                {{ row.val }}
              </a>
              <template v-else>
                {{ row.val }}
              </template>
            </p>
            <Loader v-else/>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckRow',
  components: {
    Loader: () => import('../../../components/ConstructorCornices/Loader')
  },
  props: [
    'data',
    'systemTitle',
    'stepNum'
  ],
  data: () => ({
    open: false
  }),
  created () {
    this.open = this.stepNum <= this.step
  },
  watch: {
    step: function (val) {
      this.open = this.stepNum <= val
    }
  },
  computed: {
    params: function () {
      const params = this.data.params.filter(key => {
        if (!this.$store.getters['calcCore/templateRus'][key]) {
          if (key === 'sizes'|| key === 'NumberOfRows') {
            return true
          } else {
            // console.log('notice:', `${this.systemTitle.toUpperCase()} - Undefined key ${key} in step ${this.stepNum}`)
          }
        } else {
          return true
        }
      }).map(i => {
        if (i === 'sizes') {
          const params = this.sizes.map((size, i) => {
            return {
              name: i === 0 && this.sizes.length === 1 ? `размеры по замеру (Ш х В, ${this.$store.getters['calcCore/templateRus']['width'].mes.replace(/\./g, "")}):` : `створка ${i+1}:`,
              val: `${size.width / 10} x ${size.height / 10}`
            }
          })
          return {
            alias: i,
            name: `размеры по замеру (Ш х В, ${this.$store.getters['calcCore/templateRus']['width'].mes.replace(/\./g, "")})`,
            params
          }
        }
        if (i === 'NumberOfRows'){
          return {
            alias: i,
            name: 'Количество рядов',
            val: this.dataCornices.NumberOfRows
          }
        }

        return this.$store.getters['calcCore/templateRus'][i]
      })
      return params
    },
    loading: function () {
      return this.$store.getters['common/loading']
    },
    step: function () {
      return this.$store.getters['calcSteps/step']
    },
    sizes: function () {
      return this.$store.getters['calcCore/sizes']
    },
    dataCornices() {
      return this.$store.getters['calcCornices/data']
    }
  }
}
</script>

<style lang="sass" scoped>
@import "@/assets/sass/utils/vars"
@import "@/assets/sass/constructor/check"
</style>
