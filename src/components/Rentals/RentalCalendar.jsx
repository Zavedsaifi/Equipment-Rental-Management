import { useState, useEffect } from 'react';
import { useRentals } from '../../contexts/RentalsContext';

const RentalCalendar = () => {
  const { rentals } = useRentals();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [viewMode, setViewMode] = useState('month'); // 'month' or 'week'

  const daysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const firstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getRentalsForDate = (date) => {
    return rentals.filter(rental => {
      const startDate = new Date(rental.startDate);
      const endDate = new Date(rental.endDate);
      const checkDate = new Date(date);
      return checkDate >= startDate && checkDate <= endDate;
    });
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const renderCalendarHeader = () => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return (
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}
            className="p-2 rounded bg-gray-700 text-white hover:bg-gray-600"
          >
            ←
          </button>
          <h2 className="text-xl font-semibold text-white">
            {months[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <button
            onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}
            className="p-2 rounded bg-gray-700 text-white hover:bg-gray-600"
          >
            →
          </button>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setViewMode('month')}
            className={`px-3 py-1 rounded ${
              viewMode === 'month' ? 'bg-blue-600' : 'bg-gray-700'
            } text-white`}
          >
            Month
          </button>
          <button
            onClick={() => setViewMode('week')}
            className={`px-3 py-1 rounded ${
              viewMode === 'week' ? 'bg-blue-600' : 'bg-gray-700'
            } text-white`}
          >
            Week
          </button>
          <button
            onClick={() => setCurrentDate(new Date())}
            className="px-3 py-1 rounded bg-gray-700 text-white hover:bg-gray-600"
          >
            Today
          </button>
        </div>
      </div>
    );
  };

  const renderCalendarGrid = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const totalDays = daysInMonth(currentDate);
    const firstDay = firstDayOfMonth(currentDate);
    const daysArray = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      daysArray.push(<div key={`empty-${i}`} className="h-24 bg-gray-800 rounded-lg"></div>);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dateStr = formatDate(date);
      const rentalsForDay = getRentalsForDate(date);
      const isToday = formatDate(new Date()) === dateStr;
      const isSelected = selectedDate && formatDate(selectedDate) === dateStr;

      daysArray.push(
        <div
          key={day}
          onClick={() => setSelectedDate(date)}
          className={`h-24 p-2 rounded-lg cursor-pointer transition-colors
            ${isToday ? 'bg-blue-900' : 'bg-gray-800'}
            ${isSelected ? 'ring-2 ring-blue-500' : ''}
            hover:bg-gray-700`}
        >
          <div className="text-right text-sm text-gray-400">{day}</div>
          {rentalsForDay.length > 0 && (
            <div className="mt-1">
              <div className="text-xs text-blue-400">{rentalsForDay.length} rental(s)</div>
              {rentalsForDay.slice(0, 2).map(rental => (
                <div key={rental.id} className="text-xs text-gray-300 truncate">
                  {rental.customer}
                </div>
              ))}
              {rentalsForDay.length > 2 && (
                <div className="text-xs text-gray-500">+{rentalsForDay.length - 2} more</div>
              )}
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-7 gap-2">
        {days.map(day => (
          <div key={day} className="text-center text-sm font-semibold text-gray-400 py-2">
            {day}
          </div>
        ))}
        {daysArray}
      </div>
    );
  };

  const renderSelectedDateRentals = () => {
    if (!selectedDate) return null;

    const rentalsForSelectedDate = getRentalsForDate(selectedDate);

    return (
      <div className="mt-8 bg-gray-800 rounded-lg p-4">
        <h3 className="text-xl font-semibold text-white mb-4">
          Rentals for {selectedDate.toLocaleDateString()}
        </h3>
        {rentalsForSelectedDate.length === 0 ? (
          <p className="text-gray-400">No rentals scheduled for this date.</p>
        ) : (
          <div className="space-y-4">
            {rentalsForSelectedDate.map(rental => (
              <div key={rental.id} className="bg-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-lg font-medium text-white">{rental.customer}</h4>
                    <p className="text-gray-300">{rental.equipment}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">
                      {new Date(rental.startDate).toLocaleDateString()} - {new Date(rental.endDate).toLocaleDateString()}
                    </p>
                    <span className={`inline-block px-2 py-1 rounded text-xs ${
                      rental.status === 'Rented' ? 'bg-green-600' : 'bg-yellow-600'
                    } text-white`}>
                      {rental.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto">
      {renderCalendarHeader()}
      {renderCalendarGrid()}
      {renderSelectedDateRentals()}
    </div>
  );
};

export default RentalCalendar; 