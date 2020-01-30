const CSS_HEADER = 'color: #777;'
const CSS_NAME = 'color: #000; font-weight: bold;'
const CSS_ARGS = 'font-weight: normal;'
const CSS_EVENT_COMPLETE = 'color: #272;'
const CSS_EVENT_ERROR = 'color: #c22;'
const CSS_EVENT_START = 'color: #22c;'

const log = ({ id, event, name, args, error, result }) => {
  let s = ''
  const logParams = []

  const append = (css, type, value) => {
    s += ''
    if (css) {
      s += '%c'
      logParams.push(css)
    }
    s += type + ' '
    logParams.push(value)
  }

  append(CSS_HEADER, '%s', 'ASYNC_OP')
  append(null, '%i', id)
  append(CSS_NAME, '%s', name)

  if (event === 'COMPLETE') {
    append(CSS_EVENT_COMPLETE, '%s', event)
  } else if (event === 'ERROR') {
    append(CSS_EVENT_ERROR, '%s', event)
  } else {
    append(CSS_EVENT_START, '%s', event)
  }

  append(CSS_ARGS, '%o', args)

  if (error) append(null, '%o', error)
  if (result) append(null, '%o', result)

  console.log(s, ...logParams)
}

export default next => async (context, response, error) => {
  const { name, args, runId: id } = context
  log({ id, event: 'START', name, args })
  try {
    const r = await next(context, response, error)
    log({ id, event: 'COMPLETE', name, args, result: r })
    return r
  } catch (e) {
    log({ id, event: 'ERROR', name, args, error: e })
    throw e
  }
}
