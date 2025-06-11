import React, { useEffect, useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import '../flyme.css';
import http from '../services/http';
// 导入组件
import FlymeNavbar from '../components/FlymeNavbar';

// 导入SVG图标
import airlineLogoSvg from '../assets/figma/airline-logo.svg';



const FlymeOutboundPage: React.FC = () => {
  // 模拟航班数据
  const [flights, setFlights] = useState<Flight[]>([]);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchFlights = async () => {
        const from = searchParams.get('from') || '';
        const to = searchParams.get('to') || '';
        const date = searchParams.get('date') || '';
      const response = await http.post<FlgihtResponse>('/api/flights', { from, to, date });
      const data = response.data;
      setFlights(data);
    };
    fetchFlights();
  }, []);
  // 处理航班选择
  const handleFlightSelect = (id: string) => {
    setFlights(flights.map(flight => ({
      ...flight,
      selected: flight.id === id
    })));
  };

  // 处理继续按钮点击
  const handleContinue = () => {
    if (flights.some(flight => flight.selected)) {
      // 导航到Review页面
      navigate('/review');
    }
  };

  return (
    <div className="flyme-search">
      {/* 使用共通导航栏组件 */}
      <FlymeNavbar 
        activePage="book" 
        navItems={[
          { id: 'book', label: 'Book', path: '/search' },
          { id: 'manage', label: 'Manage', path: '/my-bookings' },
          { id: 'help', label: 'Help', path: '/help' }
        ]}
      />

      {/* 主内容区域 */}
      <main className="flyme-main">
        <div className="flyme-outbound-container">
          {/* 面包屑导航 */}
          <div className="flyme-breadcrumb">
            <Link to="/" className="flyme-breadcrumb-link">Home</Link>
            <span className="flyme-breadcrumb-separator">/</span>
            <Link to="/search" className="flyme-breadcrumb-link">Flights</Link>
            <span className="flyme-breadcrumb-separator">/</span>
            <span className="flyme-breadcrumb-current">{from || 'Unknown'} to {to || 'Unknown'}</span>
          </div>

          {/* 页面标题 */}
          <h1 className="flyme-page-title">Select your outbound flight</h1>

          {/* 航班列表 */}
          <div className="flyme-flight-list">
            {/* 表头 */}
            <div className="flyme-flight-header">
              <div className="flyme-flight-header-item">Airline</div>
              <div className="flyme-flight-header-item">Departure</div>
              <div className="flyme-flight-header-item">Arrival</div>
              <div className="flyme-flight-header-item">Duration</div>
              <div className="flyme-flight-header-item">Stops</div>
              <div className="flyme-flight-header-item">Price</div>
            </div>

            {/* 航班项 */}
            {flights.map((flight) => (
              <div 
                key={flight.id} 
                className={`flyme-flight-item ${flight.selected ? 'flyme-flight-selected' : ''}`}
                onClick={() => handleFlightSelect(flight.id)}
              >
                <div className="flyme-flight-cell flyme-flight-airline">
                  <div className="flyme-airline-logo-container">
                    <img src={airlineLogoSvg} alt="Airline Logo" className="flyme-airline-logo" />
                  </div>
                  <span>{flight.airline}</span>
                </div>
                <div className="flyme-flight-cell">
                    {flight.departure_airport_id}
                </div>
                <div className="flyme-flight-cell">{flight.arrivalTime}</div>
                <div className="flyme-flight-cell">{flight.duration}</div>
                <div className="flyme-flight-cell">{flight.stops}</div>
                <div className="flyme-flight-cell flyme-flight-price">${flight.price}</div>
              </div>
            ))}
          </div>

          {/* 继续按钮 */}
          <div className="flyme-continue-container">
            <button 
              className="flyme-continue-button" 
              onClick={handleContinue}
              disabled={!flights.some(flight => flight.selected)}
            >
              Continue
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FlymeOutboundPage;