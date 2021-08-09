const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticate = async (req, res, next) => {
  try {
    const token = req.header('x-auth-token');

    let decodedData;
    if (token) {
      decodedData = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decodedData;
      next();
    } else {
      res.status(401).send({ message: 'No token, authorization denied.' });
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

module.exports = authenticate;
