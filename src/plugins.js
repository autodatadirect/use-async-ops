const NOOP = () => {}

const plugins = []

export const register = plugin =>
  plugins.push({
    onStart: plugin.onStart || NOOP,
    onError: plugin.onError || NOOP,
    onComplete: plugin.onComplete || NOOP
  })

export default plugins
