import { useContext } from 'react'
import { context } from './Provider'

export default filter => {
  const loading = useContext(context)
  if (!loading) throw new Error('component must be wrapped with Provider for global loading status')

  const a = Object.values(loading.state)

  if (filter instanceof Function) {
    return a.filter(filter)
  } else if (typeof filter === 'string') {
    return a.filter(l => l.name === filter)
  } else {
    return a
  }
}
