# Use-Async-Ops
Use-Async-Ops is a library for performing asynchronous service calls in React applications using Hooks.

## Motivations
> Why does Use-Async-Ops exist?  What problem is this library trying to solve?

**Use-Async-Ops** is trying to simplify and streamline performing asynchronous actions in a React context.

The original **Async-Ops** project was tightly coupled to **Redux Sagas**.  Use-Async-Ops uses the hooks functionality of React to create a simpler and easier to maintain project.

This project is designed as a jumping off point, to create specialized hooks -- for an example, see our other project **use-redux-async-ops**.

## Usage
Use-Async-Ops is available on npm with the following command:
```bash
  npm install --save use-async-ops
```

## API
### `useAsyncOp(name:String) : Function`
The `useAsyncOp` hook provides the user with the asynchronous operation that has been previously registered as well as operation state values, including `loading`, `error`, and `result`. 
You are also able to provide callback functions for begin, end, and error events.

#### Arguments

**`name : String [required]`** The name of the operation.

#### Return : Object(call: Function, loading: boolean, result: any, error: any)
**`call : Function`** An asynchronous method which wraps the operation.

**`loading : boolean`** 

**`result : any`** 

**`error : any`** Error, if any exists. Null otherwise.

#### Example
```javascript
import React. { useEffect } from 'react'
import { useAsyncOps } from 'async-ops'

const Test = () => {
  const { call, loading, result } = useAsyncOps({ name: 'test' })
  const useEffect(() => { call() }, [call])

  if(loading) {
    return <div>LOADING!</div>
  }

  return <div>{JSON.stringify(result)}</div>
}
```

### `useAsyncOp(name:String, args:any) : Function

#### Arguments

**`name : String [required]`** The name of the operation.

**` args : any`**

#### Return : Object(loading: boolean, result: any, error: any)

**` loading : boolean`**

**` result : any`**

**` error: any`**

### `register(name:String, operation:Function, mock: Function) : Function`
The `register` function registers an `operation` function and a `mock` function under a given name.  Operations must be registered prior to being used by the application.

#### Arguments

**`name : String [required]`** The name which will be used to key operation in Async-Ops.  This name will be referenced when calling the operation.

**`operation(...args) : Function [required]`** A function that will be called when the Async-Ops operation is called by name.

**`mock(...args) : Function [optional]`** A function that will be called when the Async-Ops operation is called by name while `mock` is enabled.

#### Example
```javascript
import { register } from 'async-ops'

const service = request => window.fetch(request)

const mock = request => Promise.reject(Error('request is invalid'))

register('fetchData', service, mock)
```

### `enableMock() : Function`
The `enableMock` function causes `callOperation` to use the `mockOperation` function rather than the  `operation` function.  The current mock status is set in the client's Local Storage.

### `disableMock() : Function`
The `disableMock` function causes `callOperation` to use the `mockOperation` function rather than the  `operation` function.  The current mock status is set in the client's Local Storage.

### `RunningOpsProvider({ children:??? }) : Function`

#### Arguments

**`children : JSX Element`**

#### Return

**`JSX Element`** The children element with a context provider wrapped around it

### `useAsyncLoading(filter:Function) : Function`

#### Arguments

**`filter : Function`**

#### Return

**`bool`**

### `registerPlugin(plugin:Function) : Function`


#### Arguments

**`plugin : Function(name, ...args)`** Plugin to be added

