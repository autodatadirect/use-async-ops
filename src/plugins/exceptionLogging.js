const NOOP = () => {}

export default () => ({
  onError: e => {
    if (e && e.stack && e.message) console.error(e)
  },
  onComplete: NOOP
})
