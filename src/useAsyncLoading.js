import useAsyncRunning from './useAsyncRunning'

export default filter => {
  const running = useAsyncRunning(filter)
  return !!running.length
}
