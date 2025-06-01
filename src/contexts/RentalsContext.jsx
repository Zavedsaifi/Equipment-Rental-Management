import { createContext, useContext, useState, useEffect } from 'react';

const RentalsContext = createContext();

export const useRentals = () => {
  const context = useContext(RentalsContext);
  if (!context) {
    throw new Error('useRentals must be used within a RentalsProvider');
  }
  return context;
};

// Sample rentals data
const sampleRentals = [
  {
    id: 1,
    equipmentId: 2,
    customerName: 'John Smith',
    startDate: '2024-02-01',
    endDate: '2024-02-15',
    status: 'Active',
    rentalFee: 1500,
    notes: 'Site A construction project'
  },
  {
    id: 2,
    equipmentId: 4,
    customerName: 'Sarah Johnson',
    startDate: '2024-02-05',
    endDate: '2024-02-20',
    status: 'Active',
    rentalFee: 800,
    notes: 'Site B renovation'
  },
  {
    id: 3,
    equipmentId: 2,
    customerName: 'Mike Brown',
    startDate: '2024-01-15',
    endDate: '2024-01-30',
    status: 'Completed',
    rentalFee: 1500,
    notes: 'Completed successfully'
  }
];

export const RentalsProvider = ({ children }) => {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load rentals from localStorage or initialize with sample data
    const storedRentals = localStorage.getItem('rentals');
    if (storedRentals) {
      setRentals(JSON.parse(storedRentals));
    } else {
      setRentals(sampleRentals);
      localStorage.setItem('rentals', JSON.stringify(sampleRentals));
    }
    setLoading(false);
  }, []);

  const addRental = (newRental) => {
    const updatedRentals = [...rentals, { ...newRental, id: Date.now() }];
    setRentals(updatedRentals);
    localStorage.setItem('rentals', JSON.stringify(updatedRentals));
  };

  const updateRental = (id, updatedData) => {
    const updatedRentals = rentals.map(rental =>
      rental.id === id ? { ...rental, ...updatedData } : rental
    );
    setRentals(updatedRentals);
    localStorage.setItem('rentals', JSON.stringify(updatedRentals));
  };

  const deleteRental = (id) => {
    const updatedRentals = rentals.filter(rental => rental.id !== id);
    setRentals(updatedRentals);
    localStorage.setItem('rentals', JSON.stringify(updatedRentals));
  };

  return (
    <RentalsContext.Provider
      value={{
        rentals,
        loading,
        addRental,
        updateRental,
        deleteRental,
      }}
    >
      {children}
    </RentalsContext.Provider>
  );
}; 