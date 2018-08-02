import { enable as enableMock, disable as disableMock } from './mock'
import * as actions from './actions'
import * as actionTypes from './actionTypes'
import saga from './saga'
import { call as callOperation, register } from './operations'
import { isAsyncOperation, isAsyncComplete, isAsyncFailure } from './helpers'

export {
  register,
  callOperation,
  enableMock,
  disableMock,
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
  enableMock,
  disableMock,
  actions,
  actionTypes,
  saga,
  isAsyncOperation,
  isAsyncComplete,
  isAsyncFailure
}
