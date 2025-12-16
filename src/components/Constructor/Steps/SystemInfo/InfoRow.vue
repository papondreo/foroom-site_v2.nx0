<template>
  <div class="block">
    <p
      v-for="param in block"
      :key="param.alias"
    >
      {{ param.name }}: <span>{{ param.val }} {{ param.mes }}</span>
      <span
        v-if="param.alias === 'material'"
        class="descr"
      >
        точный оттенок материала определяется по каталогу
      </span>
    </p>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { calculatorStore } from '@/utils/store-accessor'

@Component
export default class InfoRow extends Vue {
  @Prop({ required: true })
  readonly params

  get block() {
    const row = this.params.map((param) => {
      if (param === 'sizes') {
        return ['width', 'height', 'gab_width', 'gab_height'].map(
          (p) => calculatorStore.calculatedItemRusGetter[p]
        )
      }
      return calculatorStore.calculatedItemRusGetter[param]
    })
    return row.flat().filter((i) => i)
  }
}
</script>

<style lang="scss" scoped>
.block {
  background-color: #fff;
  padding: 6px 12px;
  border-radius: 4px;
  margin-bottom: 4px;
}
p {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  span {
    font-weight: 400;
    &.descr {
      width: 100%;
      font-size: 13px;
      font-weight: 300;
      color: #4d4d4d;
    }
  }
}
hr {
  display: block;
  height: 1px;
  margin: 12px 0;
  border: none;
  border-bottom: 1px solid #ccc;
}
</style>
