import { useContext } from 'react'
import { context } from './RunningOpsProvider'

export default filter => {
  const runningContext = useContext(context)
  if (!runningContext) throw new Error('component must be wrapped with RunningOpsProvider for global loading status')

  const a = Object.values(runningContext)

  if (filter instanceof Function) {
    return a.filter(filter)
  } else if (typeof filter === 'string') {
    return a.filter(l => l.name === filter)
  } else {
    return a
  }
}
