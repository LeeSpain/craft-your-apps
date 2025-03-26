
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, GalleryHorizontalEnd, Package, Users, DollarSign, ShoppingCart, Settings } from 'lucide-react';

const AdminDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const statCards = [
    { title: 'Total Apps', value: '12', icon: Package, color: 'bg-blue-500' },
    { title: 'Sales This Month', value: '$4,320', icon: DollarSign, color: 'bg-green-500' },
    { title: 'Active Users', value: '238', icon: Users, color: 'bg-purple-500' },
    { title: 'Pending Orders', value: '4', icon: ShoppingCart, color: 'bg-amber-500' },
  ];

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <Card key={index} className="shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                  </div>
                  <div className={`${stat.color} p-3 rounded-full text-white`}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Quick Access */}
        <h2 className="text-2xl font-bold mb-4">Quick Access</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => navigate('/admin/apps')}>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <GalleryHorizontalEnd className="h-8 w-8 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold">Manage Apps</h3>
              <p className="text-sm text-gray-500 text-center mt-2">
                Add or edit app listings for your portfolio
              </p>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <BarChart3 className="h-8 w-8 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold">Analytics</h3>
              <p className="text-sm text-gray-500 text-center mt-2">
                View business performance metrics
              </p>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <Settings className="h-8 w-8 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold">Settings</h3>
              <p className="text-sm text-gray-500 text-center mt-2">
                Configure website settings
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Recent Activity */}
        <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Recent Updates</CardTitle>
            <CardDescription>Latest changes to your portfolio</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-b pb-3">
                <div className="flex justify-between">
                  <p className="font-medium">Added new app "TaskMaster Pro"</p>
                  <p className="text-sm text-gray-500">2 days ago</p>
                </div>
                <p className="text-sm text-gray-500">Added by Admin</p>
              </div>
              <div className="border-b pb-3">
                <div className="flex justify-between">
                  <p className="font-medium">Updated pricing for "PawPal Booking Buddy"</p>
                  <p className="text-sm text-gray-500">5 days ago</p>
                </div>
                <p className="text-sm text-gray-500">Updated by Admin</p>
              </div>
              <div>
                <div className="flex justify-between">
                  <p className="font-medium">Added screenshots for "AIS Spain Homes"</p>
                  <p className="text-sm text-gray-500">1 week ago</p>
                </div>
                <p className="text-sm text-gray-500">Added by Admin</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
