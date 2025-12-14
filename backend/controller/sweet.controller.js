import Sweet from '../models/Sweet.js';

// Add a new sweet (Admin only)
export const createSweet = async (req, res) => {
  try {
    const { name, description, category, price, quantity, imageUrl } = req.body;

    // Check if sweet already exists
    const existingSweet = await Sweet.findOne({ name });
    if (existingSweet) {
      return res.status(400).json({ message: 'Sweet with this name already exists' });
    }

    const sweet = new Sweet({
      name,
      description,
      category,
      price,
      quantity: quantity || 0,
      imageUrl,
    });

    const savedSweet = await sweet.save();
    res.status(201).json({
      message: 'Sweet created successfully',
      sweet: savedSweet,
    });
  } catch (error) {
    console.error('Create sweet error:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all sweets
export const getAllSweets = async (req, res) => {
  try {
    const sweets = await Sweet.find().sort({ createdAt: -1 });
    res.json({
      count: sweets.length,
      sweets,
    });
  } catch (error) {
    console.error('Get all sweets error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Search sweets
export const searchSweets = async (req, res) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;

    const query = {};

    if (name) {
      query.name = { $regex: name, $options: 'i' };
    }

    if (category) {
      query.category = category;
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      query.price = {};
      if (minPrice !== undefined) query.price.$gte = Number(minPrice);
      if (maxPrice !== undefined) query.price.$lte = Number(maxPrice);
    }

    const sweets = await Sweet.find(query).sort({ createdAt: -1 });
    res.json({
      count: sweets.length,
      sweets,
    });
  } catch (error) {
    console.error('Search sweets error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a sweet (Admin only)
export const updateSweet = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Remove non-updatable fields
    delete updates._id;
    delete updates.createdAt;
    delete updates.updatedAt;

    // Check if sweet exists
    const sweet = await Sweet.findById(id);
    if (!sweet) {
      return res.status(404).json({ message: 'Sweet not found' });
    }

    // If updating name, check for duplicates
    if (updates.name && updates.name !== sweet.name) {
      const existingSweet = await Sweet.findOne({ name: updates.name });
      if (existingSweet) {
        return res.status(400).json({ message: 'Sweet with this name already exists' });
      }
    }

    const updatedSweet = await Sweet.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    );

    res.json({
      message: 'Sweet updated successfully',
      sweet: updatedSweet,
    });
  } catch (error) {
    console.error('Update sweet error:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a sweet (Admin only)
export const deleteSweet = async (req, res) => {
  try {
    const { id } = req.params;

    const sweet = await Sweet.findByIdAndDelete(id);
    if (!sweet) {
      return res.status(404).json({ message: 'Sweet not found' });
    }

    res.json({
      message: 'Sweet deleted successfully',
      sweetId: id,
    });
  } catch (error) {
    console.error('Delete sweet error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Purchase a sweet
export const purchaseSweet = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity <= 0) {
      return res.status(400).json({ message: 'Valid quantity is required' });
    }

    const sweet = await Sweet.findById(id);
    if (!sweet) {
      return res.status(404).json({ message: 'Sweet not found' });
    }

    if (sweet.quantity < quantity) {
      return res.status(400).json({ 
        message: `Insufficient stock. Only ${sweet.quantity} items available` 
      });
    }

    sweet.quantity -= quantity;
    await sweet.save();

    res.json({
      message: 'Purchase successful',
      sweet: {
        id: sweet._id,
        name: sweet.name,
        remainingQuantity: sweet.quantity,
        purchasedQuantity: quantity,
      },
    });
  } catch (error) {
    console.error('Purchase error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Restock a sweet (Admin only)
export const restockSweet = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity <= 0) {
      return res.status(400).json({ message: 'Valid quantity is required' });
    }

    const sweet = await Sweet.findById(id);
    if (!sweet) {
      return res.status(404).json({ message: 'Sweet not found' });
    }

    sweet.quantity += quantity;
    await sweet.save();

    res.json({
      message: 'Restock successful',
      sweet: {
        id: sweet._id,
        name: sweet.name,
        newQuantity: sweet.quantity,
        addedQuantity: quantity,
      },
    });
  } catch (error) {
    console.error('Restock error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

