<template>
  <div class="container-lg">
    <div class="row mb-3">
      <div class="col-12">
        <ui-title
          tag="h1"
          class="ui-title-1 ui-text-uppercase"
        >
          {{ title }}
        </ui-title>
      </div>

      <div
        v-if="tabs.length > 1"
        class="col-12 tabs mb-3"
      >
        <button
          v-for="(tab, i) in tabs"
          :key="`tab-${i}`"
          :class="{ tab_active: activeTab === i }"
          class="tab"
          @click="selectTab(i)"
        >
          {{ $ucFirst(tab.title) }}
        </button>
      </div>
      <div class="col-12">
        <ui-title
          tag="h2"
          class="ui-title-2 ui-text-uppercase"
        >
          {{ tabs[activeTab].title }}
        </ui-title>
      </div>
    </div>

    <div
      v-if="info.desc"
      class="row mb-3"
    >
      <div class="col-12">
        <p class="desc">{{ info.desc }}</p>
      </div>
    </div>

    <div
      class="row"
      v-for="(block, i) in info.blocks"
      :key="`block-${i}`"
    >
      <div class="col-12 setup-block">
        <p
          v-if="block.title"
          class="block-title"
        >
          {{ block.title }}
        </p>
        <div
          class="row mb-4"
          v-if="block.video"
        >
          <div class="col-sm-6">
            <YoutubeVideo
              :data="{
                url: `https://www.youtube.com/embed/${block.video}`
              }"
            />
          </div>
        </div>
        <div class="row">
          <div
            v-if="block.img"
            class="col-sm-4 col-md-3 col-12"
          >
            <img
              :src="`/img-new/system-setup/${systemName}/${block.img}`"
              class="setup-block__img"
              alt=""
            />
          </div>
          <div class="col setup-block__text">
            <p
              v-for="(text, n) in block.texts"
              :key="`text-${i}-${n}`"
              v-html="text"
            ></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import YoutubeVideo from '@/components/common/YoutubeVideo'
export default {
  name: 'SystemSetup',
  components: {
    YoutubeVideo
  },
  props: ['title', 'systemName', 'tabs'],
  data: () => ({
    activeTab: 0
  }),
  methods: {
    selectTab(i) {
      this.activeTab = i
    }
  },
  computed: {
    // tabs() {
    //   return this.$store.getters['calcLibs/systemSetup'][this.systemName]
    // },
    info() {
      return this.tabs[this.activeTab]
    }
  }
}
</script>

<style lang="sass" scoped>
.tab
  display: inline-block
  padding: 3px 15px
  margin-right: 5px
  margin-bottom: 5px
  /*min-width: max-content*/
  background: #fff
  border: 1px solid #f0f0f0
  border-radius: 5px
  transition: .3s ease-in-out
  // text-decoration: underline
  &_active
    // text-decoration: none
    color: #ffffff !important
    background: #ffa845 !important
    border-color: #ffa845 !important

  &:hover
    // text-decoration: none
    background: #ebebeb
    border-color: #ebebeb

.desc
  color: #3b3a49
// text-transform: uppercase
.block-title
  font-size: 19px
  color: #3b3a49

.setup-block
  margin-bottom: 25px

  &__text
    p
      margin-bottom: 5px

      &:first-of-type
        margin-top: 15px

  &__img
    border-radius: 5px
</style>
