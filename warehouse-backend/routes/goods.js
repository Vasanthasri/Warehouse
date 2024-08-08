const express = require('express');
const router = express.Router();
const Good = require('../models/Good');

// Create a new good
router.post('/', async (req, res) => {
  try {
    const good = new Good(req.body);
    await good.save();
    res.status(201).json(good);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all goods
router.get('/', async (req, res) => {
  try {
    const goods = await Good.find();
    res.status(200).json(goods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a good
router.put('/:id', async (req, res) => {
  try {
    const good = await Good.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!good) return res.status(404).json({ message: 'Good not found' });
    res.status(200).json(good);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a good
router.delete('/:id', async (req, res) => {
  try {
    const good = await Good.findByIdAndDelete(req.params.id);
    if (!good) return res.status(404).json({ message: 'Good not found' });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
