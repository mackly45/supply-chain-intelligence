// Service des entrepôts
const { Warehouse, User } = require('../models');

class WarehouseService {
  // Créer un entrepôt
  async createWarehouse(warehouseData, userId) {
    try {
      // Vérifier si l'utilisateur existe
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error('Utilisateur non trouvé');
      }

      // Créer l'entrepôt
      const warehouse = await Warehouse.create({
        ...warehouseData,
        manager_id: userId
      });

      return warehouse;
    } catch (error) {
      throw new Error(`Erreur lors de la création de l'entrepôt: ${error.message}`);
    }
  }

  // Récupérer tous les entrepôts
  async getAllWarehouses(page = 1, limit = 10, filters = {}) {
    try {
      const offset = (page - 1) * limit;
      
      const whereClause = {};
      if (filters.name) {
        whereClause.name = {
          [Warehouse.sequelize.Op.iLike]: `%${filters.name}%`
        };
      }
      
      if (filters.manager_id) {
        whereClause.manager_id = filters.manager_id;
      }

      const { count, rows } = await Warehouse.findAndCountAll({
        where: whereClause,
        limit,
        offset,
        order: [['created_at', 'DESC']],
        include: [{
          model: User,
          as: 'manager',
          attributes: ['id', 'username', 'first_name', 'last_name']
        }]
      });

      return {
        warehouses: rows,
        totalCount: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page
      };
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des entrepôts: ${error.message}`);
    }
  }

  // Récupérer un entrepôt par ID
  async getWarehouseById(id) {
    try {
      const warehouse = await Warehouse.findByPk(id, {
        include: [{
          model: User,
          as: 'manager',
          attributes: ['id', 'username', 'first_name', 'last_name']
        }]
      });

      if (!warehouse) {
        throw new Error('Entrepôt non trouvé');
      }

      return warehouse;
    } catch (error) {
      throw new Error(`Erreur lors de la récupération de l'entrepôt: ${error.message}`);
    }
  }

  // Mettre à jour un entrepôt
  async updateWarehouse(id, warehouseData, userId) {
    try {
      const warehouse = await Warehouse.findByPk(id);

      if (!warehouse) {
        throw new Error('Entrepôt non trouvé');
      }

      // Vérifier les permissions (seul le manager ou un admin peut modifier)
      if (warehouse.manager_id !== userId) {
        const user = await User.findByPk(userId);
        if (user.role !== 'ADMIN') {
          throw new Error('Permission refusée');
        }
      }

      await warehouse.update(warehouseData);
      return await this.getWarehouseById(id);
    } catch (error) {
      throw new Error(`Erreur lors de la mise à jour de l'entrepôt: ${error.message}`);
    }
  }

  // Supprimer un entrepôt
  async deleteWarehouse(id, userId) {
    try {
      const warehouse = await Warehouse.findByPk(id);

      if (!warehouse) {
        throw new Error('Entrepôt non trouvé');
      }

      // Vérifier les permissions (seul un admin peut supprimer)
      const user = await User.findByPk(userId);
      if (user.role !== 'ADMIN') {
        throw new Error('Permission refusée');
      }

      await warehouse.destroy();
      return { message: 'Entrepôt supprimé avec succès' };
    } catch (error) {
      throw new Error(`Erreur lors de la suppression de l'entrepôt: ${error.message}`);
    }
  }

  // Rechercher des entrepôts par localisation
  async searchWarehousesByLocation(latitude, longitude, radius = 10000) { // radius in meters
    try {
      const warehouses = await Warehouse.findAll({
        where: {
          location: {
            [Warehouse.sequelize.Op.not]: null
          }
        },
        attributes: {
          include: [
            [
              Warehouse.sequelize.fn(
                'ST_DistanceSphere',
                Warehouse.sequelize.col('location'),
                Warehouse.sequelize.fn(
                  'ST_MakePoint',
                  longitude,
                  latitude
                )
              ),
              'distance'
            ]
          ]
        },
        having: {
          distance: {
            [Warehouse.sequelize.Op.lte]: radius
          }
        },
        order: [[Warehouse.sequelize.col('distance'), 'ASC']],
        include: [{
          model: User,
          as: 'manager',
          attributes: ['id', 'username', 'first_name', 'last_name']
        }]
      });

      return warehouses;
    } catch (error) {
      throw new Error(`Erreur lors de la recherche des entrepôts par localisation: ${error.message}`);
    }
  }
}

module.exports = new WarehouseService();