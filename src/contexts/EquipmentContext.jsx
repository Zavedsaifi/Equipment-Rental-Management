import { createContext, useContext, useState, useEffect } from 'react';

const EquipmentContext = createContext();

export const useEquipment = () => {
  const context = useContext(EquipmentContext);
  if (!context) {
    throw new Error('useEquipment must be used within an EquipmentProvider');
  }
  return context;
};

// Sample equipment data
const sampleEquipment = [
  {
    id: 1,
    name: 'Excavator CAT 320',
    type: 'Heavy Equipment',
    status: 'Available',
    condition: 'Good',
    lastMaintenance: '2024-02-15',
    location: 'Main Yard'
  },
  {
    id: 2,
    name: 'Bulldozer Komatsu D65',
    type: 'Heavy Equipment',
    status: 'Rented',
    condition: 'Good',
    lastMaintenance: '2024-02-10',
    location: 'Site A'
  },
  {
    id: 3,
    name: 'Crane Liebherr LTM 1100',
    type: 'Heavy Equipment',
    status: 'Available',
    condition: 'Excellent',
    lastMaintenance: '2024-02-20',
    location: 'Main Yard'
  },
  {
    id: 4,
    name: 'Concrete Mixer',
    type: 'Construction Equipment',
    status: 'Rented',
    condition: 'Good',
    lastMaintenance: '2024-02-05',
    location: 'Site B'
  },
  {
    id: 5,
    name: 'Scaffolding Set',
    type: 'Safety Equipment',
    status: 'Available',
    condition: 'Good',
    lastMaintenance: '2024-02-18',
    location: 'Warehouse'
  }
];

export const EquipmentProvider = ({ children }) => {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load equipment from localStorage or initialize with sample data
    const storedEquipment = localStorage.getItem('equipment');
    if (storedEquipment) {
      setEquipment(JSON.parse(storedEquipment));
    } else {
      setEquipment(sampleEquipment);
      localStorage.setItem('equipment', JSON.stringify(sampleEquipment));
    }
    setLoading(false);
  }, []);

  const addEquipment = (newEquipment) => {
    const updatedEquipment = [...equipment, { ...newEquipment, id: Date.now() }];
    setEquipment(updatedEquipment);
    localStorage.setItem('equipment', JSON.stringify(updatedEquipment));
  };

  const updateEquipment = (id, updatedData) => {
    const updatedEquipment = equipment.map(item =>
      item.id === id ? { ...item, ...updatedData } : item
    );
    setEquipment(updatedEquipment);
    localStorage.setItem('equipment', JSON.stringify(updatedEquipment));
  };

  const deleteEquipment = (id) => {
    const updatedEquipment = equipment.filter(item => item.id !== id);
    setEquipment(updatedEquipment);
    localStorage.setItem('equipment', JSON.stringify(updatedEquipment));
  };

  const addRentalRecord = (equipmentId, rentalData) => {
    const updatedEquipment = equipment.map(item => {
      if (item.id === equipmentId) {
        return {
          ...item,
          status: "Rented",
          rentalHistory: [...item.rentalHistory, { ...rentalData, id: Date.now() }]
        };
      }
      return item;
    });
    setEquipment(updatedEquipment);
    localStorage.setItem('equipment', JSON.stringify(updatedEquipment));
  };

  return (
    <EquipmentContext.Provider
      value={{
        equipment,
        loading,
        addEquipment,
        updateEquipment,
        deleteEquipment,
        addRentalRecord
      }}
    >
      {children}
    </EquipmentContext.Provider>
  );
}; 