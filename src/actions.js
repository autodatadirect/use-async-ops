import * as types from './actionTypes'

export const asyncOperationStart = (nameOrOptions, ...args) => {
  if (!nameOrOptions && !nameOrOptions.name) throw new Error('async operation requires name')
  const action = {
    type: types.OPERATION,
    args
  }
  if (typeof nameOrOptions === 'string') {
    return {...action, name: nameOrOptions}
  } else {
    return {...nameOrOptions, ...action}
  }
}
