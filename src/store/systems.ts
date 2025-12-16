import {
  Module,
  VuexModule,
  VuexMutation,
  VuexAction
} from 'nuxt-property-decorator'

import config from '@/config'
import { $axios } from '@/utils/axios-accessor'
import {
  System,
  SystemProductsMap,
  SystemUrlMap,
  AttachmentPoint,
  Box
} from '@/types/Systems'

@Module({
  name: 'systems',
  namespaced: true,
  stateFactory: true
})
export default class SystemsModule extends VuexModule {
  systems: System[] | null = null
  systemProductsMap: SystemProductsMap = {
    rolo: ['rolo'],
    duo: ['zebra', 'duo'],
    plisse: ['plisse'],
    roma: ['roma', 'introma'],
    vblinds: ['vblinds'],
    hblinds: ['hblinds', 'ks25'],
    wood: ['wood'],
    profileCornices: ['karniz', 'profileCornices']
  }
  systemUrlMap: SystemUrlMap[] = [
    {
      system: 'rolo',
      routeParam: 'rulonnye-shtory'
    },
    {
      system: 'zebra',
      routeParam: 'rulonnye-shtory-duo'
    },
    {
      system: 'hblinds',
      routeParam: 'gorizontalnye-zhalyuzi'
    },
    {
      system: 'wood',
      routeParam: 'gorizontalnye-derevyannie-zhalyuzi'
    },
    {
      system: 'vblinds',
      routeParam: 'vertikalnye-zhalyuzi'
    },
    {
      system: 'roma',
      routeParam: 'rimskie-shtory'
    },
    {
      system: 'plisse',
      routeParam: 'shtory-plisse'
    },
    {
      system: 'profileCornices',
      routeParam: 'profileCornices'
    }
  ]
  systemTypes = [
    {
      id: 1,
      name: 'Солнцезащитные системы',
      systems: [
        'rolo',
        'duo',
        'zebra',
        'plisse',
        'hblinds',
        'ks25',
        'vblinds',
        'roma',
        'introma',
        'wood'
      ]
    },
    {
      id: 2,
      name: 'Карнизы для штор',
      systems: ['karniz']
    }
  ]
  attachmentPoints: AttachmentPoint[] = [
    {
      id: 1,
      shortName: 'На проем',
      name: 'Изделия для оконного проёма',
      fullName: 'для установки на оконный проём',
      value: 'wall'
    },
    {
      id: 2,
      shortName: 'На створку',
      name: 'Изделия для створок окна',
      fullName: 'для установки на створку окна',
      value: 'flap'
    }
  ]
  attachmentPointsGform50: AttachmentPoint[] = [
    {
      id: 1,
      shortName: 'На створку',
      name: 'Изделия для створок окна',
      fullName: 'Изделия для установки на створки',
      value: 'flap'
    },
    {
      id: 2,
      shortName: 'На проем',
      name: 'Изделия для оконного проёма',
      fullName: 'Изделия для установки на проём',
      value: 'wall'
    },
    {
      id: 3,
      shortName: 'На проем 50мм',
      name: 'Изделия для оконного проёма',
      fullName: 'Изделия для установки на проём',
      value: 'wall2'
    }
  ]
  box: Box[] = [
    { value: 0, title: 'без короба' },
    { value: 1, title: 'с коробом' }
  ]

  @VuexMutation
  SET_SYSTEMS(systems: System[]) {
    this.systems = systems
  }

  @VuexAction({ commit: 'SET_SYSTEMS', rawError: true })
  async getSystems(): Promise<System[]> {
    const { data } = await $axios.get(config.api.url + 'api/systems')
    return data
  }

  get systemProductsMapGetter() {
    return this.systemProductsMap
  }

  get systemsGetter() {
    return this.systems
  }

  get attachmentPointsGetter(): AttachmentPoint[] {
    return this.attachmentPoints
  }
  get attachmentPointsGetterGform50(): AttachmentPoint[] {
    return this.attachmentPointsGform50
  }
  get boxGetter(): Box[] {
    return this.box
  }
  get systemTypesGetter() {
    return this.systemTypes
  }
  get systemUrlMapGetter(): SystemUrlMap[] {
    return this.systemUrlMap
  }
  get productsByUrlGetter() {
    return (systemName: string): string[] | null => {
      const res = Object.values(this.systemUrlMap).find(
        (item: SystemUrlMap) => item.routeParam === systemName
      )
      if (res) {
        return Object.values(this.systemProductsMap).find((item) =>
          item.includes(res.system)
        )
      }
      return null
    }
  }
}
