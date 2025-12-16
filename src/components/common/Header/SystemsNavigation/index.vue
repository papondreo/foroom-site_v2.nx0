<template>
  <div class="systems-menu__wrapper">
    <!--noindex-->
    <nav class="systems-menu">
      <div
        v-for="item in systems"
        :key="item.system"
        class="systems-menu__item"
        ref="SystemsMenuItem"
      >
        <nuxt-link
          :to="item.catalogUrl"
          @click.native="hideDropdown(item.system)"
          @mouseleave.native="clearHiddenClass"
          @mouseenter.native="clearHiddenClass"
        >
          <img
            :src="`/img-new/brand/${item.system}-ico.svg`"
            :alt="item?.alt"
            :title="item?.imgTitle"
          />
          <span>{{ item.name }}</span>
        </nuxt-link>
        <systems-navigation-dropdown
          :system="item"
          @closeMenu="hideDropdown"
        />
      </div>
    </nav>
    <div class="systems-menu__shadow"></div>
    <!--/noindex-->
  </div>
</template>

<script lang="ts">
// @ts-nocheck
import { Vue, Component, Getter } from 'nuxt-property-decorator'
import SystemsNavigationDropdown from '@/components/common/Header/SystemsNavigation/Dropdown.vue'
import { System } from '@/types/Systems'

@Component({
  components: { SystemsNavigationDropdown }
})
export default class SystemsNavigation extends Vue {
  @Getter('systems/systemsGetter') systems: System[]

  hideDropdown(system): void {
    this.$refs.SystemsMenuItem.map((item) => {
      item.classList.add('hidden-item')
    })

    this.$yandexMetrika.reachGoal(`NF_${system}Catalog`)
  }

  clearHiddenClass(): void {
    this.$refs.SystemsMenuItem.map((item) => {
      item.classList.remove('hidden-item')
    })
  }
}
</script>

<style lang="scss" scoped>
.systems-menu {
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-bottom: 24px;
  padding: 0 16px;

  background: #f5f5f8;
  border-radius: 8px;

  &:hover {
    border-radius: 8px 8px 0 0;
  }

  &__wrapper {
    position: relative;
  }
  &__shadow {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    box-shadow: 0 4px 40px rgba(219, 215, 215, 0.5);
    border-radius: 8px;
    z-index: -1;
  }

  &__item {
    & > a {
      display: flex;
      align-items: center;
      padding-top: 8px;
      padding-bottom: 6px;
      padding-right: 28px;
      border-radius: 8px 8px 0 0;
      border-bottom: solid 2px #f5f5f8;

      &:last-of-type a {
        padding-right: 0;
      }

      img {
        width: 32px;
        margin-right: 12px;
      }

      span {
        font-size: 15px;
        line-height: 1.2;
      }

      transition: color 0.3s ease-in-out;
    }
    &:hover > a {
      color: $brand-orange-light;
      border-color: $brand-orange-light;
    }
  }

  &__item:not(.hidden-item):hover .systems-menu__dropdown {
    opacity: 1;
    visibility: visible;
  }
}
</style>
