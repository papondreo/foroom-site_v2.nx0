<template>
  <div class="ui-radio-button">
    <CoolLightBox
      :items="[imageSrc]"
      :index="index"
      :effect="'fade'"
      @close="index = null"
    />
    <button
      v-if="zoomImage"
      class="zoom-button"
      @click="index = 0"
    >
      <i class="fa fa-search-plus"></i>
    </button>
    <label
      :for="`${uniqId}-${value}`"
      :class="{ checked: value === model }"
    >
      <i v-if="value === model" class="fa fa-check-square-o"></i>
      <i v-else class="fa fa-square-o"></i>
      <input
        v-model="model"
        :value="value"
        type="radio"
        :id="`${uniqId}-${value}`"
        :class="{ checked: value === model }"
      />
      <div
        v-if="!disableImg"
        class="img-container"
      >
        <img
          :src="imageSrc"
          :alt="label"
        />
      </div>
      <span>
<!--        {{ model }} {{ value }}-->
        {{ $ucFirst(label) }}
        <span
          class="description"
          v-if="description && value === model"
        >
          {{ description }}
        </span>
      </span>
    </label>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, ModelSync } from 'nuxt-property-decorator'
import CoolLightBox from 'vue-cool-lightbox'
import 'vue-cool-lightbox/dist/vue-cool-lightbox.min.css'

@Component({
  components: {
    CoolLightBox
  }
})
export default class UiCheckbox extends Vue {
  @ModelSync('checked', 'change', { type: String | Number })
  readonly model!: string | number

  @Prop({ required: true })
  readonly uniqId!: string

  @Prop()
  readonly label!: string

  @Prop({ default: null })
  readonly description: string

  @Prop({ required: true })
  readonly value!: string

  @Prop({ default: false })
  readonly disableImg: string

  @Prop()
  readonly imageSrc: string

  @Prop({ default: false })
  readonly zoomImage: boolean

  public index = null
}
</script>

<style lang="scss" scoped>
.ui-radio-button {
  position: relative;
  height: 100%;

  .zoom-button {
    position: absolute;
    padding: 2px 8px 0;
    top: 3px;
    right: 3px;
    color: #aaa !important;
    border-radius: 0 3px 0 3px;
    background: rgba(#fff, .7);
    transition: .3s ease-in-out;
    /*opacity: 0*/

    &:hover {
      color: $brand-orange-light !important
    }
  }
  label {
    height: 100%;
    border-radius: 5px;
    cursor: pointer;
    text-align: center;
    display: block;
    color: #949494;

    i {
      position: absolute;
      top: 8px;
      left: 10px;
      color: $brand-orange-light;
      font-size: 20px;
      &.fa-square-o {
        color: #eee;
      }
    }
    .description {
      display: block;
      font-size: 14px;
      color: #aaa !important;
    }
    &:hover {
      .img-container {
        border-color: rgba($brand-orange-light, 0.4);
      }
    }
  }
  .img-container {
    // padding-bottom: calc(100% - 4px)
    margin-bottom: 10px;
    border-radius: 5px;
    border: 3px solid #eee;
    transition: 0.3s ease-in-out;
  }
  .zoom-image {
    position: absolute;
    padding: 2px 8px 0;
    top: 3px;
    right: 3px;
    color: #949494 !important;
    border-radius: 0 3px 0 3px;
    background: rgba(#fff, 0.7);
    transition: 0.3s ease-in-out;
    /*opacity: 0*/

    &:hover {
      color: $brand-orange-light !important;
    }
  }
  img {
    display: block;
    // position: absolute
    width: 100%;
    // height: 100%
    margin-bottom: 0;
    background: #ffffff;
    //object-fit: cover
    border-radius: 2px;
  }

  /* Base for label styling */

  [type='radio']:not(:checked),
  [type='radio']:checked {
    position: absolute;
    left: -9999px;
  }
  [type='radio'] label span {
    position: relative;
    cursor: pointer;
    display: inline-block;
    transition: 0.3s ease-in-out;
  }

  [type='radio']:disabled + label .img-container {
    border-color: #eee !important;

    & img {
      filter: grayscale(100%);
    }
  }
  [type='radio']:disabled + label span {
    color: #aaa;
  }
  [type='radio'].checked + label span {
    color: $brand-orange;
  }
  [type='radio'].checked + label .img-container {
    border-color: rgba($brand-orange-light, 0.7);
  }
  @media screen and (max-width: $colSm) {
    .zoom-image {
      display: none;
    }
  }
  label.checked span {
    color: $brand-orange;
  }
  label.checked .img-container {
    border-color: rgba($brand-orange-light, 0.7);
  }
}
</style>
