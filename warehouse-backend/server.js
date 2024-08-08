const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS

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
  expiryDate: { type: String, required: true }, // Keep as String for non-standard date formats
  weight: { type: String, required: true }, // Keep as String for unit values
});

const GoodsList = mongoose.model('Goods_List', scanSchema);

// POST endpoint to save scanned data with logging
app.post('/api/scan', async (req, res) => {
  console.log('Received data:', req.body); // Log the incoming data
  try {
    const scanData = new GoodsList(req.body); // Use GoodsList model
    console.log('Saving document:', scanData); // Log the document before saving
    await scanData.save();
    console.log('Document saved:', scanData); // Log the saved document
    res.status(200).json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error saving data:', error); // Log any errors
    res.status(500).json({ message: 'Error saving data', error });
  }
});

// Start server
const PORT = process.env.PORT || 5000; // Use environment variable or default to 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
