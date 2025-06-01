import React, { useState, useEffect } from 'react';
import MaintenanceList from '../components/Maintenance/MaintenanceList';
import MaintenanceForm from '../components/Maintenance/MaintenanceForm';
import { useMaintenance } from '../contexts/MaintenanceContext';

const MaintenancePage = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const { successMessage, maintenanceRecords } = useMaintenance();

  useEffect(() => {
    console.log('Maintenance Records:', maintenanceRecords);
  }, [maintenanceRecords]);

  const handleAddClick = () => {
    setSelectedRecord(null);
    setShowForm(true);
  };

  const handleEditClick = (record) => {
    setSelectedRecord(record);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setSelectedRecord(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center items-start py-12">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mt-8">
        {successMessage && (
          <div className="mb-4 p-4 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-100 rounded-lg">
            {successMessage}
          </div>
        )}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Maintenance Records
          </h1>
          <button
            onClick={handleAddClick}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            Add Maintenance Record
          </button>
        </div>
        {showForm ? (
          <MaintenanceForm
            initialData={selectedRecord}
            onSuccess={handleFormSuccess}
          />
        ) : (
          <MaintenanceList onEdit={handleEditClick} />
        )}
      </div>
    </div>
  );
};

export default MaintenancePage; 