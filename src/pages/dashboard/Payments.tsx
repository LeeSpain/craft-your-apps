
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CreditCard, Download, Calendar, DollarSign, ArrowUpRight, CheckCircle } from 'lucide-react';

const Payments = () => {
  // Mock payment data
  const payments = [
    {
      id: 1,
      invoice: 'INV-001',
      amount: 5000,
      date: 'Feb 15, 2023',
      status: 'paid',
      description: 'Project Kickoff',
    },
    {
      id: 2,
      invoice: 'INV-002',
      amount: 7500,
      date: 'Mar 30, 2023',
      status: 'paid',
      description: 'Design Phase Completion',
    },
    {
      id: 3,
      invoice: 'INV-003',
      amount: 10000,
      date: 'May 15, 2023',
      status: 'pending',
      description: 'Development Milestone 1',
    },
    {
      id: 4,
      invoice: 'INV-004',
      amount: 10000,
      date: 'Jun 30, 2023',
      status: 'upcoming',
      description: 'Development Milestone 2',
    },
    {
      id: 5,
      invoice: 'INV-005',
      amount: 7500,
      date: 'Jul 31, 2023',
      status: 'upcoming',
      description: 'Testing & Deployment',
    },
  ];

  // Calculate total project budget and payments made
  const totalBudget = 40000;
  const paidAmount = payments.filter(p => p.status === 'paid').reduce((total, p) => total + p.amount, 0);
  const percentPaid = (paidAmount / totalBudget) * 100;

  const upcomingPayment = payments.find(p => p.status === 'pending');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Paid</span>;
      case 'pending':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Pending</span>;
      case 'upcoming':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Upcoming</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Payment Overview */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalBudget.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">Project total value</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Payments Made</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${paidAmount.toLocaleString()}</div>
            <div className="mt-2">
              <Progress value={percentPaid} className="h-2" />
              <p className="text-xs text-gray-500 mt-1">{percentPaid.toFixed(0)}% of total budget</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Payment</CardTitle>
            <Calendar className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            {upcomingPayment ? (
              <>
                <div className="text-2xl font-bold">${upcomingPayment.amount.toLocaleString()}</div>
                <p className="text-xs text-gray-500 mt-1">Due on {upcomingPayment.date}</p>
              </>
            ) : (
              <div className="text-sm text-gray-500">No upcoming payments</div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
          <CardDescription>
            View all your project payments and invoices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">{payment.invoice}</TableCell>
                    <TableCell>{payment.description}</TableCell>
                    <TableCell>{payment.date}</TableCell>
                    <TableCell>${payment.amount.toLocaleString()}</TableCell>
                    <TableCell>{getStatusBadge(payment.status)}</TableCell>
                    <TableCell className="text-right">
                      {payment.status === 'paid' && (
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Download className="h-4 w-4" />
                        </Button>
                      )}
                      {payment.status === 'pending' && (
                        <Button size="sm" className="h-8 flex items-center gap-1">
                          <CreditCard className="h-4 w-4" />
                          <span>Pay Now</span>
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Payments;
