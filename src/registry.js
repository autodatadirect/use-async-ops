import control from './mockControl'

const operations = {}
const mocks = {}

export const register = (name, operation, mock) => {
  if (!name) throw new Error('Unable to register: No service name has been provided')
  if (!operation) throw new Error('Unable to register: No operation has been provided for: ' + name)
  if (operations[name]) console.log('WARNING: Overwriting existing service for: ' + name)
  operations[name] = operation
  mocks[name] = mock
}

export const get = name => {
  const fn = control.enabled() && mocks[name] ? mocks[name] : operations[name]
  if (!fn) throw new Error('ASYNC_OPERATION_NOT_REGISTERED')
  return fn
}
