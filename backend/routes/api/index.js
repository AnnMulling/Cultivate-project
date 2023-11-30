const router = require('express').Router();

const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
const { restoreUser } = require('../../utils/auth.js');

router.use(restoreUser);

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
