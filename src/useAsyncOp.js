import { useCallback, useRef, useReducer, useContext } from 'react'
import call from './call'
import { context } from './Provider'

const START = 'START'
const COMPLETE = 'COMPLETE'
const FAIL = 'ERROR'

const DUMMY_CONTEXT = {
  state: {},
  register: () => undefined,
  deregister: () => undefined
}

const initialState = { result: null, loading: false, error: null }

const reducer = (state, action) => {
  switch (action.type) {
    case START:
      return { ...state, loading: true, error: null }
    case FAIL:
      return { result: null, loading: false, error: action.value }
    case COMPLETE:
      return { result: action.value, loading: false, error: null }
    default:
      return state
  }
}

let runIdInc = 0

export default name => {
  if (!name) throw new Error('name required for useAsyncOp')
  const runIdRef = useRef()
  const [state, dispatch] = useReducer(reducer, initialState)
  const running = useContext(context) || DUMMY_CONTEXT

  const callFn = useCallback(
    (...args) => {
      const runId = runIdInc++
      runIdRef.current = runId

      const dispatchStart = () => {
        running.register({ runId, name, args })
        dispatch({ type: START })
      }

      const dispatchFail = value => {
        if (runIdRef.current !== runId) return
        dispatch({ type: FAIL, value })
      }

      const dispatchComplete = value => {
        if (runIdRef.current !== runId) return
        dispatch({ type: COMPLETE, value })
      }

      const dispatchDone = () => running.deregister({ runId })

      dispatchStart()
      call(name, ...args)
        .then(dispatchComplete)
        .catch(dispatchFail)
        .finally(dispatchDone)
    },
    [runIdRef, dispatch, name, running]
  )

  return { call: callFn, ...state }
}
