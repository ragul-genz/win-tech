import React, { useState } from 'react';
import DashboardHeader from './components/DashboardHeader';
import DashboardCourses from './components/DashboardCourses';
import Login from './components/Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="dashboard-layout">
      <DashboardHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <DashboardCourses searchQuery={searchQuery} />
    </div>
  );
}

export default App;
