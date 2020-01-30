const registry = {}

export const register = (name, fn, data) => {
  if (!name) throw new Error('Unable to register: No service name has been provided')
  if (!fn) throw new Error('Unable to register: No operation has been provided for: ' + name)
  if (registry[name]) console.log('WARNING: Overwriting existing operation for: ' + name)
  registry[name] = { fn, data }
}

export const get = name => {
  const operation = registry[name]
  if (!operation) throw new Error('No operation has been registered for: ' + name)
  return operation
}
