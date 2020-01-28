import { useCallback, useRef, useReducer, useEffect } from 'react'
import call from './call'

const START = 'START'
const COMPLETE = 'COMPLETE'
const ERROR = 'ERROR'

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
let hookIdInc = 0

const useRender = () => {
  const [, forceRender] = useReducer(s => s + 1, 0)
  return useCallback(() => forceRender({}), [forceRender])
}

export default name => {
  if (!name) throw new Error('name required for useAsyncOp')
  const runIdRef = useRef()
  const hookId = hookIdInc++
  const [state, dispatch] = useReducer(reducer, initialState)
  let mounted = true

  const forceRender = useRender()

  useEffect(() => () => (mounted = false), [])

  const callFn = useCallback(
    (...args) => {
      if (!mounted) return
      const runId = runIdInc++
      runIdRef.current = runId

      const dispatchStart = () => {
        if (!mounted) return
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

      dispatchStart()
      const res = call({ runId, hookId, forceRender })(name, ...args)
      res.then(dispatchComplete).catch(() => {})
      res.catch(dispatchFail)
    },
    [runIdRef, dispatch, name]
  )

  return { call: callFn, ...state }
}
