import React, { createContext, useContext, useState, useEffect } from 'react';

const MaintenanceContext = createContext();

export const useMaintenance = () => {
  const context = useContext(MaintenanceContext);
  if (!context) {
    throw new Error('useMaintenance must be used within a MaintenanceProvider');
  }
  return context;
};

// Sample maintenance data
const sampleMaintenance = [
  {
    id: 1,
    equipmentId: 1,
    type: 'Routine',
    description: 'Regular service and inspection',
    scheduledDate: '2024-03-01',
    status: 'Scheduled',
    assignedTo: 'John Smith',
    cost: 500
  },
  {
    id: 2,
    equipmentId: 2,
    type: 'Repair',
    description: 'Hydraulic system maintenance',
    scheduledDate: '2024-02-25',
    status: 'In Progress',
    assignedTo: 'Mike Johnson',
    cost: 1200
  },
  {
    id: 3,
    equipmentId: 3,
    type: 'Inspection',
    description: 'Annual safety inspection',
    scheduledDate: '2024-03-15',
    status: 'Scheduled',
    assignedTo: 'Sarah Brown',
    cost: 300
  }
];

export const MaintenanceProvider = ({ children }) => {
  const [maintenance, setMaintenance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load maintenance from localStorage or initialize with sample data
    const storedMaintenance = localStorage.getItem('maintenance');
    if (storedMaintenance) {
      setMaintenance(JSON.parse(storedMaintenance));
    } else {
      setMaintenance(sampleMaintenance);
      localStorage.setItem('maintenance', JSON.stringify(sampleMaintenance));
    }
    setLoading(false);
  }, []);

  const addMaintenance = (newMaintenance) => {
    const updatedMaintenance = [...maintenance, { ...newMaintenance, id: Date.now() }];
    setMaintenance(updatedMaintenance);
    localStorage.setItem('maintenance', JSON.stringify(updatedMaintenance));
  };

  const updateMaintenance = (id, updatedData) => {
    const updatedMaintenance = maintenance.map(item =>
      item.id === id ? { ...item, ...updatedData } : item
    );
    setMaintenance(updatedMaintenance);
    localStorage.setItem('maintenance', JSON.stringify(updatedMaintenance));
  };

  const deleteMaintenance = (id) => {
    const updatedMaintenance = maintenance.filter(item => item.id !== id);
    setMaintenance(updatedMaintenance);
    localStorage.setItem('maintenance', JSON.stringify(updatedMaintenance));
  };

  return (
    <MaintenanceContext.Provider
      value={{
        maintenance,
        loading,
        addMaintenance,
        updateMaintenance,
        deleteMaintenance,
      }}
    >
      {children}
    </MaintenanceContext.Provider>
  );
}; 