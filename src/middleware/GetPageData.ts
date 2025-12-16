import { Page } from '@/types/Page'
import { pagesStore } from '@/store'

export default function ({ route, store }) {
  const pages = store.getters['pages/pagesGetter']

  const getParentPage = (parentId: number, acc: Page[] = []) => {
    const page = pages.find((page) => page.id === parentId)
    acc.push(page)

    if (page && page.parentId) {
      getParentPage(page.parentId, acc)
    }
    return acc
  }

  const breadcrumbs = () => {
    let path = '/' + route.path.split('/').pop()

    if (route.params.productChild) {
      path = '/' + route.params.product
    }

    if (route.name === 'news-url') {
      // path = '/' + route.params.url
      path = '/news'
    }

    const parentIds = pages
      ?.filter((page) => page.url === path)
      ?.map((page) => page.parentId)

    if (parentIds && parentIds.length) {
      if (parentIds[0] === 0) {
        return pages.filter((page) => page.parentId === 0)
      }

      const matches = {}
      parentIds.map((parentId) => {
        matches[parentId] = getParentPage(parentId).reverse()
      })

      const parentId = Object.keys(matches).find((key) => {
        const url =
          matches[key].reduce((acc, page) => acc + page.url, '').slice(1) + path

        if (route.params.productChild) {
          return key
        }

        if (url === route.path) {
          return key
        }
      })

      if (parentId) {
        const currentPage = pages.find(
          (page: Page) =>
            page.parentId === parseInt(parentId) && page.url === path
        )

        matches[parentId].push(currentPage)
        return matches[parentId]
      }
      return null
    }
    return null
  }

  const res = breadcrumbs()
  pagesStore.setPagesTree(res)
}
