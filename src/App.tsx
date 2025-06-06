import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// 导入HomePage组件并指定其类型为React.FC
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MyBookingsPage from './pages/MyBookingsPage';
import BookingListPage from './pages/BookingListPage';
import FlymeSearchPage from './pages/FlymeSearchPage';
import FlymeOutboundPage from './pages/FlymeOutboundPage';
import FlymeReviewPage from './pages/FlymeReviewPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FlymeSearchPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/my-bookings" element={<MyBookingsPage />} />
        <Route path="/booking-list" element={<BookingListPage />} />
        <Route path="/search" element={<FlymeSearchPage />} />
        <Route path="/outbound" element={<FlymeOutboundPage />} />
        <Route path="/review" element={<FlymeReviewPage />} />
      </Routes>
    </Router>
  );
};

export default App;