import React from 'react'
import { Button } from "@/components/ui/button";

export const HomePage = () => {
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
    </section>
  )
}
