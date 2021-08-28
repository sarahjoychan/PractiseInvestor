import mongoose from './index';

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cash: {
    type: Number,
    default: 50000,
  },
  holdings: {
    type: Array,
    default: [],
  },
  activities: {
    type: Array,
    default: [],
  },
  totalValueHistory: {
    type: Array,
    default: [], // {totalValue, date}
  },
}, {
  timestamps: true, // creates an createdat and updated at field whenever a document is created
});
// Mongoose automatically looks for the plural, lowercased version of your model name. Thus,
// for the example above, the model User is for the users collection in the database.
export default mongoose.model('User', userSchema);

/*

Activity object:

{
"date": "26thjuly",
"company": "Matterport",
"ticker": "GHVI",
"action": "buy",
"quantity": 500,
"price": 15.21,
"netAmount": 7605
}

CreateUser:

{
  "userName": "RahmatYousufi",
  "password": "123456"
}

holdings object:

{
  company:
  ticker:
  quantity:
  avgCost:
}

*/
