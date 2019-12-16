import { useCallback, useState } from 'react'
import { call as callOperation } from './operations'

export default ({
  name,
  onStart = () => {},
  onComplete = () => {},
  onFailure = () => {}
}) => {
  const [status, setStatus] = useState(false)

  const call = useCallback(async (...args) => {
    const data = {
      name,
      args
    }

    await onStart({ ...data })
    setStatus({ loading: true })
    try {
      const result = await callOperation(name, ...args)
      await onComplete({ ...data, result })
      setStatus({ result })
      return result
    } catch (error) {
      await onFailure({ ...data, error })
      setStatus({ error })
    }
  }, [name])

  return {
    loading: !!status.loading,
    error: status.error,
    result: status.result,
    call
  }
}
