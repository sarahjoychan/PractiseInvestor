import { Router } from 'express';
import { authenticate } from '../middleware/authenticate';
// import controller functions
import { getAllUsers, createUser, getUser, login } from '../controllers/users';
import { updateHoldings } from '../controllers/holdings';
import { getAllStocks, getMatchingStocks } from '../controllers/stocks';
import { getRanking } from '../controllers/ranking';

const router = Router();

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

export default router;

// PUT => If user can update all or just a portion of the record
// PATCH => If user can only update a partial record
