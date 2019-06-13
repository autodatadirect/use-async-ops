import * as actionTypes from './actionTypes'

export const STORE_DOMAIN = 'asyncops'

const initialState = {}

const initialEntry = {
  error: null,
  loading: false
}

export const getReducerkey = ({ name, channel }) => name + (channel ? '__' + channel : '')

const operation = (state, action) => ({
  ...state,
  [getReducerkey(action)]: {
    ...initialEntry,
    loading: true
  }
})

const failure = (state, action) => ({
  ...state,
  [getReducerkey(action)]: {
    ...initialEntry,
    error: action.error
  }
})

const complete = (state, action) => {
  const nState = { ...state }
  delete nState[getReducerkey(action)]
  return nState
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.OPERATION: return operation(state, action)
    case actionTypes.FAILURE: return failure(state, action)
    case actionTypes.COMPLETE: return complete(state, action)
    default: return state
  }
}
