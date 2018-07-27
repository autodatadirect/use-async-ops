import { call, put, takeEvery } from 'redux-saga/effects'
import { OPERATION, COMPLETE, FAILURE } from './actionTypes'
import { get as getOperation } from './operations'
import { enabled as mockEnabled } from './mock'

export default function * (action) {
  yield takeEvery(OPERATION, loader)
}

function * loader (action) {
  const { name, channel, args } = action
  const responseObject = {
    name,
    channel,
    isMock: mockEnabled(),
    args
  }
  try {
    const operation = getOperation(name)
    if (!operation) throw new Error('ASYNC_OPERATION_NOT_REGISTERED')

    const response = yield call(operation, ...action.args)

    const responseAction = {
      ...responseObject,
      type: COMPLETE,
      response
    }

    yield put(responseAction)
  } catch (error) {
    const errorAction = {
      ...responseObject,
      type: FAILURE,
      error
    }

    yield put(errorAction)
  }
}
