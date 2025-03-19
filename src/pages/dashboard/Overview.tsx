
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';

const Overview = () => {
  // Mock project data
  const project = {
    title: 'Mobile App Development',
    progress: 65,
    startDate: 'Jan 15, 2023',
    estimatedDelivery: 'Jun 30, 2023',
    currentPhase: 'Development',
    team: [
      { name: 'John Doe', role: 'Lead Developer' },
      { name: 'Jane Smith', role: 'UI/UX Designer' },
      { name: 'Mike Johnson', role: 'Backend Developer' },
    ],
    milestones: [
      { title: 'Project Kickoff', status: 'completed', date: 'Jan 15, 2023' },
      { title: 'Requirements Gathering', status: 'completed', date: 'Jan 30, 2023' },
      { title: 'Design Phase', status: 'completed', date: 'Mar 15, 2023' },
      { title: 'Development', status: 'in-progress', date: 'May 30, 2023' },
      { title: 'Testing', status: 'pending', date: 'Jun 15, 2023' },
      { title: 'Launch', status: 'pending', date: 'Jun 30, 2023' },
    ],
    recentActivities: [
      { action: 'New design mockups uploaded', date: 'May 10, 2023', user: 'Jane Smith' },
      { action: 'Weekly progress report shared', date: 'May 05, 2023', user: 'John Doe' },
      { action: 'Payment received for milestone 2', date: 'Apr 30, 2023', user: 'System' },
      { action: 'Feedback requested on wireframes', date: 'Apr 25, 2023', user: 'Jane Smith' },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Project Progress Overview */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>{project.title}</CardTitle>
          <CardDescription>Project Overview</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-2 flex justify-between">
            <span className="text-sm">Progress ({project.progress}%)</span>
            <span className="text-sm font-medium">{project.currentPhase} Phase</span>
          </div>
          <Progress value={project.progress} className="h-2 mb-4" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-gray-50 p-3 rounded-md">
              <h4 className="text-sm font-medium text-gray-500">Start Date</h4>
              <p className="text-lg font-medium">{project.startDate}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-md">
              <h4 className="text-sm font-medium text-gray-500">Estimated Delivery</h4>
              <p className="text-lg font-medium">{project.estimatedDelivery}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Project Milestones */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Project Milestones</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {project.milestones.map((milestone, index) => (
                <li key={index} className="flex items-start">
                  {milestone.status === 'completed' && (
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  )}
                  {milestone.status === 'in-progress' && (
                    <Clock className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0" />
                  )}
                  {milestone.status === 'pending' && (
                    <AlertCircle className="h-5 w-5 text-gray-300 mr-2 flex-shrink-0" />
                  )}
                  <div>
                    <p className="font-medium">{milestone.title}</p>
                    <p className="text-sm text-gray-500">{milestone.date}</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Team and Activities */}
        <Tabs defaultValue="team">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="activities">Recent Activities</TabsTrigger>
          </TabsList>
          <TabsContent value="team" className="mt-4 bg-white p-4 rounded-md border">
            <h3 className="font-medium mb-4">Your Development Team</h3>
            <ul className="space-y-3">
              {project.team.map((member, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-xs text-gray-500">{member.role}</p>
                  </div>
                </li>
              ))}
            </ul>
          </TabsContent>
          <TabsContent value="activities" className="mt-4 bg-white p-4 rounded-md border">
            <h3 className="font-medium mb-4">Recent Activities</h3>
            <ul className="space-y-3">
              {project.recentActivities.map((activity, index) => (
                <li key={index} className="text-sm pb-2 border-b last:border-0">
                  <p>{activity.action}</p>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>by {activity.user}</span>
                    <span>{activity.date}</span>
                  </div>
                </li>
              ))}
            </ul>
          </TabsContent>
        </Tabs>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <button className="bg-blue-50 hover:bg-blue-100 text-blue-700 p-4 rounded-md flex flex-col items-center justify-center text-sm transition">
            <Clock className="h-6 w-6 mb-1" />
            <span>View Timeline</span>
          </button>
          <button className="bg-purple-50 hover:bg-purple-100 text-purple-700 p-4 rounded-md flex flex-col items-center justify-center text-sm transition">
            <MessageSquare className="h-6 w-6 mb-1" />
            <span>Send Message</span>
          </button>
          <button className="bg-green-50 hover:bg-green-100 text-green-700 p-4 rounded-md flex flex-col items-center justify-center text-sm transition">
            <CreditCard className="h-6 w-6 mb-1" />
            <span>View Invoices</span>
          </button>
          <button className="bg-amber-50 hover:bg-amber-100 text-amber-700 p-4 rounded-md flex flex-col items-center justify-center text-sm transition">
            <FileText className="h-6 w-6 mb-1" />
            <span>View Documents</span>
          </button>
          <button className="bg-red-50 hover:bg-red-100 text-red-700 p-4 rounded-md flex flex-col items-center justify-center text-sm transition">
            <AlertCircle className="h-6 w-6 mb-1" />
            <span>Report Issue</span>
          </button>
          <button className="bg-gray-50 hover:bg-gray-100 text-gray-700 p-4 rounded-md flex flex-col items-center justify-center text-sm transition">
            <Settings className="h-6 w-6 mb-1" />
            <span>Settings</span>
          </button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Overview;
