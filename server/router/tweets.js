import express from 'express';
import 'express-async-errors';
import { body } from 'express-validator';
import * as tweetController from '../controller/tweet.js';
import { isAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validator.js';

const router = express.Router();

// 유효성 검사
const validateTweet = [
  body('text')
    .trim()
    .isLength({ min: 3 })
    .withMessage('text should be at least 3 characters'),
  validate
];

// GET : /tweets?username=:username
router.get('/', isAuth, tweetController.getTweets);

// GET : /tweets/:id
router.get('/:id', isAuth, tweetController.getTweet);

// POST : /tweets
// 유효성 검사 전 코드
// router.post('/', tweetController.createTweet); 
router.post('/', isAuth, validateTweet, tweetController.createTweet);

// PUT : tweets/:id
// 유효성 검사 전 코드
// router.put('/:id', tweetController.updateTweet);
router.put('/:id', isAuth, validateTweet, tweetController.updateTweet);

// DELETE : /tweets/:id
router.delete('/:id', isAuth, tweetController.deleteTweet);

export default router;
