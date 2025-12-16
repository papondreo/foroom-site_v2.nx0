<template>
  <fieldset
    :key="material.tid"
    class="material-card"
  >
    <input
      @change="setMaterial(material)"
      :id="material.tid"
      name="material"
      type="radio"
      class="checkbox"
      :checked="material.tid === template.material"
    />
    <label :for="material.tid">
      <div
        class="img"
        :style="`backgroundImage: url(${getMaterialIcon(material.img)})`"
      >
        <i
          v-if="material.eco"
          class="fa fa-leaf eco"
        ></i>
        <p
          v-if="material.new"
          class="new"
        >
          NEW
        </p>
      </div>
      <p
        v-if="material.isCurrentAction"
        class="mark-action"
      >
        {{ Math.round(material.currentActionInfo.perc * 100) }}%
      </p>
      <span>{{ material.name }}</span>
    </label>
  </fieldset>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

import { Material } from '@/types/Materials'
import { calculatorStore } from '@/utils/store-accessor'

@Component
export default class MaterialCard extends Vue {
  @Prop({ required: true })
  material: Material

  getMaterialIcon({ ico1, ico2 }) {
    const icon = ico1 ? ico1 : ico2
    return `https://www.foroom.ru/img/${icon}`
  }

  setMaterial({ tid }) {
    const template = {
      ...this.template,
      material: tid
    }
    calculatorStore.calculate(template)
  }

  get params() {
    return calculatorStore.calculatedItemParamsGetter
  }

  get template() {
    return calculatorStore.calculatedItem
  }
}
</script>

<style lang="scss" scoped>
.material-card {
  width: 20%;
  position: relative;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  display: inline-block;
  margin-bottom: 20px;
  input {
    position: absolute;
    z-index: -1;
    opacity: 0;
  }
  label {
    text-align: center;
    font-size: 16px;
    line-height: 1.2;
    cursor: pointer;
    .img {
      position: relative;
      height: auto;
      width: 100%;
      padding-bottom: 100%;
      margin-bottom: 10px;
      border: 2px solid #f5f5f8;
      border-radius: 5px;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      transition: .3s ease-in-out;
    }
    span {
      display: block;
      word-break: break-word;
    }
  }
  p.mark {
    position: absolute;
    top: 9px;
    left: -2px;
    padding: 2px 6px;
    color: #fff;
    background: #de0000;
    font-size: 14px;
    &::after {
      content: "";
      position: absolute;
      left: 0;
      top: 100%;
      border: 2px solid transparent;
      border-top: 2px solid #8f0000;
      border-right: 2px solid #8f0000;
    }
  }
  p.mark-action {
    position: absolute;
    top: 7px;
    left: 8px;
    padding: 4px 6px 2px;
    color: #fff;
    background: #de0000;
    font-size: 16px;
    text-transform: uppercase;
    &::after {
      content: "";
      position: absolute;
      left: 0;
      top: 100%;
      border: 3px solid transparent;
      border-top: 3px solid #8f0000;
      border-right: 3px solid #8f0000;
    }
  }
  p.new {
    position: absolute;
    right: -3px;
    bottom: -3px;
    padding: 1px 4px;
    margin-bottom: 10px;
    background: #7ed321;
    font-size: 14px;
    color: #fff;
    transform: rotate(-45deg);

    &:before {
      content: '';
      position: absolute;
      bottom: 0;
      right: 41px;
      border: 11px solid transparent;
      border-top: 10px solid #7ed321 !important;
      border-right: 10px solid #7ed321 !important;
    }
    &:after {
      content: '';
      position: absolute;
      top: 0;
      right: -21px;
      border: 11px solid transparent;
      border-left: 10px solid #7ed321;
      border-top: 10px solid #7ed321;
    }
  }
  input:hover + label {
    .img {
      border-color: rgba($brand-orange, 0.65);
    }
  }
  input:checked + label {
    color: $brand-orange;
    .img {
      border-color: $brand-orange;
    }
  }
  input[disabled] + label:hover {
    cursor: default;
    .img {
      border-color: #f5f5f8;
    }
  }
}
.eco {
  position: absolute;
  bottom: -5px;
  left: -5px;
  font-size: 24px;
  color: #18c139;
  background: #f5f5f5;
  border-radius: 50%;
  padding: 4px 5px 1px 1px;
}
.eco-description {
  margin-bottom: 30px;
  font-size: 16px;

  i {
    color: #18c139;
  }
}
@media screen and (max-width: $colMd) {
  .material-card {
    width: calc(33.333333% - 15px);
  }
}

@media screen and (max-width: $colXs) {
  .material-card {
    width: calc(50% - 15px);
  }
}
</style>
