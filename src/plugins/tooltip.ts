import Vue from 'vue'
import Tooltip from 'vue-directive-tooltip/src/index'
import 'vue-directive-tooltip/dist/vueDirectiveTooltip.css'

Vue.use(Tooltip, {
  delay: 300,
  placement: 'left',
  class: 'tooltip-red',
  triggers: ['hover'],
  offset: 0
})
