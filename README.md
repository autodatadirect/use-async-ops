# use-async-ops
`use-async-ops` is a library for performing asynchronous operations in React applications utilizing hooks. This project is the successor to `async-ops` which was tightly coupled to Redux and Redux Sagas.  With the help of hooks, this project was created to remove those dependencies and open up new possibilites along with simplify the code base. The actions dispatched by `async-ops` can be enabled with the `use-async-ops-redux` middleware.

## Install
```bash
  npm install --save use-async-ops
```


## useAsyncOp
The `useAsyncOp` hook provides the user with the asynchronous operation that has been previously registered as well as operation state values, including `loading`, `error`, and `result`. 

```javascript
import { useAsyncOp } from 'async-ops'

const Test = () => {
  const { call, loading, result, error } = useAsyncOp({ name: 'opName' })
  ...
}
```

| Argument Name | Type | Description | |
|-------------|------|-------------|-|
| name | `string` | the name of the operation |


| Return Name | Type | Description | |
|-------------|------|-------------|-|
| call | `function` | An asynchronous method which wraps the operation |
| loading | `boolean` | boolean representing the loading state |
| result | `any` | the result returned by the operation |
| error | `any` | the error returned by the operation |

## useAsyncEffect
The `useAsyncEffect` hook is a convenience hook to perform the common pattern of using `useEffect` to load data when a component mounts.  Instead of returning the call function, it will invoke it any time the hook arguments change and return the result and status fields just like `useAsyncOp`.

```javascript
import { useAsyncEffect } from 'use-async-ops'

const Test = () => {
  const { loading, error, result } = useAsyncEffect({ name: 'opName', args: ['arg1', 'arg2'] })
  ...
}
```

| Argument Name | Type | Description | |
|-------------|------|-------------|-|
| name | `string` | the name of the operation |
| ... args | `any` | the rest of the arguments will be passed to the registered operation function |

| Return Name | Type | Description | |
|-------------|------|-------------|-|
| loading | `boolean` | boolean representing the loading state |
| result | `any` | the result returned by the operation |
| error | `any` | the error returned by the operation |
