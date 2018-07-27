import { OPERATION, COMPLETE, FAILURE } from './actionTypes'

export const isAsyncOperation = (name, channel) => action =>
  action.type === OPERATION && action.name === name && (channel ? action.channel === channel : true)

export const isAsyncComplete = (name, channel) => action =>
  action.type === COMPLETE && action.name === name && (channel ? action.channel === channel : true)

export const isAsyncFailure = (name, channel) => action =>
  action.type === FAILURE && action.name === name && (channel ? action.channel === channel : true)
