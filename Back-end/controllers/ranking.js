const axios = require('axios');
const rateLimit = require('axios-rate-limit');
const Ranking = require('../models/rankingModel');
const User = require('../models/userModel');
require('dotenv').config();

async function getPrices() {
  const users = await User.find();
  const prices = {};
  for (const user of users) {
    for (const holding of user.holdings) {
      prices[holding.ticker] = 0;
    }
  }
  const http = rateLimit(axios.create(), { maxRequests: 55, perMilliseconds: 60000 });
  for (const [key] of Object.entries(prices)) {
    await http.get(`https://api.twelvedata.com/price?symbol=${key}&apikey=${process.env.API_KEY}`)
      .then((res) => {
        prices[key] = Number(res.data.price);
      });
  }
  return [prices, users];
}

async function storeRanking() {
  const [prices, users] = await getPrices();
  const rankings = [];
  for (let j = 0; j < users.length; j += 1) {
    const {
      userName, holdings, activities, cash,
    } = users[j];
    const totalNumberOfActivities = activities.length;
    const numberOfStocks = holdings.length;
    let calcPortfolioValue = cash;
    for (let i = 0; i < holdings.length; i += 1) {
      calcPortfolioValue += prices[holdings[i].ticker] * holdings[i].quantity;
    }
    rankings.push({
      userName,
      totalValue: calcPortfolioValue,
      totalNumberOfActivities,
      numberOfStocks,
    });
  }
  await Ranking.deleteMany();
  Ranking.create(rankings);
  return rankings;
}

async function getRanking(req, res) {
  let rankings = await Ranking.find();
  if (!rankings.length) {
    rankings = await storeRanking();
  }
  rankings.sort((a, b) => b.totalValue - a.totalValue);
  res.send(rankings);
  res.status(200);
}

module.exports = {
  getRanking,
  storeRanking,
};
