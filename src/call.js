import { get } from './registry'
import plugins from './plugins'

export default ({ runId, hookId, forceRender }) => (name, ...args) => {
  const pluginSessions = plugins.map(plugin => plugin({ runId, hookId, forceRender }, name, ...args))
  const result = get(name)(...args)
  result
    .then(result => pluginSessions.forEach(plugin => plugin.onComplete(result)))
    .catch(error => pluginSessions.forEach(plugin => plugin.onError(error)))
  return result
}
