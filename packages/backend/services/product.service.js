// Service des produits
const { Product, ProductCategory, Supplier } = require('../models');

class ProductService {
  // Créer un produit
  async createProduct(productData) {
    try {
      // Vérifier si la catégorie existe
      if (productData.category_id) {
        const category = await ProductCategory.findByPk(productData.category_id);
        if (!category) {
          throw new Error('Catégorie non trouvée');
        }
      }

      // Vérifier si le fournisseur existe
      if (productData.supplier_id) {
        const supplier = await Supplier.findByPk(productData.supplier_id);
        if (!supplier) {
          throw new Error('Fournisseur non trouvé');
        }
      }

      // Créer le produit
      const product = await Product.create(productData);
      return await this.getProductById(product.id);
    } catch (error) {
      throw new Error(`Erreur lors de la création du produit: ${error.message}`);
    }
  }

  // Récupérer tous les produits
  async getAllProducts(page = 1, limit = 10, filters = {}) {
    try {
      const offset = (page - 1) * limit;
      
      const whereClause = {};
      if (filters.name) {
        whereClause.name = {
          [Product.sequelize.Op.iLike]: `%${filters.name}%`
        };
      }
      
      if (filters.category_id) {
        whereClause.category_id = filters.category_id;
      }
      
      if (filters.supplier_id) {
        whereClause.supplier_id = filters.supplier_id;
      }

      const { count, rows } = await Product.findAndCountAll({
        where: whereClause,
        limit,
        offset,
        order: [['created_at', 'DESC']],
        include: [
          {
            model: ProductCategory,
            as: 'category',
            attributes: ['id', 'name']
          },
          {
            model: Supplier,
            as: 'supplier',
            attributes: ['id', 'name']
          }
        ]
      });

      return {
        products: rows,
        totalCount: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page
      };
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des produits: ${error.message}`);
    }
  }

  // Récupérer un produit par ID
  async getProductById(id) {
    try {
      const product = await Product.findByPk(id, {
        include: [
          {
            model: ProductCategory,
            as: 'category',
            attributes: ['id', 'name']
          },
          {
            model: Supplier,
            as: 'supplier',
            attributes: ['id', 'name']
          }
        ]
      });

      if (!product) {
        throw new Error('Produit non trouvé');
      }

      return product;
    } catch (error) {
      throw new Error(`Erreur lors de la récupération du produit: ${error.message}`);
    }
  }

  // Mettre à jour un produit
  async updateProduct(id, productData) {
    try {
      const product = await Product.findByPk(id);

      if (!product) {
        throw new Error('Produit non trouvé');
      }

      // Vérifier si la catégorie existe
      if (productData.category_id) {
        const category = await ProductCategory.findByPk(productData.category_id);
        if (!category) {
          throw new Error('Catégorie non trouvée');
        }
      }

      // Vérifier si le fournisseur existe
      if (productData.supplier_id) {
        const supplier = await Supplier.findByPk(productData.supplier_id);
        if (!supplier) {
          throw new Error('Fournisseur non trouvé');
        }
      }

      await product.update(productData);
      return await this.getProductById(id);
    } catch (error) {
      throw new Error(`Erreur lors de la mise à jour du produit: ${error.message}`);
    }
  }

  // Supprimer un produit
  async deleteProduct(id) {
    try {
      const product = await Product.findByPk(id);

      if (!product) {
        throw new Error('Produit non trouvé');
      }

      await product.destroy();
      return { message: 'Produit supprimé avec succès' };
    } catch (error) {
      throw new Error(`Erreur lors de la suppression du produit: ${error.message}`);
    }
  }

  // Rechercher des produits
  async searchProducts(query, page = 1, limit = 10) {
    try {
      const offset = (page - 1) * limit;

      const { count, rows } = await Product.findAndCountAll({
        where: {
          [Product.sequelize.Op.or]: [
            { name: { [Product.sequelize.Op.iLike]: `%${query}%` } },
            { description: { [Product.sequelize.Op.iLike]: `%${query}%` } },
            { sku: { [Product.sequelize.Op.iLike]: `%${query}%` } }
          ]
        },
        limit,
        offset,
        order: [['created_at', 'DESC']],
        include: [
          {
            model: ProductCategory,
            as: 'category',
            attributes: ['id', 'name']
          },
          {
            model: Supplier,
            as: 'supplier',
            attributes: ['id', 'name']
          }
        ]
      });

      return {
        products: rows,
        totalCount: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page
      };
    } catch (error) {
      throw new Error(`Erreur lors de la recherche des produits: ${error.message}`);
    }
  }
}

module.exports = new ProductService();