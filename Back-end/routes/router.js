const { Router } = require('express');
const authenticate = require('../middleware/authenticate');

const router = Router();

// import controller functions
const {
  getAllUsers, createUser, getUser, login,
} = require('../controllers/users');
const { updateHoldings } = require('../controllers/holdings');
const { getAllStocks, getMatchingStocks } = require('../controllers/stocks');
const { getRanking } = require('../controllers/ranking');

// HTTP requests (get, post, put, delete)

// users/user
router.get('/users', getAllUsers); // get all users
router.get('/user', authenticate, getUser);// get Single User
router.post('/users', createUser); // when new account is created
router.post('/user/login', login);

// when user buys/sells a holding
router.put('/user/updateHolding', authenticate, updateHoldings);// when user adds/deletes a holding affects cash, investments, activities,

// to be able to get the ranking
router.get('/users/ranking', getRanking);

// stock filter api (name and ticker)
router.get('/stocks', getAllStocks);
router.get('/stocks/:filter', getMatchingStocks);

module.exports = router;

// PUT => If user can update all or just a portion of the record
// PATCH => If user can only update a partial record
