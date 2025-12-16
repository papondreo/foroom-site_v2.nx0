<template>
  <div class="container">
    <ui-title
        tag="h1"
        class="ui-title-1"
    >
      Профильные карнизы
    </ui-title>
    <div class="row constructor" v-if="ready">
      <div class="col-lg-8 md-sticky">
        <ConstructorContainer
            :systemName="systemName"
            class="mb-5"
        />
      </div>

      <aside class="col-lg-4">
        <div
            class="outline check-wrapper"
            :class="{ 'check-wrapper_show': showCheck }"
        >
          <PreviewKarniz
              :systemName="systemName"
              @previewModal="previewModal = !previewModal"
              @mediaModal="showMediaModal"
          />
          <!--          <component-->
          <!--            :is="previewComponent"-->
          <!--            :systemName="systemName"-->
          <!--            @previewModal="previewModal = !previewModal"-->
          <!--            @mediaModal="showMediaModal"-->
          <!--          />-->

          <CheckKarniz
              :systemName="systemName"
              @open="fullInfoModal = !fullInfoModal"
          />
        </div>
      </aside>
    </div>
  </div>

</template>

<script>
import ConstructorContainer from '@/components/ConstructorCornices/ConstructorContainer'
import CheckKarniz from '@/components/ConstructorCornices/check/CheckKarniz'
import PreviewKarniz from '@/components/ConstructorCornices/check/preview/PreviewKarniz'


