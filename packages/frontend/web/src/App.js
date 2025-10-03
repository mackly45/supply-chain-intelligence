import React, { useState, useEffect } from 'react';

function App() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900">
      <div className="flex-grow flex flex-col items-center justify-center space-y-8">
        <div className="relative w-48 h-48 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 shadow-xl flex items-center justify-center animate-pulse">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 opacity-70 animate-ping"></div>
          <div className="absolute inset-4 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
              </svg>
            </div>
          </div>
        </div>
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white tracking-tight">
            Congo Supply Chain
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-md">
            Intelligent logistics for a connected future
          </p>
        </div>
      </div>
      <div className="w-full max-w-md space-y-4">
        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
          <span>Loading application...</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 shadow-inner">
          <div 
            className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-300 ease-out shadow-md"
            style={{width: `${progress}%`}}
          ></div>
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-500 italic">
          Connecting to supply chain network...
        </p>
      </div>
    </div>
  );
}

export default App;