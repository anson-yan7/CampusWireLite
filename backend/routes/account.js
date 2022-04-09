const express = require('express')
const isAuthenticated = require('../middlewares/isAuthenticated')

const User = require('../models/user')

const router = express.Router()

router.post('/signup', async (req, res, next) => {
  const { body } = req
  const { username, password } = body
  try {
    const user = await User.findOne({ username })
    if (!user) {
      await User.create({ username, password })
      req.session.username = username
      res.send('succesful signup')
    } else {
      res.send('username taken')
    }
  } catch (e) {
    next(e)
  }
})

router.post('/login', async (req, res, next) => {
  const { body } = req
  const { username, password } = body
  try {
    const user = await User.findOne({ username })
    if (user.password === password) {
      req.session.username = username
      res.send('successful login')
    } else {
      res.send('incorrect username or password')
    }
  } catch (e) {
    next(e)
  }
})

router.post('/logout', isAuthenticated, (req, res) => {
  req.session.username = null
  res.send('you logged out')
})
router.get('/isLogged', (req, res) => {
  res.json(req.session.username)
})
module.exports = router
