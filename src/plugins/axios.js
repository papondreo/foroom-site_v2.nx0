export default function ({ app, $axios, store }) {
  $axios.interceptors.request.use(
    (config) => {
      // console.log('req', config.url)
      return config
    },
    (error) => {
      return Promise.reject(error.response)
    }
  )

  $axios.interceptors.response.use(
    (response) => {
      // console.log('status', response.status)
      return response
    },
    async (error) => {
      const {
        config,
        response: { status, data }
      } = error

      return Promise.reject(error.response)
    }
  )

  $axios.onError((error) => {
    // console.log('error', error)
    return Promise.resolve(false)
  })
}
