import React, { useEffect, useState } from 'react';
import { useSubmissionStore } from '../store/useSubmissionStore';
import {
  Code,
  Terminal,
  Clock,
  HardDrive,
  Check,
  ChevronDown,
  ChevronUp,
  Filter,
  X
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';

const ProfileSubmission = () => {
  const { submissions, getAllSubmissions } = useSubmissionStore();
  const [expandedSubmission, setExpandedSubmission] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    getAllSubmissions();
  }, [getAllSubmissions]);

  const getStatusVariant = (status) => {
    switch (status) {
      case 'Accepted':
        return 'success';
      case 'Wrong Answer':
        return 'destructive';
      case 'Time Limit Exceeded':
        return 'warning';
      default:
        return 'secondary';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
  };

  const toggleExpand = (id) => {
    setExpandedSubmission((prev) => (prev === id ? null : id));
  };

  const filteredSubmissions = submissions.filter((s) =>
    filter === 'all' ? true : s.status === filter
  );

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold">My Submissions</h1>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex gap-2 items-center">
                  <Filter size={16} />
                  {filter === 'all' ? 'All Submissions' : filter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {['all', 'Accepted', 'Wrong Answer', 'Time Limit Exceeded'].map((f) => (
                  <DropdownMenuItem key={f} onClick={() => setFilter(f)}>
                    {f}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex gap-4">
              <div className="text-sm">Total: <strong>{submissions.length}</strong></div>
              <div className="text-sm text-green-600">
                Accepted: <strong>{submissions.filter(s => s.status === 'Accepted').length}</strong>
              </div>
            </div>
          </div>
        </div>

        {filteredSubmissions.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <CardTitle>No submissions found</CardTitle>
              <p className="text-muted-foreground">You haven't submitted any solutions yet or none match your current filter.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {filteredSubmissions.map((submission) => (
              <Card key={submission.id} className="transition-all duration-300">
                <CardHeader
                  onClick={() => toggleExpand(submission.id)}
                  className="cursor-pointer hover:bg-muted/50 flex flex-col md:flex-row justify-between gap-4"
                >
                  <div className="flex flex-wrap items-center gap-4">
                    <Badge variant={getStatusVariant(submission.status)}>
                      {submission.status === 'Accepted' && <Check size={12} className="mr-1" />}
                      {submission.status}
                    </Badge>
                    <div className="flex items-center gap-2 text-sm">
                      <Code size={14} /> {submission.language}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock size={14} /> {formatDate(submission.createdAt)}
                    </div>
                  </div>
                  <div className="flex items-center">
                    {expandedSubmission === submission.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </CardHeader>

                {expandedSubmission === submission.id && (
                  <CardContent>
                    <Separator className="my-2" />

                    <div className="mb-4">
                      <h3 className="font-semibold flex items-center gap-2 text-lg mb-2">
                        <Code size={18} /> Solution Code
                      </h3>
                      <div className="bg-muted rounded p-4 text-sm whitespace-pre-wrap overflow-x-auto">
                        {submission.sourceCode}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="font-medium flex items-center gap-2 mb-2">
                          <Terminal size={18} /> Input
                        </h4>
                        <div className="bg-muted rounded p-4 text-sm whitespace-pre-wrap">
                          {submission.stdin || 'No input provided'}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium flex items-center gap-2 mb-2">
                          <Terminal size={18} /> Output
                        </h4>
                        <div className="bg-muted rounded p-4 text-sm whitespace-pre-wrap">
                          {
                            Array.isArray(JSON.parse(submission.stdout))
                              ? JSON.parse(submission.stdout).join('')
                              : submission.stdout || 'No output'
                          }
                        </div>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <Card>
                        <CardContent className="p-4 flex items-center gap-4">
                          <Clock size={20} className="text-primary" />
                          <div>
                            <div className="text-sm font-medium">Execution Time</div>
                            <div className="text-lg">
                              {Array.isArray(JSON.parse(submission.time))
                                ? JSON.parse(submission.time)[0]
                                : submission.time || 'N/A'}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 flex items-center gap-4">
                          <HardDrive size={20} className="text-primary" />
                          <div>
                            <div className="text-sm font-medium">Memory Used</div>
                            <div className="text-lg">
                              {Array.isArray(JSON.parse(submission.memory))
                                ? JSON.parse(submission.memory)[0]
                                : submission.memory || 'N/A'}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSubmission;
