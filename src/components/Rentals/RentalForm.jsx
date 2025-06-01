import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRentals } from '../../contexts/RentalsContext';
import { useEquipment } from '../../contexts/EquipmentContext';
import { useToast } from '../../contexts/ToastContext';
import { FiArrowLeft } from 'react-icons/fi';

const RentalForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { rentals, addRental, updateRental } = useRentals();
  const { equipment } = useEquipment();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    customerName: '',
    equipmentId: '',
    startDate: '',
    endDate: '',
    rentalFee: '',
    status: 'Active',
    notes: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id) {
      const rental = rentals.find(r => r.id === parseInt(id));
      if (rental) {
        setFormData({
          customerName: rental.customerName,
          equipmentId: rental.equipmentId,
          startDate: rental.startDate,
          endDate: rental.endDate,
          rentalFee: rental.rentalFee,
          status: rental.status,
          notes: rental.notes || ''
        });
      }
    }
  }, [id, rentals]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Customer name is required';
    }
    if (!formData.equipmentId) {
      newErrors.equipmentId = 'Equipment is required';
    }
    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }
    if (!formData.endDate) {
      newErrors.endDate = 'End date is required';
    }
    if (formData.startDate && formData.endDate && new Date(formData.startDate) > new Date(formData.endDate)) {
      newErrors.endDate = 'End date must be after start date';
    }
    if (!formData.rentalFee || formData.rentalFee <= 0) {
      newErrors.rentalFee = 'Valid rental fee is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const rentalData = {
      ...formData,
      rentalFee: parseFloat(formData.rentalFee)
    };

    try {
      if (id) {
        updateRental(parseInt(id), rentalData);
        addToast('Rental updated successfully', 'success');
      } else {
        addRental(rentalData);
        addToast('Rental created successfully', 'success');
      }
      navigate('/rentals');
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
          onClick={() => navigate('/rentals')}
          className="mr-3 sm:mr-4 text-gray-400 hover:text-white transition-colors"
        >
          <FiArrowLeft className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
        <h1 className="text-xl sm:text-2xl font-bold text-white">
          {id ? 'Edit Rental' : 'New Rental'}
        </h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div className="bg-gray-800 shadow sm:rounded-lg">
          <div className="px-3 py-4 sm:px-4 sm:py-5 lg:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Customer Name - Full Width */}
              <div className="sm:col-span-2">
                <label htmlFor="customerName" className="block text-sm font-medium text-gray-300">
                  Customer Name
                </label>
                <input
                  type="text"
                  name="customerName"
                  id="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md shadow-sm text-sm ${
                    errors.customerName
                      ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-700 focus:ring-blue-500 focus:border-blue-500'
                  } bg-gray-700 text-white`}
                />
                {errors.customerName && (
                  <p className="mt-2 text-sm text-red-400">{errors.customerName}</p>
                )}
              </div>

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

              {/* Dates */}
              <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-300">
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    id="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md shadow-sm text-sm ${
                      errors.startDate
                        ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                        : 'border-gray-700 focus:ring-blue-500 focus:border-blue-500'
                    } bg-gray-700 text-white`}
                  />
                  {errors.startDate && (
                    <p className="mt-2 text-sm text-red-400">{errors.startDate}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-300">
                    End Date
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    id="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md shadow-sm text-sm ${
                      errors.endDate
                        ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                        : 'border-gray-700 focus:ring-blue-500 focus:border-blue-500'
                    } bg-gray-700 text-white`}
                  />
                  {errors.endDate && (
                    <p className="mt-2 text-sm text-red-400">{errors.endDate}</p>
                  )}
                </div>
              </div>

              {/* Rental Fee */}
              <div>
                <label htmlFor="rentalFee" className="block text-sm font-medium text-gray-300">
                  Rental Fee ($)
                </label>
                <input
                  type="number"
                  name="rentalFee"
                  id="rentalFee"
                  value={formData.rentalFee}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  className={`mt-1 block w-full rounded-md shadow-sm text-sm ${
                    errors.rentalFee
                      ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-700 focus:ring-blue-500 focus:border-blue-500'
                  } bg-gray-700 text-white`}
                />
                {errors.rentalFee && (
                  <p className="mt-2 text-sm text-red-400">{errors.rentalFee}</p>
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
                  <option value="Active">Active</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
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
            onClick={() => navigate('/rentals')}
            className="w-full sm:w-auto px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
          >
            {id ? 'Update Rental' : 'Create Rental'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RentalForm; 