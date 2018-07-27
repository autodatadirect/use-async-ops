import { OPERATION, COMPLETE, FAILURE } from './actionTypes'

const sagaMatcher = type => name => action => action.type === type && action.name === name

export const operationMatcher = sagaMatcher(OPERATION)

export const completeMatcher = sagaMatcher(COMPLETE)

export const failureMatcher = sagaMatcher(FAILURE)
