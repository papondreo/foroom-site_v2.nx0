import Vue from 'vue'

import UiTitle from '@/components/UI/UI-Title.vue'
import UiImg from '@/components/UI/UI-Img.vue'

const components = { UiTitle, UiImg }

Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component)
})
