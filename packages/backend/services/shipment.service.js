// Service des expéditions
const { Shipment, Warehouse, CustomerOrder, Vehicle, Driver, User } = require('../models');
const { InventoryService } = require('./index');

class ShipmentService {
  // Créer une expédition
  async createShipment(shipmentData, userId) {
    try {
      // Vérifier si l'entrepôt d'origine existe
      if (shipmentData.origin_warehouse_id) {
        const originWarehouse = await Warehouse.findByPk(shipmentData.origin_warehouse_id);
        if (!originWarehouse) {
          throw new Error('Entrepôt d\'origine non trouvé');
        }
      }

      // Vérifier si l'entrepôt de destination existe
      if (shipmentData.destination_warehouse_id) {
        const destinationWarehouse = await Warehouse.findByPk(shipmentData.destination_warehouse_id);
        if (!destinationWarehouse) {
          throw new Error('Entrepôt de destination non trouvé');
        }
      }

      // Vérifier si la commande client existe
      if (shipmentData.customer_order_id) {
        const order = await CustomerOrder.findByPk(shipmentData.customer_order_id);
        if (!order) {
          throw new Error('Commande client non trouvée');
        }
      }

      // Vérifier si le véhicule existe
      if (shipmentData.vehicle_id) {
        const vehicle = await Vehicle.findByPk(shipmentData.vehicle_id);
        if (!vehicle) {
          throw new Error('Véhicule non trouvé');
        }
      }

      // Vérifier si le chauffeur existe
      if (shipmentData.driver_id) {
        const driver = await Driver.findByPk(shipmentData.driver_id);
        if (!driver) {
          throw new Error('Chauffeur non trouvé');
        }
      }

      // Générer un numéro de suivi unique
      const trackingNumber = await this.generateTrackingNumber();

      // Créer l'expédition
      const shipment = await Shipment.create({
        ...shipmentData,
        tracking_number: trackingNumber,
        created_by: userId
      });

      return await this.getShipmentById(shipment.id);
    } catch (error) {
      throw new Error(`Erreur lors de la création de l'expédition: ${error.message}`);
    }
  }

  // Générer un numéro de suivi unique
  async generateTrackingNumber() {
    try {
      const timestamp = Date.now().toString();
      const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
      return `SCLI-${timestamp.substring(timestamp.length - 6)}-${random}`;
    } catch (error) {
      throw new Error(`Erreur lors de la génération du numéro de suivi: ${error.message}`);
    }
  }

  // Récupérer toutes les expéditions
  async getAllShipments(page = 1, limit = 10, filters = {}) {
    try {
      const offset = (page - 1) * limit;
      
      const whereClause = {};
      if (filters.status) {
        whereClause.status = filters.status;
      }
      
      if (filters.tracking_number) {
        whereClause.tracking_number = {
          [Shipment.sequelize.Op.iLike]: `%${filters.tracking_number}%`
        };
      }
      
      if (filters.origin_warehouse_id) {
        whereClause.origin_warehouse_id = filters.origin_warehouse_id;
      }
      
      if (filters.destination_warehouse_id) {
        whereClause.destination_warehouse_id = filters.destination_warehouse_id;
      }

      const { count, rows } = await Shipment.findAndCountAll({
        where: whereClause,
        limit,
        offset,
        order: [['created_at', 'DESC']],
        include: [
          {
            model: Warehouse,
            as: 'origin_warehouse',
            attributes: ['id', 'name']
          },
          {
            model: Warehouse,
            as: 'destination_warehouse',
            attributes: ['id', 'name']
          },
          {
            model: CustomerOrder,
            as: 'customer_order',
            attributes: ['id', 'order_number']
          },
          {
            model: Vehicle,
            as: 'vehicle',
            attributes: ['id', 'registration_number']
          },
          {
            model: Driver,
            as: 'driver',
            attributes: ['id', 'first_name', 'last_name']
          },
          {
            model: User,
            as: 'creator',
            attributes: ['id', 'username', 'first_name', 'last_name']
          }
        ]
      });

      return {
        shipments: rows,
        totalCount: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page
      };
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des expéditions: ${error.message}`);
    }
  }

  // Récupérer une expédition par ID
  async getShipmentById(id) {
    try {
      const shipment = await Shipment.findByPk(id, {
        include: [
          {
            model: Warehouse,
            as: 'origin_warehouse',
            attributes: ['id', 'name']
          },
          {
            model: Warehouse,
            as: 'destination_warehouse',
            attributes: ['id', 'name']
          },
          {
            model: CustomerOrder,
            as: 'customer_order',
            attributes: ['id', 'order_number']
          },
          {
            model: Vehicle,
            as: 'vehicle',
            attributes: ['id', 'registration_number']
          },
          {
            model: Driver,
            as: 'driver',
            attributes: ['id', 'first_name', 'last_name']
          },
          {
            model: User,
            as: 'creator',
            attributes: ['id', 'username', 'first_name', 'last_name']
          }
        ]
      });

      if (!shipment) {
        throw new Error('Expédition non trouvée');
      }

      return shipment;
    } catch (error) {
      throw new Error(`Erreur lors de la récupération de l'expédition: ${error.message}`);
    }
  }

