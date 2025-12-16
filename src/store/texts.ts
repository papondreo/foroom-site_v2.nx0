import {
  Module,
  VuexModule,
  VuexMutation,
  VuexAction
} from 'nuxt-property-decorator'
import config from '@/config'
import { $axios } from '@/utils/axios-accessor'
import { Text } from '@/types/Texts'

@Module({
  name: 'texts',
  namespaced: true,
  stateFactory: true
})
export default class TextsModule extends VuexModule {
  texts: Text[] = []

  @VuexMutation
  SET_TEXTS(texts: Text[]) {
    texts.map((txt: Text) => {
      const checkText = this.texts?.some(
        (text: Text) => text.type === txt.type && text.key === txt.key
      )

      if (!checkText) {
        this.texts.push(txt)
      }
    })
  }

  @VuexAction({ commit: 'SET_TEXTS', rawError: true })
  async getTextsByTypeAndKey({ type, key }): Promise<Text[]> {
    const { data } = await $axios.get(
      `${config.api.url}api/texts/${type}/${key}`
    )
    return data
  }

  get textsGetter(): Text[] {
    return this.texts
  }

  get textsByParamsGetter() {
    return (type: string, key: string) => {
      return this.texts
        .filter((text) => text.type === type && text.key === key)
        .map(({ text }) => text)[0]
    }
  }
}
