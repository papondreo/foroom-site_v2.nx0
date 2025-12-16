<template>
  <form
    class="search-form"
    :class="{ 'search-form__opened': active }"
  >
    <fieldset class="">
      <input
        v-model="model"
        class="search-input"
        type="text"
        @blur="animateForm"
        @focus="animateForm"
        @input="search()"
        placeholder="Поиск..."
      />
<!--      <div-->
<!--        v-if="Object.keys(matchingPages).length && model.length >= 3 && active"-->
<!--        class="search-results"-->
<!--      >-->
      <div
        v-if="Object.keys(matchingPages).length && model.length >= 3 && active"
        class="search-results"
      >
        <div
          v-for="(group, name) in matchingPages"
          :key="name"
        >
          <p class="group-title">{{ name }}</p>
          <nuxt-link
            v-for="link in group"
            :key="link.id"
            :to="link.url.substring(1)"
            @click.native="model = link.h1"
          >
            <p>{{ link.h1 }}</p>
          </nuxt-link>
        </div>
<!--
        <nuxt-link
          v-for="link in matchingPages"
          :key="link.id"
          :to="link.url.substring(1)"
          @click.native="model = link.h1"
        >
          <p class="group-title">{{ link.pageType }}</p>
          <p>{{ link.h1 }}</p>
        </nuxt-link>
-->
      </div>
      <div
        v-if="!Object.keys(matchingPages).length && model.length >= 3 && active"
        class="search-results"
      >
        Ничего не найдено
      </div>

      <svg
        class="search-icon"
        width="16"
        height="16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g
          fill="none"
          fill-rule="evenodd"
          opacity=".92"
        >
          <path
            d="M6.5 1a5.5 5.5 0 0 1 4.383 8.823l3.896 3.9a.75.75 0 0 1-1.061
            1.06l-3.895-3.9A5.5 5.5 0 1 1 6.5 1zm0 1.5a4 4 0 1 0 0 8 4 4 0 0 0
            0-8z"
            fill="#f1bb8b"
            fill-rule="nonzero"
          />
        </g>
      </svg>
    </fieldset>
  </form>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { pagesStore } from '@/utils/store-accessor'

@Component({})
export default class SearchField extends Vue {
  active: boolean = false
  model: string = ''

  animateForm() {
    setTimeout(() => {
      this.active = !this.active
    }, 20)
  }

  // debounce(func, timeout = 300) {
  //   let timer
  //   return (...args) => {
  //     clearTimeout(timer)
  //     timer = setTimeout(() => {
  //       func.apply(this, args)
  //     }, timeout)
  //   }
  // }

  async search() {
    if (this.model.length >= 3) {
      await pagesStore.searchPages(this.model)
    }
  }

  get matchingPages() {
    const matchingPages = pagesStore.matchingPagesGetter
    if (matchingPages) {
      const res = {}
      matchingPages.forEach((item) => {
        item.url = item.url.replace('/catalog//', '/')
        if (!res[item.pageType]) {
          res[item.pageType] = []
        }
        res[item.pageType].push(item)
      })

      return res
      //
      // return matchingPages.map((p) => ({
      //   ...p,
      //   url: p.url.replace('/catalog//', '/')
      // }))
    }
    return []
  }
}
</script>

<style lang="scss" scoped>
.search-form,
fieldset,
.search-input {
  height: 100%;
}

.search-form {
  position: relative;
  z-index: 1;
  &__opened {
    position: absolute;
    height: auto;
    //width: 100%;
    width: calc(100% - 24px);
    //left: 20px;
    right: 12px;
    top: 8px;
    bottom: 8px;

    transition: 0.5s ease-in-out;
    z-index: 1;

    .search-input {
      width: 100%;
    }
  }
}

.search-input {
  padding: 8px 12px 8px 36px;

  border-radius: 4px;
  background-color: #e78732;

  font-family: $main-font;
  font-weight: 300;
  color: #ffffff;

  transition: 0.5s ease-in-out;
}
.search-icon {
  position: absolute;
  left: 10px;
  top: 30px;
  z-index: 2;
}
.search-results {
  width: 100%;
  background: #f5f5f8;
  box-shadow: 0 15px 15px rgba(219, 215, 215, 0.2);
  border-radius: 0 0 8px 8px;

  a {
    display: block;
    padding: 4px 12px 4px 36px;
    transition: 0.3s ease-in-out;
    &:hover {
      background: #fae0ca;
    }

    p {
      //color: #f5f5f5;
    }
  }
  .group-title {
    padding: 8px 12px 0 36px;
    font-size: 12px;
    font-weight: 400;
    color: #7d7d7d;
  }
}
</style>
