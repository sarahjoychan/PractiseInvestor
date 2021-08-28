import mongoose from './index';

const rankSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  totalValue: {
    type: Number,
    required: true,
  },
  totalNumberOfActivities: {
    type: Number,
    required: true,
    default: 0,
  },
  numberOfStocks: {
    type: Number,
    required: true,
    default: 0,
  },
});

export default mongoose.model('Ranking', rankSchema);
