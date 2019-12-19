import { useRef } from 'react'
import useAsyncOp from './useAsyncOp'

const arrayEquals = (a, b) => {
  if (a === b) return true
  if (a == null || b == null) return false
  if (a.length !== b.length) return false
  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false
  }
  return true
}

const hasChanged = (lastValue, thisValue) => {
  if (lastValue.name !== thisValue.name) return true
  return !arrayEquals(lastValue.args, thisValue.args)
}

export default (name, ...args) => {
  const callRef = useRef({})
  const { call, loading, error, result } = useAsyncOp(name)

  if (hasChanged(callRef.current, { name, args })) {
    callRef.current = { name, args }
    call(...args)
  }

  return { loading, error, result }
}
