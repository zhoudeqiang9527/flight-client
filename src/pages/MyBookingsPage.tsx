import React from 'react';
import { Link } from 'react-router-dom';
import FlymeNavbar from '../components/FlymeNavbar';

const MyBookingsPage: React.FC = () => {
  // 模拟预订数据
  const bookings = [
    {
      id: 'BK12345',
      route: 'London to Paris',
      date: '2023-10-15',
      status: 'confirmed',
      price: '£120',
    },
    {
      id: 'BK12346',
      route: 'Paris to Rome',
      date: '2023-11-20',
      status: 'confirmed',
      price: '£180',
    },
    {
      id: 'BK12347',
      route: 'Rome to Madrid',
      date: '2023-09-05',
      status: 'completed',
      price: '£150',
    },
    {
      id: 'BK12348',
      route: 'Madrid to Berlin',
      date: '2023-12-10',
      status: 'cancelled',
      price: '£200',
    },
  ];

  // 判断是否有预订
  const hasBookings = bookings.length > 0;

  return (
    <div className="flyme-mybookings-container">
      {/* 头部 - 使用共通导航栏组件 */}
      <FlymeNavbar activePage="manage" />

      {/* 主内容 */}
      <main className="flyme-main">
        <h1 className="flyme-mybookings-title">My Bookings</h1>

        {hasBookings ? (
          <div className="flyme-mybookings-table-container">
            <table className="flyme-mybookings-table">
              <thead className="flyme-mybookings-table-header">
                <tr>
                  <th className="flyme-mybookings-table-th">Booking ID</th>
                  <th className="flyme-mybookings-table-th">Route</th>
                  <th className="flyme-mybookings-table-th">Date</th>
                  <th className="flyme-mybookings-table-th">Price</th>
                  <th className="flyme-mybookings-table-th">Status</th>
                  <th className="flyme-mybookings-table-th">Actions</th>
                </tr>
              </thead>
              <tbody className="flyme-mybookings-table-body">
                {bookings.map((booking) => (
                  <tr key={booking.id} className="flyme-mybookings-table-row">
                    <td className="flyme-mybookings-table-td">
                      <span className="flyme-mybookings-id">{booking.id}</span>
                    </td>
                    <td className="flyme-mybookings-table-td">
                      <span className="flyme-mybookings-text">{booking.route}</span>
                    </td>
                    <td className="flyme-mybookings-table-td">
                      <span className="flyme-mybookings-text">{booking.date}</span>
                    </td>
                    <td className="flyme-mybookings-table-td">
                      <span className="flyme-mybookings-text">{booking.price}</span>
                    </td>
                    <td className="flyme-mybookings-table-td">
                      <span className={`flyme-mybookings-status flyme-mybookings-status-${booking.status}`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </td>
                    <td className="flyme-mybookings-table-td">
                      <button className="flyme-mybookings-action-button flyme-mybookings-view-button">
                        View
                      </button>
                      {booking.status === 'confirmed' && (
                        <button className="flyme-mybookings-action-button flyme-mybookings-cancel-button">
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flyme-mybookings-empty">
            <p className="flyme-mybookings-empty-text">You don't have any bookings yet.</p>
            <Link to="/" className="flyme-mybookings-book-button">
              Book a Flight
            </Link>
          </div>
        )}
      </main>

      {/* 底部 */}
      <footer className="flyme-footer">
        <div className="flyme-footer-container">
          <div className="flyme-footer-grid">
            <div>
              <h2 className="flyme-footer-title">FlyMe</h2>
              <p className="flyme-footer-text">Making air travel accessible and enjoyable for everyone.</p>
            </div>
            <div>
              <h3 className="flyme-footer-subtitle">Quick Links</h3>
              <ul className="flyme-footer-list">
                <li><Link to="/" className="flyme-footer-link">Home</Link></li>
                <li><Link to="/about" className="flyme-footer-link">About Us</Link></li>
                <li><Link to="/contact" className="flyme-footer-link">Contact</Link></li>
                <li><Link to="/faq" className="flyme-footer-link">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="flyme-footer-subtitle">Legal</h3>
              <ul className="flyme-footer-list">
                <li><Link to="/terms" className="flyme-footer-link">Terms of Service</Link></li>
                <li><Link to="/privacy" className="flyme-footer-link">Privacy Policy</Link></li>
                <li><Link to="/cookies" className="flyme-footer-link">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="flyme-footer-divider">
            &copy; {new Date().getFullYear()} FlyMe. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MyBookingsPage;