import React, { useEffect } from "react";
import { useProblemStore } from "../store/useProblemStore";
import { Link } from "react-router-dom";
import {
  Tag,
  ExternalLink,
  AlertTriangle,
  CheckCircle,
  Circle,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableHead, TableRow, TableHeader, TableBody, TableCell } from "@/components/ui/table";

const ProblemSolvedByUser = () => {
  const { getSolvedProblemByUser, solvedProblems } = useProblemStore();

  useEffect(() => {
    getSolvedProblemByUser();
  }, [getSolvedProblemByUser]);

  const getDifficultyBadge = (difficulty) => {
    switch (difficulty) {
      case "EASY":
        return (
          <Badge variant="success" className="gap-1">
            <CheckCircle size={12} /> Easy
          </Badge>
        );
      case "MEDIUM":
        return (
          <Badge variant="warning" className="gap-1">
            <Circle size={12} /> Medium
          </Badge>
        );
      case "HARD":
        return (
          <Badge variant="destructive" className="gap-1">
            <AlertTriangle size={12} /> Hard
          </Badge>
        );
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <div className="p-4 bg-muted min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-primary mb-6">Problems Solved</h2>

        {solvedProblems.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-medium">No problems solved yet</h3>
              <p className="text-muted-foreground">
                Start solving problems to see them listed here!
              </p>
              <Button asChild className="mt-4">
                <Link to="/problems">View Problems</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Solved Problems</CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Problem</TableHead>
                    <TableHead>Difficulty</TableHead>
                    <TableHead>Tags</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {solvedProblems.map((problem) => (
                    <TableRow key={problem.id}>
                      <TableCell className="font-medium">{problem.title}</TableCell>
                      <TableCell>{getDifficultyBadge(problem.difficulty)}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {problem.tags?.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-sm">
                              <Tag size={10} className="mr-1" />
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Button asChild size="sm" variant="outline">
                          <Link to={`/problems/${problem.id}`} className="flex items-center gap-1">
                            <ExternalLink size={14} /> View
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <span className="text-sm">
                Total problems solved: <span className="font-bold">{solvedProblems.length}</span>
              </span>
              <Button asChild size="sm">
                <Link to="/problems">Solve more problems</Link>
              </Button>
            </CardFooter>
          </Card>
        )}

        {solvedProblems.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {['EASY', 'MEDIUM', 'HARD'].map((level) => (
              <Card key={level} className="text-center">
                <CardHeader>
                  <CardTitle>{level}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={
                    level === 'EASY' ? 'text-success text-2xl' :
                    level === 'MEDIUM' ? 'text-warning text-2xl' :
                    'text-destructive text-2xl'
                  }>
                    {solvedProblems.filter((p) => p.difficulty === level).length}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProblemSolvedByUser;
