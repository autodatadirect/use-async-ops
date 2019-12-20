
const log = ({ id, event, name, args, error, result }) => {
  let s = '%c[ASYNC_OP ' + id + ']'
  s += ' %c(' + event + ')'
  s += ' %c' + name
  s += '%c(' + JSON.stringify(args) + ')'

  if (error) s += ' => ' + JSON.stringify(error)
  if (result) s += ' => ' + JSON.stringify(result)

  let eventColor = '#22c'
  if (error) {
    eventColor = '#c22'
  } else if (result) {
    eventColor = '#272'
  }

  console.log(s, 'color: #777;', 'color: ' + eventColor + ';', 'color: #000; font-weight: bold', 'font-weight: normal')
}

let idInc = 0

export default () => (name, ...args) => {
  const id = idInc++
  log({ id, event: 'START', name, args })
  return {
    onError: e => log({ id, event: 'ERROR', name, args, error: e }),
    onComplete: result => log({ id, event: 'COMPLETE', name, args, result })
  }
}
