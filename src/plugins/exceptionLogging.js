const NOOP = () => {}

export default (name, ...args) => ({
  onError: e => {
    if (e && e.stack && e.message) console.error(e)
  },
  onComplete: NOOP
})
