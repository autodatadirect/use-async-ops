import mock from './mock'
import * as actions from './actions'
import * as actionTypes from './actionTypes'
import saga from './saga'
import {get as getOperation, register} from './operations'
import { isAsyncOperation, isAsyncComplete, isAsyncFailure } from './helpers'

window.ASYNC_OPS = {
  mock
}

export {
  register,
  getOperation,
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
  getOperation,
  mock,
  actions,
  actionTypes,
  saga,
  isAsyncOperation,
  isAsyncComplete,
  isAsyncFailure
}
