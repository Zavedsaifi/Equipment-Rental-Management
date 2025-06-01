import { useState } from 'react';
import { useRentals } from '../../contexts/RentalsContext';

const RentalList = ({ onEdit, onDelete }) => {
  const { rentals } = useRentals();
  const [filters, setFilters] = useState({
    status: '',
    customer: '',
    equipment: ''
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const filteredRentals = rentals.filter(rental => {
    return (
      (!filters.status || rental.status === filters.status) &&
      (!filters.customer || rental.customer.toLowerCase().includes(filters.customer.toLowerCase())) &&
      (!filters.equipment || rental.equipment.toLowerCase().includes(filters.equipment.toLowerCase()))
    );
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Reserved':
        return 'bg-yellow-500';
      case 'Rented':
        return 'bg-blue-500';
      case 'Returned':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="w-full">
      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        {/* Filters */}
        <div className="p-6 border-b border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
              <select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
              >
                <option value="">All Statuses</option>
                <option value="Reserved">Reserved</option>
                <option value="Rented">Rented</option>
                <option value="Returned">Returned</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Customer</label>
              <input
                type="text"
                name="customer"
                value={filters.customer}
                onChange={handleFilterChange}
                placeholder="Filter by customer"
                className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Equipment</label>
              <input
                type="text"
                name="equipment"
                value={filters.equipment}
                onChange={handleFilterChange}
                placeholder="Filter by equipment"
                className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Equipment</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Start Date</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">End Date</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredRentals.length > 0 ? (
                filteredRentals.map((rental) => (
                  <tr key={rental.id} className="hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-white">{rental.customer}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-white">{rental.equipment}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-white">{rental.startDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-white">{rental.endDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(rental.status)}`}>
                        {rental.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => onEdit(rental)}
                          className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-500 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => onDelete(rental.id)}
                          className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-500 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-400">
                    No rentals found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RentalList; 