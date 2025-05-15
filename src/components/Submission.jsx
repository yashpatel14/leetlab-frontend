import React from 'react'
import {
  CheckCircle2,
  XCircle,
  Clock,
  MemoryStick as Memory,
} from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const SubmissionResults = ({ submission }) => {
  const memoryArr = JSON.parse(submission.memory || '[]')
  const timeArr = JSON.parse(submission.time || '[]')

  const avgMemory =
    memoryArr.reduce((acc, val) => acc + parseFloat(val), 0) /
    (memoryArr.length || 1)
  const avgTime =
    timeArr.reduce((acc, val) => acc + parseFloat(val), 0) /
    (timeArr.length || 1)

  const passedTests = submission.testCases.filter((tc) => tc.passed).length
  const totalTests = submission.testCases.length
  const successRate = (passedTests / totalTests) * 100

  return (
    <div className="space-y-6">
      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={`text-lg font-bold ${
                submission.status === 'Accepted'
                  ? 'text-green-600'
                  : 'text-red-600'
              }`}
            >
              {submission.status}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{successRate.toFixed(1)}%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Avg. Runtime
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{avgTime.toFixed(3)} s</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <Memory className="w-4 h-4" />
              Avg. Memory
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{avgMemory.toFixed(0)} KB</div>
          </CardContent>
        </Card>
      </div>

      {/* Test Cases Table */}
      <Card>
        <CardHeader>
          <CardTitle>Test Cases Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Status</TableHead>
                  <TableHead>Expected Output</TableHead>
                  <TableHead>Your Output</TableHead>
                  <TableHead>Memory</TableHead>
                  <TableHead>Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submission.testCases.map((testCase) => (
                  <TableRow key={testCase.id}>
                    <TableCell>
                      {testCase.passed ? (
                        <div className="flex items-center gap-2 text-green-600">
                          <CheckCircle2 className="w-5 h-5" />
                          Passed
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-red-600">
                          <XCircle className="w-5 h-5" />
                          Failed
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="font-mono">
                      {testCase.expected}
                    </TableCell>
                    <TableCell className="font-mono">
                      {testCase.stdout || 'null'}
                    </TableCell>
                    <TableCell>{testCase.memory}</TableCell>
                    <TableCell>{testCase.time}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default SubmissionResults
