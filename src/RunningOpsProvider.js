import React, { createContext, useReducer } from 'react'

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
    case REGISTER: return handleRegister
    case DEREGISTER: return handleDeregister
    default: return state
  }
}

export default ({ children }) => {
  const [runningOps, dispatch] = useReducer(reducer, {})

  const value = {
    runningOps,
    register: ({ runId, name, args = [] }) => dispatch({ type: REGISTER, runId, name, args }),
    deregister: ({ runId }) => dispatch({ type: DEREGISTER, runId })
  }

  return <context.Provider value={value}>{children}</context.Provider>
}
