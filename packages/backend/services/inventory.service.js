// Service d'inventaire
const { Inventory, Warehouse, Product, InventoryMovement } = require('../models');

class InventoryService {
  // Créer ou mettre à jour un niveau d'inventaire
  async upsertInventory(inventoryData, userId) {
    try {
      // Vérifier si l'entrepôt existe
      const warehouse = await Warehouse.findByPk(inventoryData.warehouse_id);
      if (!warehouse) {
        throw new Error('Entrepôt non trouvé');
      }

      // Vérifier si le produit existe
      const product = await Product.findByPk(inventoryData.product_id);
      if (!product) {
        throw new Error('Produit non trouvé');
      }

      // Créer ou mettre à jour l'inventaire
      const [inventory, created] = await Inventory.findOrCreate({
        where: {
          warehouse_id: inventoryData.warehouse_id,
          product_id: inventoryData.product_id
        },
        defaults: inventoryData
      });

      if (!created) {
        await inventory.update(inventoryData);
      }

      return await this.getInventoryById(inventory.id);
    } catch (error) {
      throw new Error(`Erreur lors de la mise à jour de l'inventaire: ${error.message}`);
    }
  }

  // Récupérer tous les niveaux d'inventaire
  async getAllInventory(page = 1, limit = 10, filters = {}) {
    try {
      const offset = (page - 1) * limit;
      
      const whereClause = {};
      if (filters.warehouse_id) {
        whereClause.warehouse_id = filters.warehouse_id;
      }
      
      if (filters.product_id) {
        whereClause.product_id = filters.product_id;
      }

      const { count, rows } = await Inventory.findAndCountAll({
        where: whereClause,
        limit,
        offset,
        order: [['created_at', 'DESC']],
        include: [
          {
            model: Warehouse,
            as: 'warehouse',
            attributes: ['id', 'name']
          },
          {
            model: Product,
            as: 'product',
            attributes: ['id', 'name', 'sku']
          }
        ]
      });

      return {
        inventory: rows,
        totalCount: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page
      };
    } catch (error) {
      throw new Error(`Erreur lors de la récupération de l'inventaire: ${error.message}`);
    }
  }

  // Récupérer un niveau d'inventaire par ID
  async getInventoryById(id) {
    try {
      const inventory = await Inventory.findByPk(id, {
        include: [
          {
            model: Warehouse,
            as: 'warehouse',
            attributes: ['id', 'name']
          },
          {
            model: Product,
            as: 'product',
            attributes: ['id', 'name', 'sku']
          }
        ]
      });

      if (!inventory) {
        throw new Error('Niveau d\'inventaire non trouvé');
      }

      return inventory;
    } catch (error) {
      throw new Error(`Erreur lors de la récupération du niveau d'inventaire: ${error.message}`);
    }
  }

  // Récupérer l'inventaire par entrepôt et produit
  async getInventoryByWarehouseAndProduct(warehouseId, productId) {
    try {
      const inventory = await Inventory.findOne({
        where: {
          warehouse_id: warehouseId,
          product_id: productId
        },
        include: [
          {
            model: Warehouse,
            as: 'warehouse',
            attributes: ['id', 'name']
          },
          {
            model: Product,
            as: 'product',
            attributes: ['id', 'name', 'sku']
          }
        ]
      });

      return inventory;
    } catch (error) {
      throw new Error(`Erreur lors de la récupération de l'inventaire: ${error.message}`);
    }
  }

  // Mettre à jour les quantités d'inventaire
  async updateInventoryQuantities(warehouseId, productId, quantityChange, movementType, userId, reference = null) {
    try {
      // Trouver ou créer l'inventaire
      const [inventory, created] = await Inventory.findOrCreate({
        where: {
          warehouse_id: warehouseId,
          product_id: productId
        },
        defaults: {
          quantity: 0,
          reserved_quantity: 0
        }
      });

      // Calculer la nouvelle quantité
      const newQuantity = inventory.quantity + quantityChange;

      // Vérifier si la quantité est valide
      if (newQuantity < 0) {
        throw new Error('Quantité insuffisante en stock');
      }

      // Mettre à jour la quantité
      await inventory.update({ quantity: newQuantity });

      // Créer un mouvement d'inventaire
      const movement = await InventoryMovement.create({
        inventory_id: inventory.id,
        movement_type: movementType,
        quantity: Math.abs(quantityChange),
        reference_type: reference ? reference.type : null,
        reference_id: reference ? reference.id : null,
        reason: reference ? reference.reason : null,
        created_by: userId
      });

      return {
        inventory: await this.getInventoryById(inventory.id),
        movement
      };
    } catch (error) {
      throw new Error(`Erreur lors de la mise à jour des quantités: ${error.message}`);
    }
  }

