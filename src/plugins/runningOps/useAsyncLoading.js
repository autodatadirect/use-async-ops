import useRunningOps from './useRunningOps'

export default filter => {
  const running = useRunningOps(filter)
  return !!running.length
}
