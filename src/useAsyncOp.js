import { useCallback, useRef, useReducer, useContext, useEffect } from 'react'
import call from './call'
import { context } from './RunningOpsProvider'

const START = 'START'
const COMPLETE = 'COMPLETE'
const ERROR = 'ERROR'

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
    case ERROR:
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
  let mounted = true

  useEffect(() => () => (mounted = false), [])

  const callFn = useCallback(
    (...args) => {
      if (!mounted) return
      const runId = runIdInc++
      runIdRef.current = runId

      const dispatchStart = () => {
        if (!mounted) return
        running.register({ runId, name, args })
        dispatch({ type: START })
      }

      const dispatchFail = value => {
        if (!mounted) return
        if (runIdRef.current !== runId) return
        dispatch({ type: ERROR, value })
      }

      const dispatchComplete = value => {
        if (!mounted) return
        if (runIdRef.current !== runId) return
        dispatch({ type: COMPLETE, value })
      }

      const dispatchDone = () => running.deregister({ runId })

      dispatchStart()
      const res = call(name, ...args)
      res.then(dispatchComplete).catch(() => {})
      res.catch(dispatchFail)
      res.finally(dispatchDone).catch(() => {})
    },
    [runIdRef, dispatch, name, running]
  )

  return { call: callFn, ...state }
}