  // Récupérer une expédition par numéro de suivi
  async getShipmentByTrackingNumber(trackingNumber) {
    try {
      const shipment = await Shipment.findOne({
        where: { tracking_number: trackingNumber },
        include: [
          {
            model: Warehouse,
            as: 'origin_warehouse',
            attributes: ['id', 'name']
          },
          {
            model: Warehouse,
            as: 'destination_warehouse',
            attributes: ['id', 'name']
          },
          {
            model: CustomerOrder,
            as: 'customer_order',
            attributes: ['id', 'order_number']
          },
          {
            model: Vehicle,
            as: 'vehicle',
            attributes: ['id', 'registration_number']
          },
          {
            model: Driver,
            as: 'driver',
            attributes: ['id', 'first_name', 'last_name']
          },
          {
            model: User,
            as: 'creator',
            attributes: ['id', 'username', 'first_name', 'last_name']
          }
        ]
      });

      if (!shipment) {
        throw new Error('Expédition non trouvée');
      }

      return shipment;
    } catch (error) {
      throw new Error(`Erreur lors de la récupération de l'expédition: ${error.message}`);
    }
  }

  // Mettre à jour une expédition
  async updateShipment(id, shipmentData, userId) {
    try {
      const shipment = await Shipment.findByPk(id);

      if (!shipment) {
        throw new Error('Expédition non trouvée');
      }

      // Vérifier si l'entrepôt d'origine existe
      if (shipmentData.origin_warehouse_id) {
        const originWarehouse = await Warehouse.findByPk(shipmentData.origin_warehouse_id);
        if (!originWarehouse) {
          throw new Error('Entrepôt d\'origine non trouvé');
        }
      }

      // Vérifier si l'entrepôt de destination existe
      if (shipmentData.destination_warehouse_id) {
        const destinationWarehouse = await Warehouse.findByPk(shipmentData.destination_warehouse_id);
        if (!destinationWarehouse) {
          throw new Error('Entrepôt de destination non trouvé');
        }
      }

      // Vérifier si la commande client existe
      if (shipmentData.customer_order_id) {
        const order = await CustomerOrder.findByPk(shipmentData.customer_order_id);
        if (!order) {
          throw new Error('Commande client non trouvée');
        }
      }

      // Vérifier si le véhicule existe
      if (shipmentData.vehicle_id) {
        const vehicle = await Vehicle.findByPk(shipmentData.vehicle_id);
        if (!vehicle) {
          throw new Error('Véhicule non trouvé');
        }
      }

      // Vérifier si le chauffeur existe
      if (shipmentData.driver_id) {
        const driver = await Driver.findByPk(shipmentData.driver_id);
        if (!driver) {
          throw new Error('Chauffeur non trouvé');
        }
      }

      await shipment.update(shipmentData);
      return await this.getShipmentById(id);
    } catch (error) {
      throw new Error(`Erreur lors de la mise à jour de l'expédition: ${error.message}`);
    }
  }

