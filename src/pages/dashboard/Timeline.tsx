
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

const Timeline = () => {
  // Mock timeline data
  const timelineData = [
    {
      phase: 'Discovery',
      startDate: 'Jan 15, 2023',
      endDate: 'Jan 30, 2023',
      status: 'completed',
      tasks: [
        { name: 'Initial consultation', status: 'completed', date: 'Jan 15, 2023' },
        { name: 'Requirements gathering', status: 'completed', date: 'Jan 20, 2023' },
        { name: 'Project scope definition', status: 'completed', date: 'Jan 30, 2023' },
      ],
    },
    {
      phase: 'Design',
      startDate: 'Feb 1, 2023',
      endDate: 'Mar 15, 2023',
      status: 'completed',
      tasks: [
        { name: 'Wireframing', status: 'completed', date: 'Feb 15, 2023' },
        { name: 'UI design mockups', status: 'completed', date: 'Mar 1, 2023' },
        { name: 'Design approval', status: 'completed', date: 'Mar 15, 2023' },
      ],
    },
    {
      phase: 'Development',
      startDate: 'Mar 16, 2023',
      endDate: 'May 30, 2023',
      status: 'in-progress',
      tasks: [
        { name: 'Frontend development', status: 'in-progress', date: 'Apr 20, 2023' },
        { name: 'Backend API development', status: 'in-progress', date: 'May 15, 2023' },
        { name: 'Integration', status: 'pending', date: 'May 30, 2023' },
      ],
    },
    {
      phase: 'Testing',
      startDate: 'Jun 1, 2023',
      endDate: 'Jun 15, 2023',
      status: 'pending',
      tasks: [
        { name: 'Quality assurance', status: 'pending', date: 'Jun 1, 2023' },
        { name: 'User acceptance testing', status: 'pending', date: 'Jun 10, 2023' },
        { name: 'Bug fixes', status: 'pending', date: 'Jun 15, 2023' },
      ],
    },
    {
      phase: 'Deployment',
      startDate: 'Jun 16, 2023',
      endDate: 'Jun 30, 2023',
      status: 'pending',
      tasks: [
        { name: 'Final review', status: 'pending', date: 'Jun 16, 2023' },
        { name: 'App store submission', status: 'pending', date: 'Jun 20, 2023' },
        { name: 'Launch', status: 'pending', date: 'Jun 30, 2023' },
      ],
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in-progress':
        return <Clock className="h-5 w-5 text-amber-500" />;
      case 'pending':
        return <AlertCircle className="h-5 w-5 text-gray-300" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in-progress':
        return 'In Progress';
      case 'pending':
        return 'Pending';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Project Timeline</CardTitle>
          <CardDescription>
            Track your project phases and milestones
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Status</TableHead>
                  <TableHead>Phase</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead className="text-right">Duration</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {timelineData.map((phase, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(phase.status)}
                        <span className="text-sm">{getStatusText(phase.status)}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{phase.phase}</TableCell>
                    <TableCell>{phase.startDate}</TableCell>
                    <TableCell>{phase.endDate}</TableCell>
                    <TableCell className="text-right">
                      {/* Calculate duration in days or weeks */}
                      {Math.floor(
                        (new Date(phase.endDate).getTime() - new Date(phase.startDate).getTime()) /
                          (1000 * 60 * 60 * 24)
                      )}{' '}
                      days
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Detailed task breakdown */}
      <div className="grid gap-6">
        {timelineData.map((phase, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{phase.phase} Phase</CardTitle>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(phase.status)}
                  <span className="text-sm font-normal">
                    {getStatusText(phase.status)}
                  </span>
                </div>
              </div>
              <CardDescription>
                {phase.startDate} to {phase.endDate}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {phase.tasks.map((task, taskIndex) => (
                  <li key={taskIndex} className="flex items-start space-x-3">
                    {getStatusIcon(task.status)}
                    <div>
                      <p className="font-medium">{task.name}</p>
                      <p className="text-sm text-gray-500">{task.date}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
