import { get } from './registry'
import plugins from './plugins'

export default (name, ...args) => {
  const pluginSessions = plugins.map(p => p(name, ...args))
  const result = get(name)(...args)
  result.then(result => pluginSessions.forEach(p => p.onComplete(result)))
    .catch(error => pluginSessions.forEach(p => p.onError(error)))
  return result
}
