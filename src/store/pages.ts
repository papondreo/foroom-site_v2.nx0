import {
  Module,
  VuexAction,
  VuexModule,
  VuexMutation
} from 'nuxt-property-decorator'

import config from '@/config'
import { Page } from '@/types/Page'
import { $axios } from '@/utils/axios-accessor'

@Module({
  name: 'pages',
  namespaced: true,
  stateFactory: true
})
export default class PagesModule extends VuexModule {
  pages: Page[] | null = null
  pagesTree: Page[] | null = null
  matchingPages: Page[] = []

  @VuexMutation
  SET_PAGES(pages: Page[]) {
    this.pages = pages
  }

  @VuexMutation
  SET_PAGES_TREE(pages: Page[]) {
    this.pagesTree = pages
  }

  @VuexMutation
  PUSH_TO_PAGES_TREE(page: Page) {
    this.pagesTree?.push(page)
  }

  @VuexMutation
  SET_MATCHING_PAGES(pages: Page[]) {
    this.matchingPages = pages
  }

  @VuexAction({ commit: 'SET_PAGES', rawError: true })
  async getPages(): Promise<Page[]> {
    const { data } = await $axios.get(config.api.url + 'api/pages')
    return data
  }

  @VuexAction({ commit: 'SET_PAGES_TREE', rawError: true })
  setPagesTree(pages: Page[]): Page[] {
    return pages
  }

  @VuexAction({ commit: 'PUSH_TO_PAGES_TREE', rawError: true })
  pushToPagesTree(page: Page): Page {
    return page
  }

  @VuexAction({ commit: 'SET_MATCHING_PAGES', rawError: true })
  async searchPages(text: string) {
    const { data } = await $axios.post(config.api.url + 'api/search', {
      searchText: text
    })
    return data
  }

  get pagesGetter() {
    return this.pages
  }

  get currentPageGetter() {
    const pages = this.pagesTree
    return pages ? pages[pages.length - 1] : pages
  }

  get breadcrumbsGetter() {
    return this.pagesTree
  }

  get matchingPagesGetter() {
    return this.matchingPages
  }
}
