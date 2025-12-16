<template>
  <div
    v-if="showFakeButton && $route.path !== '/partneram-foroom'"
    @click="initJivoSite"
    :disabled="disabled"
    :class="{ disabled: 'button-jivo-hide' }"
    class="button-jivo jdiv label_2ae _right_541 _pad100_a38 _init_52e notranslate"
    style="background: rgba(0, 0, 0, 0) linear-gradient(95deg, rgb(223, 119, 28) 20%, rgb(223, 119, 28) 80%) repeat scroll 0% 0%;"
  >
    <div class="jdiv jdiv-desktop">
      <div class="jdiv hoverl_9b3">
        <div class="jdiv lbContainer_0a0">
          <div
            style="display: none"
            class="jdiv LabelButtons_ba2 _right_9a0"
          >
            <div class="jdiv labelButton_396">
              <div class="jdiv text_5e0 chat_c75">
                <div class="jdiv title_13c">Написать в чат</div>
              </div>
            </div>
            <div class="jdiv buttonsCorner_250 rightCorner_8c9"></div>
          </div>
        </div>
      </div>
      <div
        style="
          font-size: 14px;
          font-family: Arial, Arial;
          font-style: normal;
          color: rgb(240, 241, 241);
        "
        class="jdiv text_7a9"
      >
        Напишите нам, мы онлайн!
      </div>
      <div
        style="color: rgb(240, 241, 241)"
        class="jdiv copy_606"
      >
        <div class="jdiv logo_625 _right_44a">
          <div class="jdiv hoverBox_a34"></div>
          <div
            style="
              background-image: url(data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2225.688%22%20height%3D%2218%22%3E%0A%20%20%20%20%3Cpath%20fill%3D%22%23F0F1F1%22%20d%3D%22M7.155%205.93H6.134a.4.4%200%2000-.287.128.378.378%200%2000-.123.268v7.448a.377.377%200%2000.123.28.389.389%200%2000.287.12h1.021a.382.382%200%2000.274-.12.353.353%200%2000.131-.28V6.33a.375.375%200%2000-.131-.268.353.353%200%2000-.274-.132zm9.313.02h-.824a.557.557%200%2000-.57.228l-2.353%205.04h-.041l-2.242-5.04a.379.379%200%2000-.369-.228H8.958a.356.356%200%2000-.328.14.289.289%200%2000.021.32l3.648%207.748a.376.376%200%2000.369.208h.111a.373.373%200%2000.348-.208l3.648-7.748a.288.288%200%2000.021-.32.368.368%200%2000-.328-.14zm4.935-.188a4.312%204.312%200%2000-4.3%204.276%204.212%204.212%200%20001.254%203.044%204.11%204.11%200%20003.038%201.284%204.069%204.069%200%20003.025-1.284%204.181%204.181%200%20001.262-3.044%204.313%204.313%200%2000-4.279-4.276zm1.783%206.156a2.379%202.379%200%2001-1.783.756%202.4%202.4%200%2001-1.8-.744%202.623%202.623%200%2001-.725-1.888%202.529%202.529%200%2001.725-1.84%202.427%202.427%200%20011.8-.736%202.368%202.368%200%20011.783.736%202.525%202.525%200%2001.725%201.84%202.669%202.669%200%2001-.725%201.876zM3.322%205.93H.416a.392.392%200%2000-.275.128.373.373%200%2000-.131.272v1a.386.386%200%2000.131.28.4.4%200%2000.275.12h1.475v7.17a1.331%201.331%200%2001-1.18%201.312H.416a.4.4%200%2000-.287.12.371.371%200%2000-.123.28v1a.415.415%200%2000.111.28.394.394%200%2000.295.12h.143a3.13%203.13%200%20003.152-2.9.848.848%200%2000.017-.188V6.33a.377.377%200%2000-.123-.28.365.365%200%2000-.279-.12z%22%20fill-rule%3D%22evenodd%22%2F%3E%0A%20%20%20%20%3Cpath%20fill%3D%22%2318C139%22%20d%3D%22M.03-.006c-.254%204.676%203.681%205.34%203.681%205.34C3.515.214.03-.006.03-.006z%22%20fill-rule%3D%22evenodd%22%2F%3E%0A%3C%2Fsvg%3E);
              color: rgb(240, 241, 241);
            "
            class="jdiv logoIcon_cbf __ru_9c6"
          ></div>
          <div class="jdiv fallback_b60"></div>
        </div>
      </div>
      <div class="jdiv leafCont_b8e">
        <div class="jdiv leaf_836 _right_9fd">
          <div
            style="
              background-image: url(data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2232%22%20height%3D%2240%22%20viewBox%3D%220%200%2032%2040%22%3E%0A%20%20%20%20%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%0A%20%20%20%20%20%20%20%20%3Cpath%20fill%3D%22%23df771c%22%20d%3D%22M0%200h9.02L32%2033.196V40H0z%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cpath%20fill%3D%22%2318C139%22%20d%3D%22M9%200c3.581.05%2023%205.426%2023%2033.08v.03C18.922%2030.751%209%2019.311%209%205.554V0z%22%2F%3E%0A%20%20%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E%0A);
            "
            class="jdiv cssLeaf_244"
          ></div>
        </div>
      </div>
    </div>
    <div class="jdiv-mobile"></div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueJivosite from '@bchteam/vue-jivosite'

