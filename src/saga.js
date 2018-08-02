import { call, put, takeEvery } from 'redux-saga/effects'
import { OPERATION, COMPLETE, FAILURE } from './actionTypes'
import { call as callOperation } from './operations'
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
    const response = yield call(callOperation, name, ...action.args)

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
