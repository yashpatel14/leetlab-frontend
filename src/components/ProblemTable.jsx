import React, { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Pencil, Bookmark } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const ProblemTable = ({ problems }) => {
  const { authUser } = useAuthStore();
  console.log(authUser);
  //   const { onDeleteProblem } = useActions();
  //   const { createPlaylist } = usePlaylistStore();
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("ALL");
  const [selectedTag, setSelectedTag] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isAddToPlaylistModalOpen, setIsAddToPlaylistModalOpen] =
    useState(false);
  const [selectedProblemId, setSelectedProblemId] = useState(null);

  // Extract all unique tags from problems
  const allTags = useMemo(() => {
    if (!Array.isArray(problems)) return [];
    const tagsSet = new Set();
    problems.forEach((p) => p.tags?.forEach((t) => tagsSet.add(t)));
    return Array.from(tagsSet);
  }, [problems]);

  // Define allowed difficulties
  const difficulties = ["EASY", "MEDIUM", "HARD"];

  // Filter problems based on search, difficulty, and tags
  const filteredProblems = useMemo(() => {
    return (problems || [])
      .filter((problem) =>
        problem.title.toLowerCase().includes(search.toLowerCase())
      )
      .filter((problem) =>
        difficulty === "ALL" ? true : problem.difficulty === difficulty
      )
      .filter((problem) =>
        selectedTag === "ALL" ? true : problem.tags?.includes(selectedTag)
      );
  }, [problems, search, difficulty, selectedTag]);

  // Pagination logic
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredProblems.length / itemsPerPage);
  const paginatedProblems = useMemo(() => {
    return filteredProblems.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [filteredProblems, currentPage]);

  console.log("table-", paginatedProblems);

  const handleDelete = (id) => {
    onDeleteProblem(id);
  };

  const handleCreatePlaylist = async (data) => {
    await createPlaylist(data);
  };

  const handleAddToPlaylist = (problemId) => {
    setSelectedProblemId(problemId);
    setIsAddToPlaylistModalOpen(true);
  };

  return (
    <div className="w-full max-w-6xl mx-auto mt-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Problems</h2>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Playlist
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <Input
          placeholder="Search by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3"
        />
        <select
          className="border rounded-md p-2 w-full md:w-auto"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="ALL">All Difficulties</option>
          {difficulties.map((diff) => (
            <option key={diff} value={diff}>
              {diff.charAt(0).toUpperCase() + diff.slice(1).toLowerCase()}
            </option>
          ))}
        </select>
        <select
          className="border rounded-md p-2 w-full md:w-auto"
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
        >
          <option value="ALL">All Tags</option>
          {allTags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl shadow-sm border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Solved</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>Difficulty</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedProblems.length > 0 ? (
              paginatedProblems.map((problem) => {
                const isSolved = problem.ProblemSolved?.some(
                    (user) => user.userId === authUser?.id
                  );
                return (
                  <TableRow key={problem.id}>
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={isSolved}
                        readOnly
                        className="accent-green-500"
                      />
                    </TableCell>
                    <TableCell>
                      <Link
                        to={`/problem/${problem.id}`}
                        className="font-medium hover:underline"
                      >
                        {problem.title}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {problem.tags?.map((tag, idx) => (
                          <Badge key={idx} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`text-xs font-bold ${
                          problem.difficulty === "EASY"
                            ? "bg-green-500"
                            : problem.difficulty === "MEDIUM"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                      >
                        {problem.difficulty}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col md:flex-row gap-2">
                        {authUser?.role === "ADMIN" && (
                          <>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDelete(problem.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                            <Button variant="secondary" size="sm" disabled>
                              <Pencil className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleAddToPlaylist(problem.id)}
                        >
                          <Bookmark className="w-4 h-4 mr-1" />
                          <span className="hidden sm:inline">
                            Save to Playlist
                          </span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6">
                  No problems found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </Button>
        <span className="flex items-center px-4 py-1 text-sm">
          {currentPage} / {totalPages}
        </span>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>

      {/* Modals */}
      {/* <CreatePlaylistModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreatePlaylist}
      />
      <AddToPlaylistModal
        isOpen={isAddToPlaylistModalOpen}
        onClose={() => setIsAddToPlaylistModalOpen(false)}
        problemId={selectedProblemId}
      /> */}
    </div>
  );
};

export default ProblemTable;
