import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useEquipment } from '../../contexts/EquipmentContext';
import { useRentals } from '../../contexts/RentalsContext';
import { useMaintenance } from '../../contexts/MaintenanceContext';
import { FiEdit2, FiTrash2, FiArrowLeft } from 'react-icons/fi';
import MaintenanceList from '../Maintenance/MaintenanceList';
import MaintenanceForm from '../Maintenance/MaintenanceForm';

const EquipmentDetail = () => {
  const { id } = useParams();
  const { equipment, addRentalRecord, deleteEquipment } = useEquipment();
  const { rentals } = useRentals();
  const { maintenance } = useMaintenance();
  const [activeTab, setActiveTab] = useState('details');
  const [showRentalForm, setShowRentalForm] = useState(false);
  const [rentalData, setRentalData] = useState({
    customerName: '',
    startDate: '',
    endDate: '',
    rentalFee: ''
  });
  const [showMaintenanceForm, setShowMaintenanceForm] = useState(false);

  const equipmentItem = equipment.find(item => item.id === parseInt(id));

  useEffect(() => {
    if (!equipmentItem) {
      // Handle equipment not found
      return;
    }
  }, [equipmentItem]);

  if (!equipmentItem) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400">Equipment not found</p>
        <Link to="/equipment" className="text-blue-400 hover:text-blue-300 mt-4 inline-block">
          Back to Equipment List
        </Link>
      </div>
    );
  }

  const equipmentRentals = rentals.filter(rental => rental.equipmentId === parseInt(id));
  const equipmentMaintenance = maintenance.filter(maintenance => maintenance.equipmentId === parseInt(id));

  const handleRentalSubmit = (e) => {
    e.preventDefault();
    addRentalRecord(equipmentItem.id, rentalData);
    setShowRentalForm(false);
    setRentalData({
      customerName: '',
      startDate: '',
      endDate: '',
      rentalFee: ''
    });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this equipment?')) {
      deleteEquipment(parseInt(id));
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <Link
            to="/equipment"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FiArrowLeft className="h-6 w-6" />
          </Link>
          <h2 className="text-2xl font-bold text-white">{equipmentItem.name}</h2>
        </div>
        <div className="flex space-x-2">
          <Link
            to={`/equipment/${id}/edit`}
            className="p-2 text-blue-400 hover:text-blue-300 transition-colors"
          >
            <FiEdit2 />
          </Link>
          <button
            onClick={handleDelete}
            className="p-2 text-red-400 hover:text-red-300 transition-colors"
          >
            <FiTrash2 />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-700 mb-6">
        <nav className="flex space-x-8">
          <button
            className={`pb-4 px-1 ${
              activeTab === 'details'
                ? 'border-b-2 border-blue-500 text-blue-400'
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('details')}
          >
            Details
          </button>
          <button
            className={`pb-4 px-1 ${
              activeTab === 'rentals'
                ? 'border-b-2 border-blue-500 text-blue-400'
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('rentals')}
          >
            Rental History
          </button>
          <button
            className={`pb-4 px-1 ${
              activeTab === 'maintenance'
                ? 'border-b-2 border-blue-500 text-blue-400'
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('maintenance')}
          >
            Maintenance Records
          </button>
        </nav>
      </div>

      {/* Content */}
      <div className="bg-gray-800 rounded-lg p-6">
        {activeTab === 'details' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Equipment Information</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-400">Type</p>
                  <p className="text-white">{equipmentItem.type}</p>
                </div>
                <div>
                  <p className="text-gray-400">Status</p>
                  <p className={`inline-block px-2 py-1 rounded text-sm ${
                    equipmentItem.status === 'Available' ? 'bg-green-500/20 text-green-400' :
                    equipmentItem.status === 'Rented' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {equipmentItem.status}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400">Condition</p>
                  <p className="text-white">{equipmentItem.condition}</p>
                </div>
                <div>
                  <p className="text-gray-400">Location</p>
                  <p className="text-white">{equipmentItem.location}</p>
                </div>
                <div>
                  <p className="text-gray-400">Last Maintenance</p>
                  <p className="text-white">{equipmentItem.lastMaintenance}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'rentals' && (
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Rental History</h3>
            {equipmentRentals.length === 0 ? (
              <p className="text-gray-400">No rental history available</p>
            ) : (
              <div className="space-y-4">
                {equipmentRentals.map(rental => (
                  <div
                    key={rental.id}
                    className="bg-gray-700 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-white font-medium">{rental.customerName}</p>
                        <p className="text-gray-400 text-sm">
                          {new Date(rental.startDate).toLocaleDateString()} - {new Date(rental.endDate).toLocaleDateString()}
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded text-sm ${
                        rental.status === 'Active' ? 'bg-blue-500/20 text-blue-400' :
                        rental.status === 'Completed' ? 'bg-green-500/20 text-green-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {rental.status}
                      </span>
                    </div>
                    {rental.notes && (
                      <p className="text-gray-300 mt-2 text-sm">{rental.notes}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'maintenance' && (
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Maintenance Records</h3>
            {equipmentMaintenance.length === 0 ? (
              <p className="text-gray-400">No maintenance records available</p>
            ) : (
              <div className="space-y-4">
                {equipmentMaintenance.map(record => (
                  <div
                    key={record.id}
                    className="bg-gray-700 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-white font-medium">{record.type}</p>
                        <p className="text-gray-400 text-sm">
                          Scheduled: {new Date(record.scheduledDate).toLocaleDateString()}
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded text-sm ${
                        record.status === 'Scheduled' ? 'bg-blue-500/20 text-blue-400' :
                        record.status === 'In Progress' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-green-500/20 text-green-400'
                      }`}>
                        {record.status}
                      </span>
                    </div>
                    <p className="text-gray-300 mt-2">{record.description}</p>
                    <div className="mt-2 text-sm text-gray-400">
                      <p>Assigned to: {record.assignedTo}</p>
                      <p>Cost: ${record.cost}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EquipmentDetail; 