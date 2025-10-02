import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import WarehouseList from './components/WarehouseList';
import WarehouseDetail from './components/WarehouseDetail';
import ProductList from './components/ProductList';
import InventoryList from './components/InventoryList';
import ShipmentList from './components/ShipmentList';
import ShipmentDetail from './components/ShipmentDetail';
import VehicleList from './components/VehicleList';
import DriverList from './components/DriverList';

function App() {
  return (
    <div className="App">
      <h1>Supply Chain Intelligence - Interface Web</h1>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/warehouses" element={<WarehouseList />} />
        <Route path="/warehouses/:id" element={<WarehouseDetail />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/inventory" element={<InventoryList />} />
        <Route path="/shipments" element={<ShipmentList />} />
        <Route path="/shipments/:id" element={<ShipmentDetail />} />
        <Route path="/vehicles" element={<VehicleList />} />
        <Route path="/drivers" element={<DriverList />} />
      </Routes>
    </div>
  );
}

export default App;