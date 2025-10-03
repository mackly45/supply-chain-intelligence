// Contrôleur des produits
const ProductService = require('../services/product.service');

class ProductController {
  // Créer un produit
  async createProduct(req, res) {
    try {
      const productData = req.body;
      const product = await ProductService.createProduct(productData);
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Récupérer tous les produits
  async getAllProducts(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const filters = {
        name: req.query.name,
        category_id: req.query.category_id,
        supplier_id: req.query.supplier_id
      };

      const result = await ProductService.getAllProducts(page, limit, filters);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Récupérer un produit par ID
  async getProductById(req, res) {
    try {
      const { id } = req.params;
      const product = await ProductService.getProductById(id);
      res.json(product);
    } catch (error) {
      if (error.message === 'Produit non trouvé') {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  // Mettre à jour un produit
  async updateProduct(req, res) {
    try {
      const { id } = req.params;
      const productData = req.body;
      const product = await ProductService.updateProduct(id, productData);
      res.json(product);
    } catch (error) {
      if (error.message === 'Produit non trouvé') {
        res.status(404).json({ error: error.message });
      } else {
        res.status(400).json({ error: error.message });
      }
    }
  }

  // Supprimer un produit
  async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      const result = await ProductService.deleteProduct(id);
      res.json(result);
    } catch (error) {
      if (error.message === 'Produit non trouvé') {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  // Rechercher des produits
  async searchProducts(req, res) {
    try {
      const { query } = req.query;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      
      const result = await ProductService.searchProducts(query, page, limit);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new ProductController();