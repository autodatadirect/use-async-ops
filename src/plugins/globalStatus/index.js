import { useContext, useReducer } from 'react'
import { context } from './RunningOpsProvider'

export const determineKey = ({ name, hookId, runId }) =>
  [name, hookId, runId].filter(x => x).join('_')

export let state = {}

const register = (runInfo, name, args) => {
  state = { ...state, [runInfo.runId]: { name, args } }
  runInfo.forceRender()
}

const deregister = runInfo => {
  delete state[runInfo.runId]
  runInfo.forceRender()
}

export default () => (runInfo, name, ...args) => {
  register(runInfo, name, args)
  return {
    onError: e => deregister(runInfo),
    onComplete: result => deregister(runInfo)
  }
}
