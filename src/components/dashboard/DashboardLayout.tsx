
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import DashboardSidebar from './DashboardSidebar';
import DashboardHeader from './DashboardHeader';

const DashboardLayout: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        <DashboardHeader />
        <main className="flex-1 p-4 lg:p-8">
          <Outlet />
        </main>
        <footer className="border-t px-4 py-3 bg-white text-sm text-gray-500">
          <div className="flex justify-between items-center max-w-7xl mx-auto">
            <p>© {new Date().getFullYear()} AIAppCrafter</p>
            <p>Dashboard v1.0</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default DashboardLayout;
