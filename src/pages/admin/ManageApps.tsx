
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import AppForm from '@/components/admin/AppForm';

// Mock data for apps
const mockApps = [
  { 
    id: '1', 
    title: 'Move Sync', 
    category: 'Bespoke',
    description: 'Integrated fitness tracking, class bookings, and community features designed for fitness studios and users.',
    imageUrl: '/lovable-uploads/f0f14872-32ce-4b9a-b082-9988b20792de.png',
    liveUrl: 'https://www.move-sync.com/',
    price: '$4,250',
  },
  { 
    id: '2', 
    title: 'PawPal Booking Buddy', 
    category: 'Bespoke',
    description: 'Pet service booking, scheduling, and management platform for grooming and pet care businesses.',
    imageUrl: '/lovable-uploads/558eb31c-5a2b-476c-985c-45325a1ffb30.png',
    liveUrl: 'https://pawpal-booking-buddy.vercel.app/',
    price: '$3,800',
  },
  { 
    id: '3', 
    title: 'AIS Pain Homes', 
    category: 'Bespoke',
    description: 'Real estate listing, property management, and client portal for the Spanish real estate market.',
    imageUrl: '/lovable-uploads/132059dc-2448-4d15-874e-0305ce7e4f9f.png',
    liveUrl: 'https://aispainhomes.vercel.app/',
    price: '$5,200',
  },
];

const ManageApps = () => {
  const [apps, setApps] = useState(mockApps);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentApp, setCurrentApp] = useState<any>(null);

  const handleAddNew = () => {
    setCurrentApp(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (app: any) => {
    setCurrentApp(app);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this app?')) {
      setApps(apps.filter(app => app.id !== id));
    }
  };

  const handleSaveApp = (appData: any) => {
    if (currentApp) {
      // Edit existing app
      setApps(apps.map(app => app.id === currentApp.id ? { ...appData, id: currentApp.id } : app));
    } else {
      // Add new app
      setApps([...apps, { ...appData, id: String(Date.now()) }]);
    }
    setIsDialogOpen(false);
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Manage Apps</h1>
          <Button onClick={handleAddNew} className="bg-indigo-600">
            <Plus className="h-4 w-4 mr-2" /> Add New App
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>App Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Live URL</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {apps.map((app) => (
                <TableRow key={app.id}>
                  <TableCell>
                    <img 
                      src={app.imageUrl} 
                      alt={app.title} 
                      className="h-12 w-20 object-cover rounded"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{app.title}</TableCell>
                  <TableCell>{app.category}</TableCell>
                  <TableCell>{app.price}</TableCell>
                  <TableCell>
                    <a href={app.liveUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      View Site
                    </a>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(app)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(app.id)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{currentApp ? 'Edit App' : 'Add New App'}</DialogTitle>
            <DialogDescription>
              Fill in the details for your app. These details will be displayed in your portfolio.
            </DialogDescription>
          </DialogHeader>
          <AppForm 
            initialData={currentApp} 
            onSubmit={handleSaveApp} 
            onCancel={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default ManageApps;