export default {
  name: 'PrConrAge',
  components: {PreviewKarniz, CheckKarniz, ConstructorContainer},
  head() {
    return {
      meta: [
        {
          hid: "og:url",
          name: "og:url",
          content: "https://www.foroom.ru/profileCornices",
        },
        {
          hid: "og:type",
          name: "og:type",
          content: "website",
        },
        {
          hid: "og:title",
          name: "og:title",
          content:
              "Новинки от FOROOM – Профильные карнизы",
        },
        {
          hid: "description",
          name: "description",
          content:
              "Тут вы найдете лучшие профильные карнизы для ваших окон",
        },
      ],
    };
  },
  data: () => ({
    fullInfoModal: false,
    previewModal: false,
    mediaModal: false,
    componentLoaded: false,
    ready: false,
    showCheck: false
  }),
  created() {

    this.$store.dispatch('calcSteps/setStep', 1);
    this.$store.dispatch('calcCore/setFlapsCount', 1);


    this.$store.dispatch('calcCore/initData').then(
        () => {
          const actionSystem = this.checkActions();
          this.$store.dispatch('calcCore/loadTemplates').then((res) => {
            if (actionSystem && this.$route.query.template) {
              const template = res.find(
                  (t) => t.enabled && (t.type + t.subtype) === this.$route.query.template
              );

              if (template) {
                this.calculate(template);
              } else {
                this.calculate();
              }
            } else {
              this.calculate();
            }
          });
        },
        () => {
        }
    );
  },

  beforeDestroy() {
    this.$store.dispatch('common/clearError')
  },

  methods: {
    showMediaModal(params) {
      this.mediaModal = params
    },
    checkActions() {
      if (this.$route.query.action && this.$route.query.action.trim()) {
        return !!this.$store.getters['calcActions/currentActions'][
            this.$route.query.action
            ]
      }
      return false
    },

    checkBestsellers() {
      if (this.$route.query.bestseller && this.$route.query.bestseller.trim()) {
        return !!this.bestsellers.find(
            (bs) => bs.type + bs.subtype === this.$route.query.bestseller
        )
      }
      return false
    },

    calculate: function (template = false) {
      const redirect = template

      if (!template) {
        const templates = this.templates.filter((template) =>
            this.templateType().includes(template.type)
        )
        template = this.$findMin(templates, 'price')
      } else {
        template = this.fixTemplateBugs(template)
      }

      if (this.$route.query.sizes) {
        const sizes = this.$route.query.sizes.split('x')
        if (sizes.length === 2) {
          template.width = parseInt(sizes[0])
          template.height = parseInt(sizes[1])
        }
      }

      if (this.$route.query.currentTemplates) {
        const currentTemplates = this.$store.getters['calcCornices/data']
        const current = JSON.parse(this.$route.query.currentTemplates)
        currentTemplates.NumberOfRows = this.$route.query.NumberOfRows
        currentTemplates.currentTemplates = current
        template = current[0]
      }

      if (this.$route.query.NumberOfRows) {
        template.NumberOfRows = this.$route.query.NumberOfRows
      }

      if (this.$route.query.templateRus) {
        const currentTemplates = this.$store.getters['calcCornices/data']
        const current = JSON.parse(this.$route.query.templateRus)
        currentTemplates.templateRus = current
      }
      if (this.$route.query.price) {
        const currentTemplates = this.$store.getters['calcCornices/data']
        currentTemplates.price = this.$route.query.price
      }
      if (this.$route.query.oldPrice) {
        const currentTemplates = this.$store.getters['calcCornices/data']
        currentTemplates.oldPrice = this.$route.query.oldPrice
      }

      this.$store.dispatch('calcCore/setSizes', template)

      this.$store.dispatch('calcCore/calculate', template).then(
          (res) => {
            if (this.systemName === 'rolo' || this.systemName === 'duo') {
              this.$store.dispatch(
                  'calcCore/setControlType',
                  this.system.controls.default
              )
            }

            let material

            if (this.$route.query.material) {
              const materials = this.materials
              if (
                  materials.some((mat) => mat.tid == this.$route.query.material)
              ) {
                material = materials.find(
                    (mat) => mat.tid == this.$route.query.material
                )
              } else {
                material = this.minPriceMaterial
              }
            } else {
              material = this.minPriceMaterial
            }

            template.material = material.tid
            this.$store.dispatch('calcCore/setMaterial', material)

            this.$store.dispatch('calcCore/calculate', template).then((res) => {
              if (redirect && !this.$route.query.step) {
                this.toSizes()
              }
              if (this.$route.query.step) {
                this.$store.dispatch('calcSteps/setStep', this.$route.query.step)
              }
              if (template.ArchType) this.system.ArchType = template.ArchType
              if (template.NumberOfRows)
                this.system.NumberOfRows = template.NumberOfRows
              if (template.AnglesCount)
                this.system.AnglesCount = template.AnglesCount
              this.ready = true
            })
          },
          (rej) => {
            rej = JSON.parse(rej)
            if (rej?.errors.includes('ControlHeight')) {
            }
          }
      )
    },

    toSizes: function () {
      const steps = this.$store.getters['calcSteps/stepsMap'][
          this.system.name
          ].filter((step) => step.inPaginator)
      let step = 1
      for (const i in steps) {
        if (steps[i].components.find((comp) => comp.name === 'Sizes')) {
          step = parseInt(i) + 1
          this.$store.dispatch('calcSteps/setStep', step)
        }
      }

      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    },

    fixTemplateBugs: function (template) {
      template.MountType = !template.MountType ? 1 : template.MountType

      if (template.type + template.subtype === 'rolo3') {
        template.MountType = 2
      }

      if (this.systemName === 'plisse') {
        template.Color = !template.Color ? 1 : template.Color
        template.BandColor = !template.BandColor ? 1 : template.BandColor
      }
      return template
    },

    templateType() {
      switch (this.systemName) {
        case 'duo':
          return ['zebra']

        case 'hblinds':
          return ['hblinds', 'ks25']

        default:
          return [this.systemName]
      }
    }
  },

  computed: {
    templates() {
      const templates = this.$store.getters["calcCore/templates"]?.filter(
          (template) => template.enabled
      ) || [];
      return templates;
    },

    systemName() {
      return this.$route.query.systemName || "karniz";
    },

    system() {
      const sys = this.$getSystem(this.systemName);
      return sys;
    },

    materials() {
      const {materialRest} = this.$store.getters['calcCore/params'];
      const materials = Object.values(
          this.$store.getters['calcCore/params'].materials
      ).filter(
          (material) =>
              material.calc_enabled && parseFloat(material.ost) > materialRest.red
      ).map((material) => {
        material.tabAlias = material.isCurrentAction
            ? material.currentActionInfo.alias
            : 'mainCollection';
        return material;
      });
      return materials;
    },

    minPriceMaterial() {
      const materials = this.materials;
      const actionMaterials = materials.filter(
          (material) => material.isCurrentAction
      );
      const material = actionMaterials.length
          ? this.$findMin(actionMaterials, 'cost')
          : this.$findMin(materials, 'priceGroup');

      // console.log("Computed minPriceMaterial:", material);
      return material ? material : false;
    },
  }
}

</script>

<style lang="scss" scoped>
.container {
  max-width: 1440px;
}

.h1 {
  margin-bottom: 16px;
  font-size: 18px;
  text-transform: uppercase;
  font-weight: 400;
}
</style>
