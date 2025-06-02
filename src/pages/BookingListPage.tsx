import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../flyme.css';
import FlymeNavbar from '../components/FlymeNavbar';

// 导入SVG图标
import flymeLogoSvg from '../assets/figma/flyme-logo.svg';

interface Booking {
  id: string;
  reference: string;
  route: string;
  date: string;
  status: 'upcoming' | 'past';
}

const BookingListPage: React.FC = () => {
  // 状态管理
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  // 模拟预订数据
  const bookings: Booking[] = [
    {
      id: '1',
      reference: 'ABC1234',
      route: 'New York to London',
      date: 'July 15, 2024',
      status: 'upcoming'
    },
    {
      id: '2',
      reference: 'XYZ9876',
      route: 'London to Paris',
      date: 'June 10, 2024',
      status: 'past'
    }
  ];

  // 过滤预订数据
  const filteredBookings = bookings.filter(booking => booking.status === activeTab);

  return (
    <div className="flyme-search">
      {/* 导航栏 */}
      <FlymeNavbar 
        activePage="manage" 
        navItems={[
          { id: 'book', label: 'Book', path: '/search' },
          { id: 'manage', label: 'Manage', path: '/my-bookings' }
        ]}
      />

      {/* 主内容区域 */}
      <div className="flyme-main">
        <div className="flyme-outbound-container">
          {/* 我的预订标题 */}
          <div className="flyme-booking-title-container">
            <h1 className="flyme-booking-title">My Bookings</h1>
          </div>

          {/* 标签切换 */}
          <div className="flyme-booking-tabs-container">
            {/* 标签按钮 */}
            <div className="flyme-booking-tabs-buttons">
              <div 
                className={`flyme-booking-tab ${activeTab === 'upcoming' ? 'flyme-nav-link-active' : ''}`}
                onClick={() => setActiveTab('upcoming')}
              >
                Upcoming
              </div>
              
              {/* 预订列表 - 即将到来 */}
              {activeTab === 'upcoming' && (
                <div className="flyme-booking-list-container">
                  {filteredBookings.length > 0 ? (
                    filteredBookings.map(booking => (
                      <div 
                        key={booking.id} 
                        className="flyme-booking-card"
                      >
                        <div className="flyme-booking-card-content">
                          <div className="flyme-booking-reference">
                            Booking Reference: {booking.reference}
                          </div>
                          <div className="flyme-booking-route">
                            {booking.route}
                          </div>
                          <div className="flyme-booking-date">
                            Departure: {booking.date}
                          </div>
                        </div>
                        <div className="flyme-booking-indicator-upcoming" />
                      </div>
                    ))
                  ) : (
                    <div className="flyme-booking-empty">
                      No upcoming bookings found.
                    </div>
                  )}
                </div>
              )}

              <div 
                className={`flyme-booking-tab ${activeTab === 'past' ? 'flyme-nav-link-active' : ''}`}
                onClick={() => setActiveTab('past')}
              >
                Past
              </div>
              
              {/* 预订列表 - 过去的 */}
              {activeTab === 'past' && (
                <div className="flyme-booking-list-container">
                  {filteredBookings.length > 0 ? (
                    filteredBookings.map(booking => (
                      <div 
                        key={booking.id} 
                        className="flyme-booking-card"
                      >
                        <div className="flyme-booking-card-content">
                          <div className="flyme-booking-reference">
                            Booking Reference: {booking.reference}
                          </div>
                          <div className="flyme-booking-route">
                            {booking.route}
                          </div>
                          <div className="flyme-booking-date">
                            Completed: {booking.date}
                          </div>
                        </div>
                        <div className="flyme-booking-indicator-past" />
                      </div>
                    ))
                  ) : (
                    <div className="flyme-booking-empty">
                      No past bookings found.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingListPage;