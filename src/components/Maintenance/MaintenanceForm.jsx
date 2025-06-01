import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMaintenance } from '../../contexts/MaintenanceContext';
import { useEquipment } from '../../contexts/EquipmentContext';
import { useToast } from '../../contexts/ToastContext';
import { FiArrowLeft } from 'react-icons/fi';

const MaintenanceForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { maintenance, addMaintenance, updateMaintenance } = useMaintenance();
  const { equipment } = useEquipment();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    equipmentId: '',
    type: '',
    description: '',
    scheduledDate: '',
    status: 'Scheduled',
    assignedTo: '',
    cost: '',
    notes: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id) {
      const record = maintenance.find(m => m.id === parseInt(id));
      if (record) {
        setFormData({
          equipmentId: record.equipmentId,
          type: record.type,
          description: record.description || '',
          scheduledDate: record.scheduledDate,
          status: record.status,
          assignedTo: record.assignedTo,
          cost: record.cost,
          notes: record.notes || ''
        });
      }
    }
  }, [id, maintenance]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.equipmentId) {
      newErrors.equipmentId = 'Equipment is required';
    }
    if (!formData.type.trim()) {
      newErrors.type = 'Maintenance type is required';
    }
    if (!formData.scheduledDate) {
      newErrors.scheduledDate = 'Scheduled date is required';
    }
    if (!formData.assignedTo.trim()) {
      newErrors.assignedTo = 'Assigned person is required';
    }
    if (!formData.cost || formData.cost <= 0) {
      newErrors.cost = 'Valid cost is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const maintenanceData = {
      ...formData,
      cost: parseFloat(formData.cost)
    };

    try {
      if (id) {
        updateMaintenance(parseInt(id), maintenanceData);
        addToast('Maintenance record updated successfully', 'success');
      } else {
        addMaintenance(maintenanceData);
        addToast('Maintenance record created successfully', 'success');
      }
      navigate('/maintenance');
    } catch (error) {
      addToast(error.message || 'An error occurred', 'error');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      {/* Header */}
      <div className="flex items-center mb-4 sm:mb-6">
        <button
          onClick={() => navigate('/maintenance')}
          className="mr-3 sm:mr-4 text-gray-400 hover:text-white transition-colors"
        >
          <FiArrowLeft className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
        <h1 className="text-xl sm:text-2xl font-bold text-white">
          {id ? 'Edit Maintenance Record' : 'New Maintenance Record'}
        </h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div className="bg-gray-800 shadow sm:rounded-lg">
          <div className="px-3 py-4 sm:px-4 sm:py-5 lg:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Equipment - Full Width */}
              <div className="sm:col-span-2">
                <label htmlFor="equipmentId" className="block text-sm font-medium text-gray-300">
                  Equipment
                </label>
                <select
                  name="equipmentId"
                  id="equipmentId"
                  value={formData.equipmentId}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md shadow-sm text-sm ${
                    errors.equipmentId
                      ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-700 focus:ring-blue-500 focus:border-blue-500'
                  } bg-gray-700 text-white`}
                >
                  <option value="">Select Equipment</option>
                  {equipment.map(item => (
                    <option key={item.id} value={item.id}>
                      {item.name} ({item.status})
                    </option>
                  ))}
                </select>
                {errors.equipmentId && (
                  <p className="mt-2 text-sm text-red-400">{errors.equipmentId}</p>
                )}
              </div>

              {/* Maintenance Type - Full Width */}
              <div className="sm:col-span-2">
                <label htmlFor="type" className="block text-sm font-medium text-gray-300">
                  Maintenance Type
                </label>
                <input
                  type="text"
                  name="type"
                  id="type"
                  value={formData.type}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md shadow-sm text-sm ${
                    errors.type
                      ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-700 focus:ring-blue-500 focus:border-blue-500'
                  } bg-gray-700 text-white`}
                />
                {errors.type && (
                  <p className="mt-2 text-sm text-red-400">{errors.type}</p>
                )}
              </div>

              {/* Description - Full Width */}
              <div className="sm:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-300">
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md shadow-sm text-sm border-gray-700 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
                />
              </div>

              {/* Scheduled Date */}
              <div>
                <label htmlFor="scheduledDate" className="block text-sm font-medium text-gray-300">
                  Scheduled Date
                </label>
                <input
                  type="date"
                  name="scheduledDate"
                  id="scheduledDate"
                  value={formData.scheduledDate}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md shadow-sm text-sm ${
                    errors.scheduledDate
                      ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-700 focus:ring-blue-500 focus:border-blue-500'
                  } bg-gray-700 text-white`}
                />
                {errors.scheduledDate && (
                  <p className="mt-2 text-sm text-red-400">{errors.scheduledDate}</p>
                )}
              </div>

              {/* Status */}
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-300">
                  Status
                </label>
                <select
                  name="status"
                  id="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md shadow-sm text-sm border-gray-700 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
                >
                  <option value="Scheduled">Scheduled</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              {/* Assigned To */}
              <div>
                <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-300">
                  Assigned To
                </label>
                <input
                  type="text"
                  name="assignedTo"
                  id="assignedTo"
                  value={formData.assignedTo}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md shadow-sm text-sm ${
                    errors.assignedTo
                      ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-700 focus:ring-blue-500 focus:border-blue-500'
                  } bg-gray-700 text-white`}
                />
                {errors.assignedTo && (
                  <p className="mt-2 text-sm text-red-400">{errors.assignedTo}</p>
                )}
              </div>

              {/* Cost */}
              <div>
                <label htmlFor="cost" className="block text-sm font-medium text-gray-300">
                  Cost ($)
                </label>
                <input
                  type="number"
                  name="cost"
                  id="cost"
                  value={formData.cost}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  className={`mt-1 block w-full rounded-md shadow-sm text-sm ${
                    errors.cost
                      ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-700 focus:ring-blue-500 focus:border-blue-500'
                  } bg-gray-700 text-white`}
                />
                {errors.cost && (
                  <p className="mt-2 text-sm text-red-400">{errors.cost}</p>
                )}
              </div>

              {/* Notes - Full Width */}
              <div className="sm:col-span-2">
                <label htmlFor="notes" className="block text-sm font-medium text-gray-300">
                  Notes
                </label>
                <textarea
                  name="notes"
                  id="notes"
                  rows={3}
                  value={formData.notes}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md shadow-sm text-sm border-gray-700 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
          <button
            type="button"
            onClick={() => navigate('/maintenance')}
            className="w-full sm:w-auto px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
          >
            {id ? 'Update Maintenance Record' : 'Create Maintenance Record'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MaintenanceForm; 