export default {
  name: 'JivoSite',
  data: () => ({
    disabled: false,
    showFakeButton: true
  }),
  created() {
    // let sum = 0
    // for (let i = 1; i<=52; i++) {
    //     sum += i*100
    // }
    // console.log(sum)
  },
  methods: {
    initJivoSite() {
      const widgetId = 'Suul9tp80X'
      Vue.use(VueJivosite, { widgetId })
      this.disabled = true

      const interval = setInterval(() => {
        if (window.jivo_api) {
          this.showFakeButton = false
          window.jivo_api.open()
          clearInterval(interval)
        }
      }, 300)
    }
  }
}
</script>

<style scoped>
@supports (-ms-ime-align: auto) and (color: unset) {
}

.button-jivo {
  color: #fff;
}

.jdiv-mobile {
  display: none;
}

.jdiv {
  -webkit-animation: 0s none;
  animation: 0s none;
  -webkit-backface-visibility: visible;
  backface-visibility: visible;
  background: none;
  border: 0;
  box-shadow: none;
  box-sizing: content-box;
  bottom: auto;
  caption-side: top;
  clear: none;
  clip: auto;
  cursor: auto;
  display: inline;
  direction: ltr;
  flex: none;
  height: auto;
  -webkit-hyphens: manual;
  -ms-hyphens: manual;
  hyphens: manual;
  image-rendering: auto;
  justify-content: flex-start;
  left: auto;
  letter-spacing: normal;
  line-height: normal;
  margin: 0;
  max-height: none;
  max-width: none;
  min-height: 0;
  min-width: 0;
  -o-object-fit: fill;
  object-fit: fill;
  opacity: 1;
  order: 1;
  orphans: 2;
  outline: 0 none;
  overflow: visible;
  padding: 0;
  perspective: none;
  position: static;
  resize: none;
  right: auto;
  text-align: left;
  text-decoration: none;
  text-indent: 0;
  text-overflow: clip;
  text-shadow: none;
  text-transform: none;
  top: auto;
  transform: none;
  transition: all 0s ease 0s;
  unicode-bidi: normal;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  vertical-align: baseline;
  white-space: normal;
  width: auto;
  word-break: normal;
  word-spacing: normal;
  word-wrap: normal;
  z-index: auto;
  zoom: normal;
  -webkit-filter: none !important;
  filter: none !important;
  font-weight: 400;
  -webkit-text-size-adjust: inherit;
  -webkit-font-smoothing: antialiased;
  -webkit-text-fill-color: currentColor;
}

.jdiv:after,
.jdiv:before {
  box-sizing: inherit;
}

.copyright_c65 {
  position: absolute;
  display: block;
  cursor: pointer;
  background-color: #414243;
  height: 40px;
  line-height: 40px !important;
  padding: 0 16px !important;
  border-radius: 4px !important;
  box-shadow: 0 0 12px 3px rgba(0, 0, 0, 0.17);
}

