<template>
  <div v-if="row && template">
    <p
      v-for="p in row"
      :key="p.alias"
    >
      {{ p.name }}: <span>{{ p.val }}</span>
    </p>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

import { calculatorStore } from '@/store'

@Component
export default class CheckParamsRow extends Vue {
  @Prop({ required: true })
  readonly params: string[]

  get template() {
    return calculatorStore.calculatedItemGetter
  }

  getSizes() {
    const { width, height } = calculatorStore.calculatedItemRusGetter
    return {
      alias: 'sizes',
      key: 0,
      name: `размеры по замеру (Ш х В, ${width.mes})`,
      val: `${width.val} x ${height.val}`,
      mes: null,
      descr: ''
    }
  }

  get row() {
    const row = this.params.map((param) => {
      if (param === 'sizes') {
        return this.getSizes()
      }
      return calculatorStore.calculatedItemRusGetter[param]
    })
    return row.filter((i) => i)
  }
}
</script>

<style lang="scss" scoped></style>
