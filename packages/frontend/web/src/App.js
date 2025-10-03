import React from 'react';

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
      <div className="flex-grow flex flex-col items-center justify-center space-y-8">
        <div className="w-48 h-48 rounded-full bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBF0oke6tlvs6Adg3LV4H34zulBMBXdLgux3sSEDIxeI-0lKcxlyF0rOx8zc-VM05SdfS__nJbkT3o2YtpMlkjwoXL3HDqs41NQaNPe9cC4W0s9ScmG23fsH3etgjt3lw0TbI08Fd2xf6vkDnhfhTLgE39C2eXVk067eJ_JBNR5tVi7eWfDCpbXLhvlh4nyzjuT4byPdBw9O6JMlvOI87zGrJ17BswVwBaedwTjStOGv027qz1aCaA01V85ldfW3x9F3uJp4AwsWIbT')"}}></div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Congo Supply Chain</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">Intelligent logistics for a connected future.</p>
      </div>
      <div className="w-full max-w-sm space-y-2">
        <p className="text-sm text-gray-500 dark:text-gray-400">Loading...</p>
        <div className="w-full bg-primary/20 rounded-full h-2">
          <div className="bg-primary h-2 rounded-full" style={{width: '20%'}}></div>
        </div>
      </div>
    </div>
  );
}

export default App;