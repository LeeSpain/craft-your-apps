
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { BarChart, Calendar, FileText, Home, MessageSquare, CreditCard, Settings, Menu, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const DashboardSidebar = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: 'Overview', path: '/dashboard', icon: Home },
    { name: 'Timeline', path: '/dashboard/timeline', icon: Calendar },
    { name: 'Messages', path: '/dashboard/messages', icon: MessageSquare },
    { name: 'Documents', path: '/dashboard/documents', icon: FileText },
    { name: 'Payments', path: '/dashboard/payments', icon: CreditCard },
    { name: 'Analytics', path: '/dashboard/analytics', icon: BarChart },
    { name: 'Settings', path: '/dashboard/settings', icon: Settings },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed bottom-6 right-6 z-30 bg-blue-600 text-white p-3 rounded-full shadow-lg"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`bg-white border-r w-64 fixed inset-y-0 left-0 z-20 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-transform duration-200 ease-in-out lg:static lg:block`}
      >
        <div className="h-full flex flex-col">
          {/* Logo and company info */}
          <div className="p-4 border-b">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                AI
              </div>
              <div>
                <h2 className="font-bold text-gray-900">AIAppCrafter</h2>
                <p className="text-xs text-gray-500">Client Dashboard</p>
              </div>
            </div>
          </div>

          {/* Client info */}
          {user && (
            <div className="p-4 border-b bg-gray-50">
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500">{user.company}</p>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-2">
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
                        isActive
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Support link */}
          <div className="p-4 border-t">
            <a
              href="#"
              className="text-sm text-blue-600 hover:underline flex items-center"
            >
              <span>Need help? Contact us</span>
            </a>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-10 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default DashboardSidebar;
