import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// 导入HomePage组件并指定其类型为React.FC
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import MyBookingsPage from './pages/MyBookingsPage';
import FlymeSearchPage from './pages/FlymeSearchPage';
import FlymeOutboundPage from './pages/FlymeOutboundPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/my-bookings" element={<MyBookingsPage />} />
        <Route path="/search" element={<FlymeSearchPage />} />
        <Route path="/outbound" element={<FlymeOutboundPage />} />
      </Routes>
    </Router>
  );
};

export default App;