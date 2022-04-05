const isAuthenticated = (req, res, next) => {
  if (req.session.username === null) {
    res.send('not logged in')
  } else {
    next()
  }
}
module.exports = isAuthenticated