.copyright_c65._right_845 {
  top: 33px;
  right: 7px;
}

.copyright_c65._right_845.__ru_18d {
  top: 26px;
}

.copyright_c65._right_845 :after {
  content: '' !important;
  display: block;
  right: -13px;
  top: -25px;
  bottom: -5px;
  width: 15px;
  background: transparent;
  position: absolute;
}

.logoIcon_4fe {
  display: inline-block;
  width: 51px;
  height: 18px;
  background-repeat: no-repeat;
  background-size: contain;
}

.jdiv a.link_bb1 {
  display: inline-block !important;
  width: 51px !important;
  height: 18px !important;
  margin: 11px 0 4px 2px !important;
  transition: none !important;
  vertical-align: top !important;
  box-sizing: border-box !important;
  color: currentColor;
}

.jdiv a.link_bb1.__ru_18d {
  width: 27px !important;
  margin: 10px 0 4px 2px !important;
}

.jdiv a.link_bb1.__ru_18d .logoIcon_4fe {
  width: 27px;
  background-size: 98% 100%;
}

.jdiv a.link_bb1:hover,
.jdiv a.link_bb1:visited {
  color: currentColor;
}

.jdiv a.link_bb1 .logoIcon_4fe {
  vertical-align: top !important;
  box-sizing: border-box !important;
}

.jdiv a.link_bb1 .logoIcon_4fe:hover {
  cursor: pointer !important;
}

.text_b4c {
  font-family: Arial, sans-serif;
  font-weight: 400;
  font-size: 13px !important;
  white-space: nowrap;
  -webkit-font-smoothing: antialiased;
  transform: translateZ(0) !important;
  line-height: 40px !important;
  color: #fff;
  display: inline-block !important;
  vertical-align: middle !important;
  cursor: default !important;
}

.corner_bb8 {
  position: absolute;
  width: 0;
  height: 0;
}

._right_845 .corner_bb8 {
  top: 50%;
  margin-top: -4px;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
}

._right_845 .corner_bb8 {
  right: -4px;
  border-left: 5px solid #414243;
}

.LabelButtons_ba2 {
  display: block;
  position: absolute;
  border-radius: 4px !important;
  font-family: Arial, sans-serif;
  font-weight: 400;
  font-size: 15px !important;
  line-height: 20px;
  background-color: #fff;
  color: #545d6b;
  z-index: 1000000;
  font-smoothing: antialiased;
  max-width: 100%;
  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.2);
  width: 100%;
  min-width: 300px;
  max-height: none !important;
}

.LabelButtons_ba2._right_9a0 {
  width: 300px;
  min-width: 300px;
  left: auto;
  bottom: 0;
}

.LabelButtons_ba2._right_9a0:before {
  width: 23px;
  height: auto;
  top: -60px;
  bottom: -60px;
  right: -23px;
  content: '' !important;
  position: absolute;
  cursor: default;
}

.LabelButtons_ba2._right_9a0:after {
  content: '' !important;
  display: block;
  position: absolute;
  background: transparent;
  left: -22px;
  top: -22px;
  bottom: -22px;
  right: -22px;
  z-index: 0;
}

.LabelButtons_ba2 .chat_c75 {
  background: transparent
    url("data:image/svg+xml;charset=utf-8,%3Csvg width='23' height='23' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M1 14.7V21l4.176-3H21c.56 0 .999-.448.999-1V2c0-.545-.447-1-.999-1H2a.994.994 0 00-1 1v12.7z' stroke='%2300BE64' stroke-width='2'/%3E%3Cpath fill='%2300BE64' d='M5 6h14v2H5zm0 5h11v2H5z'/%3E%3C/g%3E%3C/svg%3E")
    28px 51% no-repeat;
}

.LabelButtons_ba2._right_9a0 {
  max-width: 300px;
}

.LabelButtons_ba2._right_9a0 .chat_c75 {
  clear: inherit;
}

.LabelButtons_ba2 .chat_c75 {
  width: 100%;
  height: 38px;
  line-height: 38px;
  clear: both;
  overflow: hidden;
  cursor: pointer;
}

