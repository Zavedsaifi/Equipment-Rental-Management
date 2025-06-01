import { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FiMenu, FiX, FiHome, FiTool, FiCalendar, FiSettings, FiLogOut } from 'react-icons/fi';

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = [
    { name: 'Dashboard', path: '/dashboard', icon: FiHome },
    { name: 'Equipment', path: '/equipment', icon: FiTool },
    { name: 'Rentals', path: '/rentals', icon: FiCalendar },
    { name: 'Maintenance', path: '/maintenance', icon: FiTool },
    ...(user?.role === 'Admin' ? [{ name: 'Admin', path: '/admin', icon: FiSettings }] : []),
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Mobile sidebar backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-gray-800 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-16 items-center justify-between px-4 border-b border-gray-700">
            <h1 className="text-xl font-bold text-white">ENTNT Dashboard</h1>
            <button
              className="text-gray-400 hover:text-white lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            >
              <FiX className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <div className="space-y-1 px-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                      location.pathname === item.path
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* User Profile & Logout */}
          <div className="border-t border-gray-700 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-full bg-gray-600 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-white truncate">{user?.name}</p>
                  <p className="text-xs text-gray-400 truncate">{user?.role}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="ml-4 p-2 text-gray-400 hover:text-white rounded-md hover:bg-gray-700 transition-colors"
                title="Logout"
              >
                <FiLogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top navigation */}
        <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-gray-800 shadow">
          <button
            className="px-4 text-gray-400 hover:text-white lg:hidden"
            onClick={() => setIsSidebarOpen(true)}
          >
            <FiMenu className="h-6 w-6" />
          </button>
          <div className="flex flex-1 justify-between px-4">
            <div className="flex flex-1">
              <h2 className="text-xl font-semibold text-white my-auto">
                {navigation.find((item) => item.path === location.pathname)?.name || 'Dashboard'}
              </h2>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 bg-gray-900">
          <div className="h-full">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout; 