<template>
  <transition name="modal">
    <div class="modal-mask" @click="$emit('close')">
      <div class="modal-wrapper">
        <div class="modal-container" @click.stop="">
          <div class="modal-body">
            <div class="container">
              <div class="row">
                <div class="col-12">
                  <div v-if="params.type === 'gallery'">
                    <el-carousel
                      v-if="params.gallery.length > 1"
                      indicator-position="outside"
                      :interval="6000"
                      height="360px"
                    >
                      <el-carousel-item v-for="item in params.gallery" :key="item">
                        <img :src="item" alt="" class="image">
                      </el-carousel-item>
                    </el-carousel>

                    <div v-else>
                      <img :src="params.gallery[0]" alt="" class="image" style="height: 360px;">
                    </div>
                  </div>

                  <div v-if="params.type === 'videos'">
                    <el-carousel
                      v-if="params.videos.length > 1"
                      indicator-position="outside"
                      :autoplay="false"
                      height="360px"
                    >
                      <el-carousel-item v-for="item in params.videos" :key="item.id">
                        <YouTubeVideo
                          :data="item"
                        />
                      </el-carousel-item>
                    </el-carousel>

                    <div v-else>
                      <YoutubeVideo
                        :data="params.videos[0]"
                      />
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button @click="$emit('close')" class="button modal-button">Закрыть</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import config from '@/config'
import YoutubeVideo from "@/components/common/YoutubeVideo";

export default {
  name: 'MediaModal',
  components: { YoutubeVideo },
  data: () => ({
    config
  }),
  props: [
    'width',
    'params',
    'systemName'
  ],
  methods: {

  },
  computed: {
    template: function () {
      return this.$store.getters['calcCore/template']
    },
  }
}
</script>


<style lang="sass" scoped>
@import "@/assets/sass/utils/vars"

.container
  margin: 0
  min-width: 100%

.modal-mask
  position: fixed
  z-index: 9998
  top: 0
  left: 0
  width: 100%
  height: 100%
  background-color: rgba(0, 0, 0, .6)
  display: table
  transition: opacity .3s ease

  .modal-wrapper
    display: table-cell
    vertical-align: middle

  .modal-container
    max-width: 620px
    margin: 0 auto
    height: auto
    background-color: #fff
    border-radius: 10px
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33)
    transition: all .3s ease, height 0s

  .modal-body
    display: flex
    /*height: 80vh*/
    height: 100%
    max-height: 580px
    font-size: 18px
    padding: 15px 0
    overflow: auto

  .modal-footer
    padding: 10px 15px
    text-align: right

  .button
    width: fit-content
    padding: 0 20px

.modal-top
  width: 100%
  display: flex

.modal_image
  height: 0
  position: relative
  padding-bottom: 58%
  margin-bottom: 15px
  flex-shrink: 0

.image
  max-width: 680px
  width: 100%
  height: 100%
  object-fit: contain
  object-position: center
</style>
