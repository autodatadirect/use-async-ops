import { useRef } from 'react'
import useAsyncOp from './useAsyncOp'

const hasChanged = (lastValue, thisValue) => JSON.stringify(lastValue) !== JSON.stringify(thisValue)

export default (name, ...args) => {
  const callRef = useRef()
  const { call, loading, error, result } = useAsyncOp(name)

  if (!callRef.current || hasChanged(callRef.current, { name, args })) {
    callRef.current = { name, args }
    call(...args)
  }

  return { loading, error, result }
}
