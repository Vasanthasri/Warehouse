// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB using environment variable
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Define a schema and model
const scanSchema = new mongoose.Schema({
  item: { type: String, required: true },
  quantity: { type: Number, required: true },
  expiryDate: { type: String, required: true },
  weight: { type: String, required: true },
});

const GoodsList = mongoose.model('Goods_List', scanSchema);

// POST endpoint to import stock
app.post('/api/stock/import', async (req, res) => {
  try {
    const scanData = new GoodsList(req.body);
    await scanData.save();
    res.status(200).json({ message: 'Goods imported successfully' });
  } catch (error) {
    console.error('Error importing goods:', error);
    res.status(500).json({ message: 'Error importing goods', error: error.message });
  }
});

// POST endpoint to export stock
app.post('/api/stock/export', async (req, res) => {
  try {
    const { code } = req.body;

    // Validate input
    if (!code) {
      return res.status(400).json({ message: 'Item code is required' });
    }

    // Find and delete the item with the specified code
    const result = await GoodsList.findOneAndDelete({ item: code });

    if (result) {
      res.status(200).json({ message: 'Goods exported successfully', data: result });
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    console.error('Error exporting goods:', error);
    res.status(500).json({ message: 'Error exporting goods', error: error.message });
  }
});

// GET endpoint to retrieve all stock data
app.get('/api/stock', async (req, res) => {
  try {
    const stockData = await GoodsList.find();
    res.status(200).json(stockData);
  } catch (error) {
    console.error('Error fetching stock data:', error);
    res.status(500).json({ message: 'Error fetching stock data', error: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
