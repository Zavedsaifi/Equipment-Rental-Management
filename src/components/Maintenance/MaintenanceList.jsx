import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMaintenance } from '../../contexts/MaintenanceContext';
import { useEquipment } from '../../contexts/EquipmentContext';
import { FiPlus, FiSearch, FiFilter } from 'react-icons/fi';

const MaintenanceList = () => {
  const { maintenance, deleteMaintenance } = useMaintenance();
  const { equipment } = useEquipment();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredMaintenance = maintenance.filter(record => {
    const matchesSearch = record.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.assignedTo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getEquipmentName = (equipmentId) => {
    const equipmentItem = equipment.find(item => item.id === equipmentId);
    return equipmentItem ? equipmentItem.name : 'Unknown Equipment';
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this maintenance record?')) {
      deleteMaintenance(id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Maintenance Records</h1>
        <Link
          to="/maintenance/new"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <FiPlus className="-ml-1 mr-2 h-5 w-5" />
          New Maintenance Record
        </Link>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search maintenance records..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-md leading-5 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
        <div className="sm:w-48">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiFilter className="h-5 w-5 text-gray-400" />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-md leading-5 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="all">All Status</option>
              <option value="Scheduled">Scheduled</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Maintenance List */}
      <div className="bg-gray-800 shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-700">
          {filteredMaintenance.length === 0 ? (
            <li className="px-6 py-4 text-center text-gray-400">
              No maintenance records found
            </li>
          ) : (
            filteredMaintenance.map((record) => (
              <li key={record.id}>
                <div className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-white truncate">
                          {record.type}
                        </p>
                        <div className="ml-2 flex-shrink-0 flex">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            record.status === 'Scheduled' ? 'bg-blue-500/20 text-blue-400' :
                            record.status === 'In Progress' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-green-500/20 text-green-400'
                          }`}>
                            {record.status}
                          </span>
                        </div>
                      </div>
                      <div className="mt-2 flex flex-col sm:flex-row sm:justify-between">
                        <div className="sm:flex">
                          <p className="flex items-center text-sm text-gray-400">
                            {getEquipmentName(record.equipmentId)}
                          </p>
                          <p className="mt-2 flex items-center text-sm text-gray-400 sm:mt-0 sm:ml-6">
                            Scheduled: {new Date(record.scheduledDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-400 sm:mt-0">
                          Cost: ${record.cost}
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-gray-400">
                        Assigned to: {record.assignedTo}
                      </p>
                      {record.description && (
                        <p className="mt-2 text-sm text-gray-400">
                          {record.description}
                        </p>
                      )}
                    </div>
                    <div className="ml-4 flex-shrink-0 flex space-x-2">
                      <Link
                        to={`/maintenance/${record.id}/edit`}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(record.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default MaintenanceList; 