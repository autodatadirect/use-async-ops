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

const buildPlugin = ({ dispatch }) => (runInfo, name, ...args) => {
  dispatch({ type: REGISTER, runId: runInfo.runId, name, args })
  return {
    onError: e => dispatch({ type: DEREGISTER, runId: runInfo.runId }),
    onComplete: result => dispatch({ type: DEREGISTER, runId: runInfo.runId })
  }
}

export default ({ children, registerPlugin }) => {
  const [runningOps, dispatch] = useReducer(reducer, {})
  const registeredRef = useRef(false)

  if (!registeredRef.current) {
    registerPlugin(buildPlugin({ dispatch }))
    registeredRef.current = true
  }

  return <context.Provider value={runningOps}>{children}</context.Provider>
}
