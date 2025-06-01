import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEquipment } from '../../contexts/EquipmentContext';
import { FiSearch, FiFilter, FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';

const EquipmentList = () => {
  const { equipment, deleteEquipment } = useEquipment();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  // Filter equipment based on search and filters
  const filteredEquipment = equipment.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || item.type === filterCategory;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Get unique categories for filter
  const categories = [...new Set(equipment.map(item => item.type))];

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this equipment?')) {
      deleteEquipment(id);
    }
  };

  return (
    <div className="space-y-4">
      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search equipment..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex gap-4">
          <select
            className="px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="Available">Available</option>
            <option value="Rented">Rented</option>
            <option value="Maintenance">Maintenance</option>
          </select>

          <select
            className="px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Add Equipment Button */}
      <div className="flex justify-end">
        <Link
          to="/equipment/add"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FiPlus className="mr-2" />
          Add Equipment
        </Link>
      </div>

      {/* Equipment Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEquipment.map(item => (
          <div
            key={item.id}
            className="bg-gray-800 rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                <p className="text-gray-400">{item.type}</p>
              </div>
              <span className={`px-2 py-1 rounded text-sm ${
                item.status === 'Available' ? 'bg-green-500/20 text-green-400' :
                item.status === 'Rented' ? 'bg-blue-500/20 text-blue-400' :
                'bg-yellow-500/20 text-yellow-400'
              }`}>
                {item.status}
              </span>
            </div>

            <div className="mt-4 space-y-2">
              <p className="text-gray-300">
                <span className="text-gray-400">Condition:</span> {item.condition}
              </p>
              <p className="text-gray-300">
                <span className="text-gray-400">Location:</span> {item.location}
              </p>
              <p className="text-gray-300">
                <span className="text-gray-400">Last Maintenance:</span> {item.lastMaintenance}
              </p>
            </div>

            <div className="mt-4 flex justify-end space-x-2">
              <Link
                to={`/equipment/${item.id}`}
                className="p-2 text-blue-400 hover:text-blue-300 transition-colors"
              >
                <FiEdit2 />
              </Link>
              <button
                onClick={() => handleDelete(item.id)}
                className="p-2 text-red-400 hover:text-red-300 transition-colors"
              >
                <FiTrash2 />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* No Results Message */}
      {filteredEquipment.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-400">No equipment found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default EquipmentList; 