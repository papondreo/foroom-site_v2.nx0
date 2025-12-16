<template>
  <fieldset class="radioButton">
<!--    <silent-box-->
<!--      v-if="zoom && !disableImg"-->
<!--      class="zoom-image"-->
<!--      :image="{src: imgPath, description: ''}"-->
<!--      :thumbnail="false"-->
<!--      :thumbnailWidth="0"-->
<!--    >-->
<!--      <i class="fa fa-search-plus"></i>-->
<!--    </silent-box>-->
    <input
      :id="name+param.val"
      :checked="param.val == selectedValue"
      v-model="model"
      :name="name"
      type="radio"
      :class="{'checked': param.val == selectedValue}"
      :disabled="param.enabled !== undefined && !param.enabled"
    >
    <label :for="name+param.val">
<!--      <i class="fa fa-check" v-if="param.val === selectedValue"></i>-->
      <div
        v-if="!disableImg"
        class="img-container"
      >
        <img
          :src="imgPath"
          :alt="label"
        />
      </div>
      <span>
        <template v-if="!disableImg">
          <i class="fa fa-check-square-o" v-if="param.val === selectedValue"></i>
          <i class="fa fa-square-o" v-else></i>
        </template>

        {{ $ucFirst(label) }}
        <!--
        <br/>
        v: {{param.visible}} {{typeof param.visible}}<br/>
        e: {{param.enabled}} {{typeof param.enabled}}
        -->
      </span>
    </label>
  </fieldset>
</template>

<script>
export default {
  name: 'RadioButton',
  props: [
    'imgPath',
    'selectedValue',
    'param',
    'name',
    'label',
    'disableImg',
    'zoom'
  ],
  computed: {
    model: {
      get() {
        // console.log('RadioButton param', this.param)
        return this.param
      },
      set(val) {
        // console.log('RadioButton val', val)
        this.$emit('input', parseInt(val))
      },
    },
  }
}
</script>

<style lang="sass" scoped>
@import "@/assets/sass/utils/vars"
.radioButton
  position: relative
  height: 100%

  label
    height: 100%
    border-radius: 5px
    cursor: pointer
    text-align: center
    display: block
    color: $lightFontColor

    i
      position: absolute
      top: 8px
      left: 10px
      color: $brandMainColorLight
      font-size: 20px
      &.fa-square-o
        color: #eee

    &:hover
      .img-container
        border-color: rgba($brandMainColorLight, 0.4)

  .img-container
    // padding-bottom: calc(100% - 4px)
    margin-bottom: 10px
    border-radius: 5px
    border: 3px solid #eee
    transition: $transition

  .zoom-image
    position: absolute
    padding: 2px 8px 0
    top: 3px
    right: 3px
    color: $lightFontColor !important
    border-radius: 0 3px 0 3px
    background: rgba(#fff, .7)
    transition: $transition
    /*opacity: 0*/

    &:hover
      color: $brandMainColorLight !important

  img
    display: block
    // position: absolute
    width: 100%
    // height: 100%
    margin-bottom: 0
    background: $default-color
    //object-fit: cover
    border-radius: 2px


  /* Base for label styling */

  [type="radio"]:not(:checked),
  [type="radio"]:checked
    position: absolute
    left: -9999px

  [type="radio"] label span
    position: relative
    cursor: pointer
    display: inline-block
    transition: $transition


  [type="radio"]:disabled + label .img-container
    border-color: #eee !important

    & img
      filter: grayscale(100%)

  [type="radio"]:disabled + label span
    color: #aaa

  [type="radio"].checked + label span
    color: $brandMainColor

  [type="radio"].checked + label .img-container
    border-color: rgba($brandMainColorLight, 0.7)
  .infoBloc
    position: relative
    top: -90px
    height: 90px

  .desc
    display: block
    margin-top: 0px
    font-size: 15px
    color: #949494 !important
  @media screen and (max-width: $colSm)
    .zoom-image
      display: none

</style>