.LabelButtons_ba2 .chat_c75:hover {
  border-radius: 0 0 4px 4px !important;
}

.buttonsCorner_250 {
  position: absolute;
  width: 0;
  height: 0;
}

.rightCorner_8c9 {
  border-left-color: #fff;
  right: 0;
}

.rightCorner_8c9:after {
  content: '' !important;
  position: absolute;
  width: 0;
  height: 0;
  left: -1px;
  bottom: -5px;
  box-sizing: border-box;
  border-color: transparent transparent #fff #fff;
  border-style: solid;
  border-width: 10px;
  transform-origin: 0 0;
  transform: rotate(-135deg);
  box-shadow: -3px 3px 5px 0 rgba(0, 0, 0, 0.07);
}

.labelButton_396:first-child,
.labelButton_396:first-child .text_5e0:hover:first-child {
  border-radius: 4px 4px 0 0 !important;
}

.labelButton_396 {
  height: 66px;
  display: block;
  position: relative;
  z-index: 1;
  max-height: 66px;
}

.labelButton_396:hover {
  background-color: #f3f7fa;
  cursor: pointer !important;
}

.labelButton_396 .title_13c {
  color: #222d38;
  cursor: pointer;
  font-size: 15px !important;
}

.labelButton_396 .text_5e0 {
  box-sizing: border-box !important;
  padding-left: 80px !important;
  padding-right: 15px !important;
  line-height: 20px !important;
  text-decoration: none;
  font-size: 15px !important;
  vertical-align: middle !important;
  display: table-cell !important;
  height: 66px !important;
  font-weight: 400;
  color: #545d6b !important;
  transform: translateZ(0) !important;
  cursor: pointer !important;
  width: 310px !important;
}

.labelButton_396 .text_5e0 .title_13c {
  cursor: pointer;
}

.labelButton_396 .text_5e0:hover {
  background-color: #f5f5f5;
  cursor: pointer !important;
}

.labelButton_396 .text_5e0:hover .title_13c {
  color: #0044d3;
}

.label_2ae {
  position: fixed;
  z-index: 10000;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  opacity: 0;
  -webkit-animation-duration: 0.2s;
  animation-duration: 0.2s;
  box-shadow: 0 12px 14px 8px rgba(0, 0, 0, 0.17);
  -webkit-filter: blur(0);
  filter: blur(0);
}

.label_2ae:hover {
  cursor: pointer;
}

.label_2ae .leafCont_b8e {
  position: absolute;
}

.label_2ae._right_541 {
  bottom: -200px;
  height: 40px;
  width: auto;
  right: 30px;
  border-top-left-radius: 8px !important;
  border-top-right-radius: 34px !important;
  transition: opacity 0.05s ease-in 0.25s, background-color 0.2s ease-in;
  opacity: 0;
}

.label_2ae._right_541._init_52e {
  opacity: 1;
  bottom: 0 !important;
}

.label_2ae._right_541 .leafCont_b8e {
  right: 0;
}

.label_2ae._right_541._pad100_a38 {
  right: 30px;
  left: auto;
}

.label_2ae._right_541 .lbContainer_0a0 {
  left: 0;
  right: 0;
  max-width: 300px;
}

.label_2ae._right_541 .copyContainer_fa9 {
  right: 0;
  bottom: 0;
}

.label_2ae._right_541 .text_7a9 {
  transform: translateZ(0);
  margin: 0 37px 0 16px;
  min-width: 160px;
  visibility: visible;
}

.label_2ae._right_541 .text_7a9:hover {
  cursor: pointer;
}

.label_2ae._right_541 {
  transform: rotate(-90deg) translate(100%) translateZ(0);
  transform-origin: bottom right !important;
  transition: opacity 0.2s ease-in, background-color 0.2s ease-in,
    right 0.2s ease-in;
  -webkit-animation-name: labelRight_a08;
  animation-name: labelRight_a08;
  min-width: 76px;
  right: 0 !important;
}

.label_2ae._right_541._pad100_a38 {
  bottom: 70px !important;
}

