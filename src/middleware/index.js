import call from './call'
import end from './end'
import mock from './mock'

let middlewareStack = [mock, call]
let stack

const compose = (...funcs) =>
  funcs.reduce((a, b) => (...args) => a(b(...args)), arg => arg)

const buildStack = () => {
  stack = compose(...middlewareStack, end)()
}

buildStack()

export const append = middleware => {
  middlewareStack = [...middlewareStack, middleware]
  buildStack()
}

export const prepend = middleware => {
  middlewareStack = [middleware, ...middlewareStack]
  buildStack()
}

export const set = newStack => {
  middlewareStack = newStack
  buildStack()
}

export const invoke = ({ options, runId, hookId }) => async (name, ...args) => stack({ name, args, runId, hookId, options })
