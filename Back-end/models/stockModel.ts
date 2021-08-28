import mongoose from './index';

const stockSchema = new mongoose.Schema({
  symbol: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
});

export default mongoose.model('Stock', stockSchema);
