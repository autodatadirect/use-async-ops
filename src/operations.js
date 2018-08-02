import mock from './mock'

const operations = {}
const mocks = {}

export const register = (name, operation, mock) => {
  operations[name] = operation
  mocks[name] = mock
}

export const get = name => mock.enabled() ? mocks[name] : operations[name]

export const call = async (name, ...args) => {
  const operation = get(name)
  if (!operation) throw new Error('ASYNC_OPERATION_NOT_REGISTERED')
  return operation(...args)
}
