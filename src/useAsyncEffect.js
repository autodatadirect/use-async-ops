import { useEffect } from 'react'
import useAsyncOp from './useAsyncOp'

const useAsyncEffect = ({ name, options }, ...args) => {
  const { call, loading, error, result } = useAsyncOp({ name, options })
  useEffect(() => {
    call(...args)
  }, [call, ...args])
  return { loading, error, result }
}

export default useAsyncEffect
