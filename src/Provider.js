import React, { createContext, useReducer } from 'react'

export const Context = createContext()

export const START = 'ASYNC_OPS.START'
export const COMPLETE = 'ASYNC_OPS.COMPLETE'
export const FAIL = 'ASYNC_OPS.ERROR'

export const determineKey = ({ name, hookId, runId }) => [name, hookId, runId].filter(x => x).join('_')

const reducer = (state = {}, action) => {
  const key = determineKey(action)
  switch (action.type) {
    case START:
      return { ...state, [key]: { loading: true } }
    case COMPLETE:
      return { ...state, [key]: { loading: false, result: action.result } }
    case FAIL:
      return { ...state, [key]: { loading: false, error: action.error } }
    default: return state
  }
}

export default ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {})
  const value = { state, dispatch }

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  )
}
