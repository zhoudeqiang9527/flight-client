import React from 'react';
import { Link } from 'react-router-dom';
import FlymeNavbar from '../components/FlymeNavbar';

interface Booking {
  id: string;
  flightNumber: string;
  from: string;
  to: string;
  date: string;
  status: 'confirmed' | 'cancelled' | 'completed';
}

const MyBookingsPage: React.FC = () => {
  // Mock data for bookings
  const bookings: Booking[] = [
    {
      id: 'BK001',
      flightNumber: 'FL123',
      from: 'New York',
      to: 'London',
      date: '2023-12-15',
      status: 'confirmed'
    },
    {
      id: 'BK002',
      flightNumber: 'FL456',
      from: 'Paris',
      to: 'Tokyo',
      date: '2023-11-20',
      status: 'completed'
    },
    {
      id: 'BK003',
      flightNumber: 'FL789',
      from: 'Sydney',
      to: 'Dubai',
      date: '2024-01-10',
      status: 'confirmed'
    }
  ];

  const getStatusColor = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed': return 'flyme-status-confirmed';
      case 'cancelled': return 'flyme-status-cancelled';
      case 'completed': return 'flyme-status-completed';
      default: return 'flyme-status-default';
    }
  };

  return (
    <div className="flyme-main">
      {/* Header */}
      <FlymeNavbar 
        activePage="manage"
        navItems={[
          { id: 'book', label: 'Home', path: '/' },
          { id: 'manage', label: 'My Bookings', path: '/my-bookings' }
        ]}
      />

      {/* Main Content */}
      <main className="flyme-container">
        <h2 className="flyme-page-title">My Bookings</h2>
        
        {bookings.length > 0 ? (
          <div className="flyme-card">
            <table className="flyme-table">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Flight</th>
                  <th>Route</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td>{booking.id}</td>
                    <td>{booking.flightNumber}</td>
                    <td>{booking.from} to {booking.to}</td>
                    <td>{booking.date}</td>
                    <td>
                      <span className={`flyme-status ${getStatusColor(booking.status)}`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </td>
                    <td>
                      <button className="flyme-button">View Details</button>
                      {booking.status === 'confirmed' && (
                        <button className="flyme-button flyme-button-danger">Cancel</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flyme-empty-state">
            <p>You don't have any bookings yet.</p>
            <Link to="/" className="flyme-button">
              Book a Flight
            </Link>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="flyme-footer">
        <div className="flyme-footer-content">
          <div className="flyme-footer-section">
            <h3>FlyMe</h3>
            <p>Your trusted partner for flight bookings worldwide.</p>
          </div>
          <div className="flyme-footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/my-bookings">My Bookings</Link></li>
              <li><Link to="/login">Login</Link></li>
            </ul>
          </div>
          <div className="flyme-footer-section">
            <h4>Contact Us</h4>
            <p>Email: support@flyme.com</p>
            <p>Phone: +1 (555) 123-4567</p>
          </div>
        </div>
        <div className="flyme-footer-copyright">
          <p>&copy; {new Date().getFullYear()} FlyMe. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default MyBookingsPage;