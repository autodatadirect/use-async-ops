export default next => async (context, resp, err) => {
  if (err) throw err
  return resp
}
