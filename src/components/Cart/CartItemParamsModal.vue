<template>
  <div>
    <div
      class="overlay"
      @click="closeModal"
    ></div>
    <div class="params-modal">
      <div class="row m-0">
        <div class="col-12">
          <p class="title">{{ itemParams.name.val }}</p>
        </div>
        <template v-for="(char, i) in itemParams">
          <div
            :key="`i-${i}`"
            v-if="!disabledParams.includes(i)"
            class="col-md-6"
          >
            <p class="param">
              {{ char.name }}:
              <span>{{ char.val }} {{ char.mes }}</span>
            </p>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// @ts-nocheck
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class CartItemParamsModal extends Vue {
  @Prop({ required: true })
  readonly itemParams

  public disabledParams = [
    'izd_ico',
    'material_ico',
    'summ',
    'amount',
    'name',
    'price',
    'old_price',
    'lamels'
  ]

  closeModal() {
    this.$emit('close')
  }
}
</script>

<style lang="scss" scoped>
.overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.75);
  z-index: 10000;
  cursor: pointer;
}
.params-modal {
  position: fixed;
  width: 90%;
  max-width: 700px;
  height: fit-content;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  padding: 24px 0;
  border-radius: 5px;
  background: #fff;
  z-index: 10001;
  box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.25);

  .param {
    color: #7f828b;
    span {
      color: $text-color;
    }
  }

  .title {
    font-size: 20px;
    margin-bottom: 12px;
    font-weight: 600;
  }

  .close-button {
    position: absolute;
    top: 5px;
    right: 10px;
  }
}
</style>
