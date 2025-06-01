import { useEquipment } from '../../contexts/EquipmentContext';
import { useRentals } from '../../contexts/RentalsContext';
import { useMaintenance } from '../../contexts/MaintenanceContext';
import { FiBox, FiCheckCircle, FiAlertCircle, FiTool } from 'react-icons/fi';

const KPICard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-gray-800 rounded-xl shadow-lg p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-400">{title}</p>
        <p className="text-2xl font-bold text-white mt-2">{value}</p>
      </div>
      <div className={`p-3 rounded-full ${color}`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
    </div>
  </div>
);

const KPICards = () => {
  const { equipment } = useEquipment();
  const { rentals } = useRentals();
  const { maintenance } = useMaintenance();

  // Calculate metrics
  const totalEquipment = equipment.length;
  const availableEquipment = equipment.filter(item => item.status === 'Available').length;
  const rentedEquipment = equipment.filter(item => item.status === 'Rented').length;

  // Calculate overdue rentals
  const today = new Date();
  const overdueRentals = rentals.filter(rental => {
    const endDate = new Date(rental.endDate);
    return endDate < today && rental.status !== 'Completed';
  }).length;

  // Calculate upcoming maintenance
  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 7);
  const upcomingMaintenance = maintenance.filter(record => {
    const scheduledDate = new Date(record.scheduledDate);
    return scheduledDate >= today && scheduledDate <= nextWeek && record.status !== 'Completed';
  }).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <KPICard
        title="Total Equipment"
        value={totalEquipment}
        icon={FiBox}
        color="bg-blue-500"
      />
      <KPICard
        title="Available Equipment"
        value={`${availableEquipment}/${rentedEquipment}`}
        icon={FiCheckCircle}
        color="bg-green-500"
      />
      <KPICard
        title="Overdue Rentals"
        value={overdueRentals}
        icon={FiAlertCircle}
        color="bg-red-500"
      />
      <KPICard
        title="Upcoming Maintenance"
        value={upcomingMaintenance}
        icon={FiTool}
        color="bg-yellow-500"
      />
    </div>
  );
};

export default KPICards; 