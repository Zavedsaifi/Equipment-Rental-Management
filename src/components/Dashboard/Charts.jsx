import { useEquipment } from '../../contexts/EquipmentContext';
import { useRentals } from '../../contexts/RentalsContext';

const ChartCard = ({ title, children }) => (
  <div className="bg-gray-800 rounded-xl shadow-lg p-6">
    <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
    <div className="min-h-[300px]">{children}</div>
  </div>
);

const PieChart = ({ data }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = 0;

  return (
    <div className="relative w-full h-[300px]">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {data.map((item, index) => {
          const percentage = (item.value / total) * 100;
          const angle = (percentage / 100) * 360;
          const startAngle = currentAngle;
          currentAngle += angle;

          // Calculate path
          const startRad = (startAngle - 90) * (Math.PI / 180);
          const endRad = (currentAngle - 90) * (Math.PI / 180);
          const x1 = 50 + 40 * Math.cos(startRad);
          const y1 = 50 + 40 * Math.sin(startRad);
          const x2 = 50 + 40 * Math.cos(endRad);
          const y2 = 50 + 40 * Math.sin(endRad);
          const largeArcFlag = angle > 180 ? 1 : 0;

          return (
            <g key={index}>
              <path
                d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                fill={item.color}
                stroke="white"
                strokeWidth="0.5"
              />
              <text
                x={50 + 30 * Math.cos((startAngle + angle / 2 - 90) * (Math.PI / 180))}
                y={50 + 30 * Math.sin((startAngle + angle / 2 - 90) * (Math.PI / 180))}
                fill="white"
                fontSize="3"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {item.label}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <p className="text-2xl font-bold text-white">{total}</p>
        <p className="text-sm text-gray-400">Total</p>
      </div>
    </div>
  );
};

const BarChart = ({ data }) => {
  const maxValue = Math.max(...data.map(item => item.value));
  const barHeight = 200; // Maximum height for bars

  return (
    <div className="h-[300px] flex items-end space-x-2">
      {data.map((item, index) => (
        <div key={index} className="flex-1 flex flex-col items-center">
          <div
            className="w-full bg-blue-500 rounded-t"
            style={{
              height: `${(item.value / maxValue) * barHeight}px`,
              minHeight: '4px'
            }}
          />
          <div className="mt-2 text-center">
            <p className="text-sm text-gray-400">{item.label}</p>
            <p className="text-sm font-medium text-white">{item.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const Charts = () => {
  const { equipment } = useEquipment();
  const { rentals } = useRentals();

  // Equipment usage data
  const equipmentUsage = [
    {
      label: 'Available',
      value: equipment.filter(item => item.status === 'Available').length,
      color: '#10B981' // green-500
    },
    {
      label: 'Rented',
      value: equipment.filter(item => item.status === 'Rented').length,
      color: '#3B82F6' // blue-500
    },
    {
      label: 'Maintenance',
      value: equipment.filter(item => item.status === 'Maintenance').length,
      color: '#F59E0B' // yellow-500
    }
  ];

  // Rental trends data (last 6 months)
  const getLastSixMonths = () => {
    const months = [];
    const today = new Date();
    for (let i = 5; i >= 0; i--) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      months.push(date.toLocaleString('default', { month: 'short' }));
    }
    return months;
  };

  const rentalTrends = getLastSixMonths().map(month => {
    const monthStart = new Date(month + ' 1, ' + new Date().getFullYear());
    const monthEnd = new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 0);
    
    const rentalsInMonth = rentals.filter(rental => {
      const startDate = new Date(rental.startDate);
      return startDate >= monthStart && startDate <= monthEnd;
    }).length;

    return {
      label: month,
      value: rentalsInMonth
    };
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      <ChartCard title="Equipment Usage Distribution">
        <PieChart data={equipmentUsage} />
      </ChartCard>
      <ChartCard title="Rental Trends (Last 6 Months)">
        <BarChart data={rentalTrends} />
      </ChartCard>
    </div>
  );
};

export default Charts; 