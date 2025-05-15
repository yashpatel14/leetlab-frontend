import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useProblemStore } from "../store/useProblemStore";
import ProblemsTable from "../components/ProblemTable";
import { Loader } from "lucide-react";


export const HomePage = () => {

  const { getAllProblems ,problems , isProblemsLoading} = useProblemStore();

  useEffect(() => {
    getAllProblems();
  }, [getAllProblems]);

  console.log("Home Page",problems);

  if (isProblemsLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <section className="w-full bg-white dark:bg-gray-900 py-20 px-4 text-center">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6">
          Welcome to <span className="text-primary">MyApp</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
          Build and manage your coding challenges with ease. Perfect for developers and educators.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg">Get Started</Button>
          <Button variant="outline" size="lg">
            Learn More
          </Button>
        </div>
      </div>
      {
      problems.length > 0 ? <ProblemsTable problems={problems} /> : (
        <p className="mt-10 text-center text-lg font-semibold text-gray-500 dark:text-gray-400 z-10 border border-primary px-4 py-2 rounded-md border-dashed">
          No problems found
        </p>
      )
    }
    </section>
  )
}
