import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WarehouseList = () => {
  const [warehouses, setWarehouses] = useState([]);

  useEffect(() => {
    // Charger la liste des entrepôts depuis l'API
    axios.get('/api/warehouses')
      .then(response => {
        setWarehouses(response.data);
      })
      .catch(error => {
        console.error('Erreur lors du chargement des entrepôts:', error);
      });
  }, []);

  return (
    <div>
      <h2>Liste des entrepôts</h2>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Adresse</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {warehouses.map(warehouse => (
            <tr key={warehouse.id}>
              <td>{warehouse.name}</td>
              <td>{warehouse.address}</td>
              <td>
                <button>Voir</button>
                <button>Modifier</button>
                <button>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WarehouseList;