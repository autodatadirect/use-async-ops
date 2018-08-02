import mock from './mock'
import * as actions from './actions'
import * as actionTypes from './actionTypes'
import saga from './saga'
import { call as callOperation, register } from './operations'
import { isAsyncOperation, isAsyncComplete, isAsyncFailure } from './helpers'

export {
  register,
  callOperation,
  mock,
  actions,
  actionTypes,
  saga,
  isAsyncOperation,
  isAsyncComplete,
  isAsyncFailure
}

export default {
  register,
  callOperation,
  mock,
  actions,
  actionTypes,
  saga,
  isAsyncOperation,
  isAsyncComplete,
  isAsyncFailure
}
