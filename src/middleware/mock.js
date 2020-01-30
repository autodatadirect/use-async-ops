import { get } from '../registry'

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

export default next => async (context, response, error) => {
  if (enabled() && response === undefined && error === undefined) {
    const { name, args } = context
    const mockFn = (get(name).data || {}).mock
    if (mockFn) {
      try {
        response = await mockFn(...args)
      } catch (e) {
        error = e
      }
    }
  }

  return next(context, response, error)
}