.label_2ae._right_541 .leafCont_b8e {
  top: 0;
  transform: translateZ(0) !important;
}

.label_2ae._right_541 .lbContainer_0a0 {
  width: 300px;
  top: -20px;
  transform: rotate(90deg) translate3d(-100%, 0, 0) !important;
  transform-origin: bottom left;
  -webkit-filter: blur(0);
  filter: blur(0);
}

.label_2ae._right_541 .copyContainer_fa9 {
  transform: rotate(90deg) translate3d(-100%, 4px, 0) !important;
  transform-origin: bottom left;
  -webkit-filter: blur(0);
  filter: blur(0);
  right: 0;
  bottom: 40px;
}

.label_2ae .text_7a9 {
  font: inherit;
  text-indent: 0;
  line-height: 40px;
  vertical-align: top;
  white-space: nowrap;
  -webkit-font-smoothing: antialiased;
  visibility: visible;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.label_2ae .text_7a9:hover {
  cursor: pointer;
}

.label_2ae .hoverl_9b3 {
  z-index: 4;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

.label_2ae .hoverl_9b3:hover {
  cursor: pointer;
}

.copy_606 {
  position: relative;
  padding-top: 10px;
  padding-right: 36px;
  padding-left: 7px;
  display: inline-block;
  height: 18px !important;
  float: right;
}

.copy_606:hover ~ .copyContainer_fa9 {
  display: block;
}

.copyContainer_fa9 {
  position: absolute;
  display: none;
}

.copyContainer_fa9:hover,
.hoverl_9b3:hover .lbContainer_0a0 {
  display: block;
}

.lbContainer_0a0 {
  position: absolute;
  display: none;
}

.logo_625 {
  position: relative;
  display: block;
}

.logo_625 .fallback_b60 {
  display: none;
  visibility: hidden;
}

.logo_625._right_44a .hoverBox_a34 {
  left: -10px;
  right: -10px;
  top: -20px;
  max-height: 48px !important;
  bottom: -8px;
}

.hoverBox_a34 {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: transparent;
  opacity: 0;
  z-index: 5;
  cursor: pointer;
}

.logoIcon_cbf {
  display: block;
  width: 51px;
  height: 18px;
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: contain;
}

.logoIcon_cbf.__ru_9c6 {
  width: 25px;
}

.leaf_836 {
  position: absolute;
  width: 32px;
  height: 33px;
  z-index: 1;
  overflow: hidden;
}

.leaf_836._right_9fd {
  right: 0;
  top: 0;
  width: 33px;
  border-radius: 0 24px 0 0 !important;
}

.leaf_836._right_9fd .cssLeaf_244 {
  width: 32px !important;
  height: 34px !important;
  position: absolute;
  overflow: visible;
  right: 0;
  top: 0;
}

.button-jivo-hide {
  transform: rotate(-90deg) translateY(100%) translateX(100%) translateZ(0) !important;
}
</style>
<style lang="sass" scoped>
@media only screen and (max-width: $colSm)
  .jdiv-desktop
    display: none
  .label_2ae._right_541
    transform: rotate(0)
  .label_2ae._right_541._pad100_a38
    bottom: 0 !important
  .jdiv.button-jivo.label_2ae
    box-shadow: none !important
    background: none !important
  .jdiv-mobile
    display: block
    position: fixed
    bottom: 70px
    right: 10px
    width: 65px
    height: 65px
    background-color: #44bb6e
    border-radius: 50%
    background-image: url("data:image/svg+xml,%3Csvg%20width%3D%2225%22%20height%3D%2220%22%20viewBox%3D%220%200%2025%2020%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20fill%3D'%23fff'%20d%3D%22M22.5%205l-10%206.25L2.5%205V2.5l10%206.25%2010-6.25V5zm0-5h-20A2.49%202.49%200%200%200%200%202.5v15A2.5%202.5%200%200%200%202.5%2020h20a2.5%202.5%200%200%200%202.5-2.5v-15A2.5%202.5%200%200%200%2022.5%200z%22%2F%3E%3C%2Fsvg%3E%0A")
    background-repeat: no-repeat
    background-position: center
    background-size: 40%


  z
    display: none
</style>
