const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');
const auth = require('../middleware/authMiddleware');

// Create customer
router.post('/', auth, async (req, res) => {
  try {
    const c = new Customer(req.body);
    const saved = await c.save();
    res.status(201).json(saved);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

// Get all customers
router.get('/', auth, async (req, res) => {
  try {
    const list = await Customer.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Update customer
router.patch('/:id', auth, async (req, res) => {
  try {
    const updated = await Customer.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ error: 'Customer not found' });
    res.json(updated);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

// Delete customer
router.delete('/:id', auth, async (req, res) => {
  try {
    const deleted = await Customer.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Customer not found' });
    res.json({ message: 'Deleted', customer: deleted });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
