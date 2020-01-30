import React, { createContext, useReducer, useRef } from 'react'

export const context = createContext()

const REGISTER = 'REGISTER'
const DEREGISTER = 'DEREGISTER'

export const determineKey = ({ name, hookId, runId }) =>
  [name, hookId, runId].filter(x => x).join('_')

const handleRegister = (state, action) => ({
  ...state,
  [action.runId]: { name: action.name, args: action.args }
})

const handleDeregister = (state, action) => {
  const stateClone = { ...state }
  delete stateClone[action.runId]
  return stateClone
}

const reducer = (state = {}, action) => {
  switch (action.type) {
    case REGISTER: return handleRegister(state, action)
    case DEREGISTER: return handleDeregister(state, action)
    default: return state
  }
}

const buildMiddleware = ({ dispatch }) => next => async (context, response, error) => {
  const { name, args, runId } = context
  dispatch({ type: REGISTER, runId: runId, name, args })
  try {
    const r = await next(context, response, error)
    dispatch({ type: DEREGISTER, runId: runId })
    return r
  } catch (e) {
    dispatch({ type: DEREGISTER, runId: runId })
    throw e
  }
}

export default ({ children, prependMiddleware }) => {
  const [runningOps, dispatch] = useReducer(reducer, {})
  const registeredRef = useRef(false)

  if (!registeredRef.current) {
    prependMiddleware(buildMiddleware({ dispatch }))
    registeredRef.current = true
  }

  return <context.Provider value={runningOps}>{children}</context.Provider>
}
