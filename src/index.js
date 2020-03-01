import useAsyncOp from './useAsyncOp'
import useAsyncEffect from './useAsyncEffect'
import { append as appendMiddleware, prepend as prependMiddleware, set as setMiddleware } from './middleware'
import { register } from './registry'
import mock, { enable as enableMock, disable as disableMock } from './middleware/mock'
import runningOps from './middleware/runningOps'
import logging from './middleware/logging'
import call from './middleware/call'

const middleware = {
  runningOps,
  logging,
  mock,
  call
}

export {
  useAsyncOp,
  useAsyncEffect,
  register,
  enableMock,
  disableMock,
  appendMiddleware,
  prependMiddleware,
  setMiddleware,
  middleware
}
