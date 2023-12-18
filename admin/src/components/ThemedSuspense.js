import React from 'react';

function ThemedSuspense() {
  return (
    <div className="w-full h-screen p-6 text-lg font-medium text-gray-600 dark:text-gray-400 dark:bg-gray-900">
      <div className="flex justify-center items-center space-x-2">
        <div
          className="spinner-grow inline-block w-8 h-8 bg-current rounded-full opacity-0 text-blue-600"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
        <div
          className="
      spinner-grow inline-block w-8 h-8 bg-current rounded-full opacity-0
        text-purple-500
      "
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
        <div
          className="
      spinner-grow inline-block w-8 h-8 bg-current rounded-full opacity-0
        text-green-500
      "
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
        <div
          className="spinner-grow inline-block w-8 h-8 bg-current rounded-full opacity-0 text-red-500"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
        <div
          className="
      spinner-grow inline-block w-8 h-8 bg-current rounded-full opacity-0
        text-yellow-500
      "
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
        <div
          className="spinner-grow inline-block w-8 h-8 bg-current rounded-full opacity-0 text-blue-300"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
        <div
          className="spinner-grow inline-block w-8 h-8 bg-current rounded-full opacity-0 text-gray-300"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
}

export default ThemedSuspense;
