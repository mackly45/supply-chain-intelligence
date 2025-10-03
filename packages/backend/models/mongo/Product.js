// Modèle Produit pour MongoDB
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  sku: {
    type: String,
    unique: true,
  },
  category: String,
  price: Number,
  attributes: mongoose.Schema.Types.Mixed,
}, {
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
});

// Indexation
ProductSchema.index({ sku: 1 });
ProductSchema.index({ category: 1 });

module.exports = mongoose.model('Product', ProductSchema);