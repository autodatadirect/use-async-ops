# Async-Ops
Async-Ops is a library for performing asynchronous service calls in Redux applications.  Async-Ops is made for use with [Redux-Sagas](https://redux-saga.js.org/).

## Motivations
> Why does Async-Ops exist?  What problem is this library trying to solve?

When using Redux with Redux-Sagas, asynchronous options end up being fairly complicated.  By using a separate saga for each service call, you have to create boilerplate code for action types, action creators, sagas, and reducers.  These bits of code end up being duplicative and cluttering up the code base.

Other libraries exist for handling asynchronous actions, usually by including middlewares.  However, if you are already using the Redux-Saga middleware, it adds an extra layer of complication to add a new middleware on top of Redux-Sagas.

**Async-Ops** uses the Redux-Saga middleware to handle asynchronous operations, unifying all types of async calls under a small number of actionTypes which are handled by a single saga.  Whenever you want to add a new asynchronous operation, all that you need to do is create an operation function using whatever technology you like (we like to use the Javascript `fetch` API for simplicity), register that operation, and fire the Async-Ops actions with the registered name and, boom.

## Usage
Async-Ops is available on npm with the following command:
```bash
  npm install --save async-ops
```

## API
### `register(name:String, operation:Function, mockOperation: Function) : Function`
The `register` function registers an `operation` function and a `mockOperation` function under a given name.  Operations must be registered prior to being used by the application.

#### Arguments

**`name : String [required]`** The name which will be used to key operation in Async-Ops.  This name will be referenced when calling the operation.

**`operation(...args) : Function [required]`** A function that will be called when the Async-Ops operation is called by name.

**`mockOperation(...args) : Function [optional]`** A function that will be called when the Async-Ops operation is called by name while `mock` is enabled.

#### Example
```javascript
import { register } from 'async-ops'

const service = request => window.fetch(request)

const mock = request => Promise.reject(Error('request is invalid'))

register('fetchData', service, mock)
```

### `callOperation(name:String, ...args) : Function`
The `callOperation` function retrieves the `operation` registered at the provided name and then calls it, passing in `..args` to the called function.

#### Arguments

**`name : String [required]`** The name of the operation.

**`...args [optional]`** The arguments to be passed to the `operation` when it is called.


#### Return : Promise(result)
`callOperation` returns the result of the previously registered `operation` function (or its `mockOperation`) after invoking it with the provided `...args`.  If the `operation` result is not a `Promise`, it will be wrapped in a resolved `Promise`.

#### Example
```javascript
import { register, callOperation } from 'async-ops'

const service = arg => 1 + arg

register('fetchData', service)

...

const x = await callOperation('fetchData', 1) // x = 2
```

### `enableMock() : Function`
The `enableMock` function causes `callOperation` to use the `mockOperation` function rather than the  `operation` function.  The current mock status is set in the client's Local Storage.

### `disableMock() : Function`
The `disableMock` function causes `callOperation` to use the `mockOperation` function rather than the  `operation` function.  The current mock status is set in the client's Local Storage.

### `actions : Object`

The `actions` object contains action creator functions which create the actions which are used by the Async-Ops `saga` to automatically run and process Async-Ops operations.

### `actions.asyncOperationStart : Function(name:String | options:Object, ...args)`

The `asyncOperationStart` function creates an action which starts an async operation.

#### Arguments

**`name : String`** The name of the operation to be called.

**`options : Object`** An options object to use to call.  The options object has the following possible properties:
* *`name : String [required]`* The operation name.
* *`channel : String [optional]`* A channel name to isolate operation call from other calls of the same operation.

**`...args`** The arguments to be passed to the `operation` when it is called.

#### Return : Object
The `asyncOperationStart` function returns a Redux-formatted action object with the following properties:
  * *`type : String`* This is always set to `'ASYNC_OPERATION'`
  * *`...args : Array[arg1, arg2, ...]`* an array of the args provided.
  * *`...options`* any other option values provided to the function

#### Example
```javascript
import { actions } from 'async-ops'

const fireAction = store => {
  const action = actions.asyncOperationStart('fetchData', 'test')
  store.dispatch(action)
}
```

### `actionTypes : Object`

The `actionTypes` object contains the Redux action type strings for Async-Ops actions.  The action types are:
* `actionTypes.OPERATION = 'ASYNC_OPERATION'`
* `actionTypes.COMPLETE = 'ASYNC_COMPLETE'`
* `actionTypes.FAILURE = 'ASYNC_FAILURE'`

### `saga : Function`

The `saga` is a `Redux-Sagas` generator function which can be used with the Redux-Sagas middleware.  Once started, the Saga will listen for `ASYNC_OPERATION` actions and automatically call the associated operation.  Once the operation is completed, an `ASYNC_COMPLETE` or `ASYNC_FAILURE` action will be fired with the result data.

#### Example
```javascript
import { saga } from 'async-ops'
import sagaMiddleware from './sagaMiddleware'

sagaMiddleware.run(saga)
```

### `isAsyncOperation, isAsyncComplete, isAsyncFailure : Function(name:String, channel:String)`

These three functions are helper functions.  They return a match function which takes an action Object and matches the actionType, name, and channel.  This can used for Redux-Saga matching and React-Redux reducer matching.

#### Arguments

**`name : String [required]`** The name of the operation to be matched.

**`channel : String [optional]`** A channel name to be matched.

#### Return : Function(action : Object)
The function returned from the helper functions takes an action object and returns either `true` if the action matches the provided info or `false` if the action does not.

### `reducer : Function`

The `reducer` is a Redux reducer function that can be added to an app's reducer to keep the store updated with the status about the latest async-ops calls.  It must be put under the key 'asyncops' which can be imported from the async-ops package as `STORE_DOMAIN`.

#### Example
```javascript
import { combineReducers } from 'redux'
import { reducer as asyncops } from 'async-ops'

const rootReducer = combineReducers({
  asyncops
})
```

### `loadingSelector : Function`

This selector function can be used to determine the loading state of an asynchronous operation.

#### Arguments

**`name : String [required]`** The name of the operation.

**`channel : String [optional]`** The name of the channel.

#### Return : Function(action : Object)
The function returned from the selector functions takes a state object and returns either `true` if the asynchronous operation is currently loading or `false` if it is not.

#### Example
```javascript
import { selectors } from 'async-ops'

const mapStateToProps = state => ({
  testOpIsLoading: selectors.loadingSelector('testOp')(state)
})
```

### `errorSelector : Function`

This selector function can be used to retrieve error data from an asynchronous operation.

#### Arguments

**`name : String [required]`** The name of the operation.

**`channel : String [optional]`** The name of the channel.

#### Return : Function(action : Object)
The function returned from the selector functions takes a state object and returns either null if the asynchronous operation did not error or an error object.

#### Example
```javascript
import { selectors } from 'async-ops'

const mapStateToProps = state => ({
  testOpError: selectors.errorSelector('testOp')(state)
})
```
