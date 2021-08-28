import mongoose from './index';

// tracks last update of Ranking and users' totalValueHistory
const lastUpdateSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
});

export default mongoose.model('LastUpdate', lastUpdateSchema);
