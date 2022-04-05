const express = require('express')

const router = express.Router()
const isAuthenticated = require('../middlewares/isAuthenticated')

const Question = require('../models/question')

router.get('/', async (req, res, next) => {
  try {
    const questions = await Question.find()
    res.json(questions)
  } catch (e) {
    next(e)
  }
})

router.post('/add', isAuthenticated, async (req, res, next) => {
  const { body, session } = req
  const { username } = session
  const { questionText } = body
  try {
    await Question.create({ author: username, questionText })
    res.send('question added')
  } catch (e) {
    next(e)
  }
})
router.post('/answer', isAuthenticated, async (req, res, next) => {
  const { body } = req
  const { _id, answer } = body
  try {
    await Question.updateOne({ _id }, { answer })
    res.send('question answered')
  } catch (e) {
    next(e)
  }
})

module.exports = router
