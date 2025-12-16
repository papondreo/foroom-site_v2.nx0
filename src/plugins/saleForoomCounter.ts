// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { $axios } from '@/utils/axios-accessor'
// import FormData from 'form-data'

export default ({ app, store, getters }, inject) => {
  inject('saleForoomCounter', (goal, data = null) => {
    const userIP = store.getters['siteComponentStates/userIPGetter']

    const formData = new FormData()
    formData.append(
      'json',
      JSON.stringify({
        auth: {},
        data: {
          goal,
          userIP,
          data
        },
        module: 'counter',
        cmd: 'setCounter',
        key: 'W5pRNSx8Dx3tGY65xx3BOgAAAAE'
      })
    )

    $axios.$post('/proxy/', formData).then(
      (res) => {
        // console.log('OK', res)
      },
      (rej) => {
        // console.log('error', rej)
      }
    )
  })
}