  // Réserver de l'inventaire
  async reserveInventory(warehouseId, productId, quantity, userId, reference = null) {
    try {
      const inventory = await Inventory.findOne({
        where: {
          warehouse_id: warehouseId,
          product_id: productId
        }
      });

      if (!inventory) {
        throw new Error('Inventaire non trouvé');
      }

      // Vérifier si la quantité disponible est suffisante
      const availableQuantity = inventory.quantity - inventory.reserved_quantity;
      if (availableQuantity < quantity) {
        throw new Error('Quantité insuffisante disponible pour réservation');
      }

      // Mettre à jour la quantité réservée
      await inventory.update({
        reserved_quantity: inventory.reserved_quantity + quantity
      });

      // Créer un mouvement d'inventaire
      const movement = await InventoryMovement.create({
        inventory_id: inventory.id,
        movement_type: 'RESERVE',
        quantity: quantity,
        reference_type: reference ? reference.type : null,
        reference_id: reference ? reference.id : null,
        reason: 'Réservation de stock',
        created_by: userId
      });

      return {
        inventory: await this.getInventoryById(inventory.id),
        movement
      };
    } catch (error) {
      throw new Error(`Erreur lors de la réservation de l'inventaire: ${error.message}`);
    }
  }

  // Libérer de l'inventaire réservé
  async releaseReservedInventory(warehouseId, productId, quantity, userId, reference = null) {
    try {
      const inventory = await Inventory.findOne({
        where: {
          warehouse_id: warehouseId,
          product_id: productId
        }
      });

      if (!inventory) {
        throw new Error('Inventaire non trouvé');
      }

      // Vérifier si la quantité réservée est suffisante
      if (inventory.reserved_quantity < quantity) {
        throw new Error('Quantité réservée insuffisante');
      }

      // Mettre à jour la quantité réservée
      await inventory.update({
        reserved_quantity: inventory.reserved_quantity - quantity
      });

      // Créer un mouvement d'inventaire
      const movement = await InventoryMovement.create({
        inventory_id: inventory.id,
        movement_type: 'RELEASE',
        quantity: quantity,
        reference_type: reference ? reference.type : null,
        reference_id: reference ? reference.id : null,
        reason: 'Libération de stock réservé',
        created_by: userId
      });

      return {
        inventory: await this.getInventoryById(inventory.id),
        movement
      };
    } catch (error) {
      throw new Error(`Erreur lors de la libération de l'inventaire réservé: ${error.message}`);
    }
  }

  // Récupérer les mouvements d'inventaire
  async getInventoryMovements(inventoryId, page = 1, limit = 10) {
    try {
      const offset = (page - 1) * limit;

      const { count, rows } = await InventoryMovement.findAndCountAll({
        where: {
          inventory_id: inventoryId
        },
        limit,
        offset,
        order: [['created_at', 'DESC']],
        include: [{
          model: User,
          as: 'creator',
          attributes: ['id', 'username', 'first_name', 'last_name']
        }]
      });

      return {
        movements: rows,
        totalCount: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page
      };
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des mouvements d'inventaire: ${error.message}`);
    }
  }

  // Obtenir les alertes de stock bas
  async getLowStockAlerts(threshold = 10) {
    try {
      const lowStockItems = await Inventory.findAll({
        where: {
          quantity: {
            [Inventory.sequelize.Op.lte]: threshold
          }
        },
        include: [
          {
            model: Warehouse,
            as: 'warehouse',
            attributes: ['id', 'name']
          },
          {
            model: Product,
            as: 'product',
            attributes: ['id', 'name', 'sku']
          }
        ],
        order: [['quantity', 'ASC']]
      });

      return lowStockItems;
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des alertes de stock bas: ${error.message}`);
    }
  }
}

module.exports = new InventoryService();