import { get } from './registry'
import plugins from './plugins'

const clone = o => JSON.parse(JSON.stringify(o))

export default (name, ...args) => {
  const pluginSessions = plugins.map(p => p(name, ...clone(args)))
  const result = get(name)(...args)
  result.then(result => pluginSessions.forEach(p => p.onComplete(result))).catch(e => console.log('error in use-async-ops plugin', e))
  result.catch(error => pluginSessions.forEach(p => p.onError(error)))
  return result
}
