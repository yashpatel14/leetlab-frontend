import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import {
  Play,
  FileText,
  MessageSquare,
  Lightbulb,
  Bookmark,
  Share2,
  Clock,
  ChevronRight,
  Code2,
  Users,
  ThumbsUp,
  Home,
  Terminal,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useProblemStore } from "../store/useProblemStore";
import { useExecutionStore } from "../store/useExecution";
import { useSubmissionStore } from "../store/useSubmissionStore";
import Submission from "../components/Submission";
import SubmissionsList from "../components/SubmissionsList";
import { getLanguageId } from "../helpers/utils";
import { Button } from "@/components/ui/button";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ProblemPage = () => {
  const { id } = useParams();
  const { getProblemById, problem, isProblemLoading } = useProblemStore();
  const {
    submission: submissions,
    isLoading: isSubmissionsLoading,
    getSubmissionForProblem,
    getSubmissionCountForProblem,
    submissionCount,
  } = useSubmissionStore();
  const [code, setCode] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [testCases, setTestCases] = useState([]);
  const { executeCode, submission, isExecuting } = useExecutionStore();

  useEffect(() => {
    getProblemById(id);
    getSubmissionCountForProblem(id);
  }, [id]);

  useEffect(() => {
    if (problem) {
      setCode(
        problem.codeSnippets?.[selectedLanguage] || submission?.sourceCode || ""
      );
      setTestCases(
        problem.testCases?.map((tc) => ({
          input: tc.input,
          output: tc.output,
        })) || []
      );
    }
  }, [problem, selectedLanguage]);

  // console.log(problem)

  useEffect(() => {
    if (activeTab === "submissions" && id) {
      getSubmissionForProblem(id);
    }
  }, [activeTab, id]);

  console.log(problem)
  const handleRunCode = (e) => {
    e.preventDefault();
    try {
      const language_id = getLanguageId(selectedLanguage);
      const stdin = problem.testcases.map((tc) => tc.input);

      const expected_outputs = problem.testcases.map((tc) => tc.output);
      executeCode(code, language_id, stdin, expected_outputs, id);
    } catch (error) {
      console.log("Error executing code", error);
    }
  };

  if (isProblemLoading || !problem) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen w-full p-4 space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-primary">
          <Home className="w-5 h-5" />
          <ChevronRight className="w-4 h-4" />
          <h1 className="text-xl font-bold">{problem.title}</h1>
        </div>
        <div className="flex gap-2 items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsBookmarked(!isBookmarked)}
          >
            <Bookmark className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Share2 className="w-5 h-5" />
          </Button>
          <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
            <SelectTrigger className="w-40" />
            <SelectContent>
              {Object.keys(problem.codeSnippets || {}).map((lang) => (
                <SelectItem key={lang} value={lang}>
                  {lang.charAt(0).toUpperCase() + lang.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="description" icon={<FileText className="w-4 h-4" />}>Description</TabsTrigger>
          <TabsTrigger value="submissions" icon={<Code2 className="w-4 h-4" />}>Submissions</TabsTrigger>
          <TabsTrigger value="discussion" icon={<MessageSquare className="w-4 h-4" />}>Discussion</TabsTrigger>
          <TabsTrigger value="hints" icon={<Lightbulb className="w-4 h-4" />}>Hints</TabsTrigger>
        </TabsList>
        <TabsContent value="description">
          <Card>
            <CardContent className="prose max-w-none p-6">
              <p>{problem.description}</p>
              {problem.examples && (
                <>
                  <h3>Examples:</h3>
                  {Object.entries(problem.examples).map(([lang, ex]) => (
                    <div key={lang} className="bg-muted p-4 rounded-lg">
                      <div>
                        <strong>Input:</strong>
                        <pre>{ex.input}</pre>
                      </div>
                      <div>
                        <strong>Output:</strong>
                        <pre>{ex.output}</pre>
                      </div>
                      {ex.explanation && (
                        <div>
                          <strong>Explanation:</strong>
                          <p>{ex.explanation}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </>
              )}
              {problem.constraints && (
                <>
                  <h3>Constraints:</h3>
                  <pre className="bg-muted p-4 rounded-lg">{problem.constraints}</pre>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="submissions">
          <SubmissionsList submissions={submissions} isLoading={isSubmissionsLoading} />
        </TabsContent>
        <TabsContent value="discussion">
          <div className="text-muted text-center">No discussions yet</div>
        </TabsContent>
        <TabsContent value="hints">
          {problem?.hints ? (
            <Card>
              <CardContent>
                <pre className="bg-muted p-4 rounded-lg">{problem.hints}</pre>
              </CardContent>
            </Card>
          ) : (
            <div className="text-muted text-center">No hints available</div>
          )}
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Terminal className="w-4 h-4" /> Code Editor
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="h-[600px] w-full">
            <Editor
              height="100%"
              language={selectedLanguage.toLowerCase()}
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value || "")}
              options={{
                minimap: { enabled: false },
                fontSize: 22,
                lineNumbers: "on",
                scrollBeyondLastLine: false,
                automaticLayout: true,
              }}
            />
          </div>
          <div className="flex justify-between p-4 border-t">
            <Button onClick={handleRunCode} disabled={isExecuting}>
              {isExecuting ? "Running..." : (
                <>
                  <Play className="w-4 h-4" /> Run Code
                </>
              )}
            </Button>
            <Button variant="success">Submit Solution</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Test Cases</CardTitle>
        </CardHeader>
        <CardContent>
          {submission ? (
            <Submission submission={submission} />
          ) : (
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Input</th>
                  <th>Expected Output</th>
                </tr>
              </thead>
              <tbody>
                {testCases.map((tc, i) => (
                  <tr key={i}>
                    <td className="font-mono whitespace-pre">{tc.input}</td>
                    <td className="font-mono whitespace-pre">{tc.output}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProblemPage;
