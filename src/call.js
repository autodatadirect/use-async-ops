import { get } from './registry'
import plugins from './plugins'

const runFn = (name, args) => obj => obj[name] instanceof Function && obj[name](...args)

export default (name, ...args) => {
  const onStart = runFn('onStart', args)
  const onComplete = runFn('onComplete', args)
  const onError = runFn('onError', args)

  plugins.forEach(onStart)
  const result = get(name)(...args)
  result.then(() => plugins.forEach(onComplete)).catch(() => {})
  result.catch(() => plugins.forEach(onError))
  return result
}
