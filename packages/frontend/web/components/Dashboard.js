import React from 'react';

const Dashboard = () => {
  return (
    <div>
      <h2>Tableau de bord</h2>
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Entrepôts</h3>
          <p>5</p>
        </div>
        <div className="stat-card">
          <h3>Produits</h3>
          <p>128</p>
        </div>
        <div className="stat-card">
          <h3>Expéditions en cours</h3>
          <p>24</p>
        </div>
        <div className="stat-card">
          <h3>Alertes</h3>
          <p>3</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;