import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEquipment } from '../../contexts/EquipmentContext';
import { useToast } from '../../contexts/ToastContext';

const EquipmentForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { equipment, addEquipment, updateEquipment } = useEquipment();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    type: '',
    status: 'Available',
    condition: 'Good',
    location: '',
    lastMaintenance: new Date().toISOString().split('T')[0]
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id) {
      const equipmentItem = equipment.find(item => item.id === parseInt(id));
      if (equipmentItem) {
        setFormData(equipmentItem);
      }
    }
  }, [id, equipment]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.type.trim()) {
      newErrors.type = 'Type is required';
    }
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (id) {
        updateEquipment(parseInt(id), formData);
        addToast({
          type: 'success',
          message: 'Equipment updated successfully'
        });
      } else {
        addEquipment(formData);
        addToast({
          type: 'success',
          message: 'Equipment added successfully'
        });
      }
      navigate('/equipment');
    } catch (error) {
      addToast({
        type: 'error',
        message: 'Failed to save equipment'
      });
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
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">
        {id ? 'Edit Equipment' : 'Add New Equipment'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div className="bg-gray-800 shadow sm:rounded-lg">
          <div className="px-3 py-4 sm:px-4 sm:py-5 lg:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Name - Full Width */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg bg-gray-800 text-white border ${
                    errors.name ? 'border-red-500' : 'border-gray-700'
                  } focus:outline-none focus:border-blue-500`}
                  placeholder="Enter equipment name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              {/* Type - Full Width */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Type
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg bg-gray-800 text-white border ${
                    errors.type ? 'border-red-500' : 'border-gray-700'
                  } focus:outline-none focus:border-blue-500`}
                >
                  <option value="">Select type</option>
                  <option value="Heavy Equipment">Heavy Equipment</option>
                  <option value="Construction Equipment">Construction Equipment</option>
                  <option value="Safety Equipment">Safety Equipment</option>
                  <option value="Tools">Tools</option>
                </select>
                {errors.type && (
                  <p className="mt-1 text-sm text-red-500">{errors.type}</p>
                )}
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
                >
                  <option value="Available">Available</option>
                  <option value="Rented">Rented</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
              </div>

              {/* Condition */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Condition
                </label>
                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
                >
                  <option value="Excellent">Excellent</option>
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                  <option value="Poor">Poor</option>
                </select>
              </div>

              {/* Location - Full Width */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg bg-gray-800 text-white border ${
                    errors.location ? 'border-red-500' : 'border-gray-700'
                  } focus:outline-none focus:border-blue-500`}
                  placeholder="Enter equipment location"
                />
                {errors.location && (
                  <p className="mt-1 text-sm text-red-500">{errors.location}</p>
                )}
              </div>

              {/* Last Maintenance Date */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Last Maintenance Date
                </label>
                <input
                  type="date"
                  name="lastMaintenance"
                  value={formData.lastMaintenance}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
          <button
            type="button"
            onClick={() => navigate('/equipment')}
            className="w-full sm:w-auto px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
          >
            {id ? 'Update Equipment' : 'Add Equipment'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EquipmentForm; 