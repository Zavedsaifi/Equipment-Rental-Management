import { useEquipment } from '../contexts/EquipmentContext';
import { useRentals } from '../contexts/RentalsContext';
import { useMaintenance } from '../contexts/MaintenanceContext';
import KPICards from '../components/Dashboard/KPICards';
import Charts from '../components/Dashboard/Charts';
import NotificationCenter from '../components/Notifications/NotificationCenter';

const DashboardPage = () => {
  const { equipment, isLoading: equipmentLoading } = useEquipment();
  const { rentals, isLoading: rentalsLoading } = useRentals();
  const { maintenance, isLoading: maintenanceLoading } = useMaintenance();

  if (equipmentLoading || rentalsLoading || maintenanceLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white">Loading dashboard data...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-white mb-8">Dashboard</h1>
      
      {/* KPI Cards */}
      <KPICards />

      {/* Charts */}
      <Charts />
    </div>
  );
};

export default DashboardPage; 