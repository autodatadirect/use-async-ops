import { useCallback, useState, useContext, useRef } from 'react'
import { call as callOperation } from './operations'
import { START, COMPLETE, FAILURE, Context, determineKey } from './Provider'

export default ({
  name,
  onStart = () => { },
  onComplete = () => { },
  onFailure = () => { }
}) => {
  const { current: hookId } = useRef(Date.now())
  const [runId, setRunId] = useState()
  const [status, setStatus] = useState({ loading: false })
  const context = useContext(Context)
  const selector = useCallback(state => state[determineKey({ name, hookId, runId })] || {}, [name, hookId, runId])
  const contextStatus = useContextSelector(selector)

  const call = useCallback(async (...args) => {
    const runId = Date.now()
    setRunId(runId)
    await handleEvent(onStart, context, { type: START, hookId, runId, name, args })
    await setStatus({ loading: true })

    try {
      const result = await callOperation(name, ...args)

      await handleEvent(onComplete, context, { type: COMPLETE, hookId, runId, name, args })
      await setStatus({ result })

      return result
    } catch (error) {
      await handleEvent(onFailure, context, { type: FAILURE, hookId, runId, name, args })
      await setStatus({ error })
    }
  }, [name])

  if (context) {
    status.loading = contextStatus.loading
    status.error = contextStatus.error
    status.result = contextStatus.result
  }

  return {
    hookId,
    loading: !!status.loading,
    result: status.result,
    error: status.error,
    call
  }
}

const handleEvent = async (onEvent, context, action) => {
  if (context) {
    await context.dispatch(action)
  }
  await onEvent(action)
}

const useContextSelector = selector => {
  const context = useContext(Context)
  if (context) {
    return selector(context.state)
  }
}
