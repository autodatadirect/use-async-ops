import { get } from '../registry'

export default next => async (context, response, error) => {
  if (response === undefined && error === undefined) {
    const { name, args } = context
    const fn = get(name).fn
    try {
      response = await fn(...args)
    } catch (e) {
      error = e
    }
  }

  return next(context, response, error)
}