  // Mettre à jour le statut d'une expédition
  async updateShipmentStatus(id, status, userId) {
    try {
      const shipment = await Shipment.findByPk(id);

      if (!shipment) {
        throw new Error('Expédition non trouvée');
      }

      // Valider le statut
      const validStatuses = ['PENDING', 'IN_TRANSIT', 'DELIVERED', 'CANCELLED'];
      if (!validStatuses.includes(status)) {
        throw new Error('Statut invalide');
      }

      // Mettre à jour le statut
      await shipment.update({ status });

      // Si l'expédition est marquée comme livrée, mettre à jour la date réelle d'arrivée
      if (status === 'DELIVERED' && !shipment.actual_arrival) {
        await shipment.update({ actual_arrival: new Date() });
      }

      // Si l'expédition est en transit, mettre à jour la date réelle de départ
      if (status === 'IN_TRANSIT' && !shipment.actual_departure) {
        await shipment.update({ actual_departure: new Date() });
      }

      return await this.getShipmentById(id);
    } catch (error) {
      throw new Error(`Erreur lors de la mise à jour du statut de l'expédition: ${error.message}`);
    }
  }

  // Supprimer une expédition
  async deleteShipment(id, userId) {
    try {
      const shipment = await Shipment.findByPk(id);

      if (!shipment) {
        throw new Error('Expédition non trouvée');
      }

      await shipment.destroy();
      return { message: 'Expédition supprimée avec succès' };
    } catch (error) {
      throw new Error(`Erreur lors de la suppression de l'expédition: ${error.message}`);
    }
  }

  // Rechercher des expéditions
  async searchShipments(query, page = 1, limit = 10) {
    try {
      const offset = (page - 1) * limit;

      const { count, rows } = await Shipment.findAndCountAll({
        where: {
          [Shipment.sequelize.Op.or]: [
            { tracking_number: { [Shipment.sequelize.Op.iLike]: `%${query}%` } },
            { status: { [Shipment.sequelize.Op.iLike]: `%${query}%` } }
          ]
        },
        limit,
        offset,
        order: [['created_at', 'DESC']],
        include: [
          {
            model: Warehouse,
            as: 'origin_warehouse',
            attributes: ['id', 'name']
          },
          {
            model: Warehouse,
            as: 'destination_warehouse',
            attributes: ['id', 'name']
          },
          {
            model: CustomerOrder,
            as: 'customer_order',
            attributes: ['id', 'order_number']
          },
          {
            model: Vehicle,
            as: 'vehicle',
            attributes: ['id', 'registration_number']
          },
          {
            model: Driver,
            as: 'driver',
            attributes: ['id', 'first_name', 'last_name']
          },
          {
            model: User,
            as: 'creator',
            attributes: ['id', 'username', 'first_name', 'last_name']
          }
        ]
      });

      return {
        shipments: rows,
        totalCount: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page
      };
    } catch (error) {
      throw new Error(`Erreur lors de la recherche des expéditions: ${error.message}`);
    }
  }

  // Obtenir les statistiques des expéditions
  async getShipmentStatistics() {
    try {
      const totalShipments = await Shipment.count();
      
      const statusCounts = await Shipment.findAll({
        attributes: [
          'status',
          [Shipment.sequelize.fn('COUNT', Shipment.sequelize.col('status')), 'count']
        ],
        group: ['status']
      });

      const recentShipments = await Shipment.findAll({
        limit: 5,
        order: [['created_at', 'DESC']],
        include: [
          {
            model: Warehouse,
            as: 'origin_warehouse',
            attributes: ['name']
          },
          {
            model: Warehouse,
            as: 'destination_warehouse',
            attributes: ['name']
          }
        ]
      });

      return {
        totalShipments,
        statusCounts,
        recentShipments
      };
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des statistiques des expéditions: ${error.message}`);
    }
  }
}

module.exports = new ShipmentService();