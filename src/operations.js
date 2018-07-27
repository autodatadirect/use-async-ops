import mock from './mock'

const operations = {}
const mocks = {}

export const register = (name, operation, mock) => {
  operations[name] = operation
  mocks[name] = mock
}

export const get = name => mock.enabled() ? mocks[name] : operations[name]
