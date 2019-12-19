const setLocalStorage = (variable, value) => {
  if (!value) {
    window.localStorage.clear(variable)
  } else {
    window.localStorage.setItem(variable, value)
  }
}

const getLocalStorage = cname => window.localStorage.getItem(cname)

export const enable = () => setLocalStorage('mock', true)

export const disable = () => setLocalStorage('mock', false)

export const enabled = () => !!getLocalStorage('mock')

export default {
  enable,
  disable,
  enabled
}
