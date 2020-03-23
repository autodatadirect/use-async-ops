import { useRef } from 'react'
import useAsyncOp from './useAsyncOp'

const hasChanged = (lastValue, thisValue) => JSON.stringify(lastValue) !== JSON.stringify(thisValue)

const clone = o => JSON.parse(JSON.stringify(o))

export default ({ name, options }, ...args) => {
  const callRef = useRef()
  const { call, loading, error, result } = useAsyncOp({ name, options })

  if (!callRef.current || hasChanged(callRef.current, { name, args, options })) {
    callRef.current = { name, args: clone(args), options }
    call(...args)
  }

  return { loading, error, result }
}
