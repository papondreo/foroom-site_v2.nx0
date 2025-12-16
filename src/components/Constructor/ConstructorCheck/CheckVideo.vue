<template>
  <div v-if="videos.length">
    <button
      class="ui-button"
      @click="index = 0"
    >
      <i class="fa fa-video-camera"></i>
    </button>
    <CoolLightBox
      :items="videos"
      :index="index"
      :effect="'fade'"
      @close="index = null"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

import CoolLightBox from 'vue-cool-lightbox'
import 'vue-cool-lightbox/dist/vue-cool-lightbox.min.css'
import config from "@/config";
import { calculatorStore, productsStore, systemsStore } from "@/utils/store-accessor";

@Component({
  components: { CoolLightBox }
})
export default class CheckGallery extends Vue {
  public allVideos = []
  public index = null
  public systems = [
    {
      key: 1,
      systemTypeKey: 1,
      systemType: 'rolo',
      systemId: 1,
      system: 'rolo1',
      name: 'INTEGRA SLIM',
      public: 1
    },
    {
      key: 2,
      systemTypeKey: 1,
      systemType: 'rolo',
      systemId: 2,
      system: 'rolo2',
      name: 'INTEGRA BOX',
      public: 1
    },
    {
      key: 3,
      systemTypeKey: 1,
      systemType: 'rolo',
      systemId: 3,
      system: 'rolo3',
      name: 'INTEGRA BOX+',
      public: 1
    },
    {
      key: 4,
      systemTypeKey: 1,
      systemType: 'rolo',
      systemId: 4,
      system: 'rolo4',
      name: 'ROLL',
      public: 1
    },
    {
      key: 5,
      systemTypeKey: 1,
      systemType: 'rolo',
      systemId: 30,
      system: 'rolo30',
      name: 'CLIC',
      public: 1
    },
    {
      key: 6,
      systemTypeKey: 1,
      systemType: 'rolo',
      systemId: 6,
      system: 'rolo6',
      name: 'GRANDE',
      public: 1
    },
    {
      key: 7,
      systemTypeKey: 1,
      systemType: 'rolo',
      systemId: 31,
      system: 'rolo31',
      name: 'CLIC BOX',
      public: 1
    },
    {
      key: 8,
      systemTypeKey: 1,
      systemType: 'rolo',
      systemId: 24,
      system: 'rolo24',
      name: 'GRANDE BOX',
      public: 1
    },
    {
      key: 9,
      systemTypeKey: 2,
      systemType: 'zebra',
      systemId: 21,
      system: 'zebra21',
      name: 'INTEGRA SLIM DUO',
      public: 1
    },
    {
      key: 10,
      systemTypeKey: 2,
      systemType: 'zebra',
      systemId: 22,
      system: 'zebra22',
      name: 'INTEGRA BOX DUO',
      public: 1
    },
    {
      key: 11,
      systemTypeKey: 2,
      systemType: 'zebra',
      systemId: 32,
      system: 'zebra32',
      name: 'CLIC DUO',
      public: 1
    },
    {
      key: 12,
      systemTypeKey: 2,
      systemType: 'zebra',
      systemId: 33,
      system: 'zebra33',
      name: 'CLIC BOX DUO',
      public: 1
    },
    {
      key: 13,
      systemTypeKey: 2,
      systemType: 'zebra',
      systemId: 23,
      system: 'zebra23',
      name: 'GRANDE BOX DUO',
      public: 1
    },
    {
      key: 14,
      systemTypeKey: 3,
      systemType: 'ks25',
      systemId: 1,
      system: 'ks251',
      name: 'INTEGRA G-FORM',
      public: 1
    },
    {
      key: 15,
      systemTypeKey: 3,
      systemType: 'hblinds',
      systemId: 1,
      system: 'hblinds1',
      name: 'G-FORM',
      public: 1
    },
    {
      key: 16,
      systemTypeKey: 3,
      systemType: 'wood',
      systemId: 1,
      system: 'wood1',
      name: 'G-FORM WOOD 50',
      public: 1
    },
    {
      key: 17,
      systemTypeKey: 4,
      systemType: 'vblinds',
      systemId: 2,
      system: 'vblinds2',
      name: 'V-FORM PLAST',
      public: 1
    },
    {
      key: 18,
      systemTypeKey: 4,
      systemType: 'vblinds',
      systemId: 1,
      system: 'vblinds1',
      name: 'V-FORM',
      public: 1
    },
    {
      key: 19,
      systemTypeKey: 6,
      systemType: 'roma',
      systemId: 1,
      system: 'roma1',
      name: 'ROMA',
      public: 1
    },
    {
      key: 20,
      systemTypeKey: 5,
      systemType: 'plisse',
      systemId: 1,
      system: 'plisse1',
      name: 'INTEGRA PLISSE',
      public: 1
    }
  ]

  mounted() {
    this.loadVideos()
  }

  async loadVideos() {
    const { data } = await this.$axios.get(config.api.url + 'api/videos/system')
    this.allVideos = data
  }

  get template() {
    return calculatorStore.calculatedItemGetter
  }

  get videos() {
    const { type, subtype } = this.template

    const product = this.systems.find((item) => item.system === type + subtype)
    if (product?.key) {
      const a = this.allVideos
        .filter((vid) => vid.parentId === product.key)
        .map((vid) => 'https://www.youtube.com/embed/' + vid.code)

      return a
    }
    return []
  }
}
</script>

<style lang="scss" scoped>
button {
  display: inline-flex;
  margin-right: 5px;
  padding: 8px 12px;
  background: rgba(#ffffff, .8);
  font-size: 20px;
  color: $brand-orange-light;
  transition: .3s ease-in-out;
  &:hover {
    background: #ffffff;
  }
}
</style>
