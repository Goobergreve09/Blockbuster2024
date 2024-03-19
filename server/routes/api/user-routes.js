const router = require('express').Router();
const {
  createUser,
  getSingleUser,
  saveBook,
  saveMovie,
  deleteBook,
  deleteMovie,
  login,
} = require('../../controllers/user-controllers');

// import middleware
const { authMiddleware } = require('../../utils/auth');

// put authMiddleware anywhere we need to send a token for verification of user
router.route('/').post(createUser);

router.route('/login').post(login);

router.route('/me').get(authMiddleware, getSingleUser);

router.route('/books').post(authMiddleware, saveBook);

router.route('/movies').post(authMiddleware, saveMovie);

router.route('/books/:bookId').delete(authMiddleware, deleteBook);

router.route('/movies/:movieId').delete(authMiddleware, deleteMovie);

module.exports = router;
