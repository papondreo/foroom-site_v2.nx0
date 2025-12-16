export const loadScriptAsync = async (src: string): Promise<boolean> => {
  if (typeof document === 'undefined') {
    return new Promise((resolve, reject) => {
      reject(false)
    })
  }

  const scripts = document.querySelectorAll('script')
  scripts.forEach((script) => {
    if (script.src === src) {
      return new Promise((resolve) => {
        resolve(true)
      })
    }
  })

  return new Promise((resolve) => {
    const tag = document.createElement('script')
    tag.src = src
    tag.async = true
    tag.onload = () => {
      resolve(true)
    }
    const firstScriptTag = document.getElementsByTagName('script')[0]
    if (firstScriptTag && firstScriptTag.parentNode) {
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
    }
  })
}
