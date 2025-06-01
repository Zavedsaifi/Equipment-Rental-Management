import { useState } from 'react';
import { RentalsProvider, useRentals } from '../contexts/RentalsContext';
import { NotificationProvider } from '../contexts/NotificationContext';
import RentalList from '../components/Rentals/RentalList';
import RentalForm from '../components/Rentals/RentalForm';
import RentalCalendar from '../components/Rentals/RentalCalendar';
import NotificationCenter from '../components/Notifications/NotificationCenter';

const RentalsPageContent = () => {
  const [view, setView] = useState('list');
  const [selectedRental, setSelectedRental] = useState(null);
  const { deleteRental } = useRentals();

  const handleEdit = (rental) => {
    setSelectedRental(rental);
    setView('form');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this rental?')) {
      deleteRental(id);
    }
  };

  const handleFormSubmit = () => {
    setSelectedRental(null);
    setView('list');
  };

  const handleCancel = () => {
    setSelectedRental(null);
    setView('list');
  };

  return (
    <div className="min-h-screen w-screen bg-gray-900">
      <div className="w-full px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Rental Orders</h1>
          <div className="flex items-center space-x-4">
            <NotificationCenter />
            <button
              onClick={() => setView('list')}
              className={`px-4 py-2 rounded ${
                view === 'list'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              List View
            </button>
            <button
              onClick={() => setView('calendar')}
              className={`px-4 py-2 rounded ${
                view === 'calendar'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Calendar View
            </button>
            <button
              onClick={() => {
                setSelectedRental(null);
                setView('form');
              }}
              className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-500"
            >
              New Rental
            </button>
          </div>
        </div>

        {view === 'list' && (
          <RentalList onEdit={handleEdit} onDelete={handleDelete} />
        )}
        {view === 'form' && (
          <RentalForm
            rental={selectedRental}
            onSubmit={handleFormSubmit}
            onCancel={handleCancel}
          />
        )}
        {view === 'calendar' && <RentalCalendar />}
      </div>
    </div>
  );
};

const RentalsPage = () => {
  return (
    <NotificationProvider>
      <RentalsProvider>
        <RentalsPageContent />
      </RentalsProvider>
    </NotificationProvider>
  );
};

export default RentalsPage; 