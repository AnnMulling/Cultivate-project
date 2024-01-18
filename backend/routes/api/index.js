const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const boardsRouter = require('./boards.js');
const listRouter = require('./lists.js');
const cardRouter = require('./cards.js');
const { setTokenCookie, restoreUser } = require('../../utils/auth.js');
const { User } = require('../../db/models');


// Connect restoreUser middleware to the API router
router.use(restoreUser);

// If current user session is valid, set req.user to the user in the database
router.use('/session', sessionRouter);

// If current user session is not valid, set req.user to null
router.use('/users', usersRouter);

// Board rooutes
router.use('/boards', boardsRouter);

// List routes
router.use('/lists', listRouter);

// Card routes
router.use('/cards', cardRouter);

//frontend test
router.post('/test', (req, res) => {
    res.json({ requestBody: req.body });
  });
// Connect restoreUser middleware to the API router
router.get(
  '/restore-user',
  (req, res) => {
    return res.json(req.user);
  }
);

// If current user session is valid, set req.user to the user in the database
router.get('/set-token-cookie', async (_req, res) => {
  const user = await User.findOne({
    where: {
      username: 'Demo-lition'
    }
  });
  setTokenCookie(res, user);
  return res.json({ user: user });
});


 // If current user session is not valid, set req.user to null
const { requireAuth } = require('../../utils/auth.js');
router.get(
  '/require-auth',
  requireAuth,
  (req, res) => {
    return res.json(req.user);
  }
);
module.exports = router;
