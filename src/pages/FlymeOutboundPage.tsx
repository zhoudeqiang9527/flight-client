import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../flyme.css';

// 导入组件
import FlymeNavbar from '../components/FlymeNavbar';

// 导入SVG图标
import airlineLogoSvg from '../assets/figma/airline-logo.svg';

interface Flight {
  id: string;
  airline: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: string;
  price: number;
  selected?: boolean;
}

const FlymeOutboundPage: React.FC = () => {
  // 模拟航班数据
  const [flights, setFlights] = useState<Flight[]>([
    {
      id: '1',
      airline: 'Skybound',
      departureTime: '10:00 AM',
      arrivalTime: '1:00 PM',
      duration: '3h',
      stops: 'Non-stop',
      price: 320,
      selected: false
    },
    {
      id: '2',
      airline: 'Skybound',
      departureTime: '12:30 PM',
      arrivalTime: '3:30 PM',
      duration: '3h',
      stops: 'Non-stop',
      price: 290,
      selected: false
    },
    {
      id: '3',
      airline: 'Skybound',
      departureTime: '3:45 PM',
      arrivalTime: '6:45 PM',
      duration: '3h',
      stops: 'Non-stop',
      price: 310,
      selected: false
    }
  ]);

  // 处理航班选择
  const handleFlightSelect = (id: string) => {
    setFlights(flights.map(flight => ({
      ...flight,
      selected: flight.id === id
    })));
  };

  // 处理继续按钮点击
  const handleContinue = () => {
    const selectedFlight = flights.find(flight => flight.selected);
    if (selectedFlight) {
      console.log('Selected flight:', selectedFlight);
      // 这里可以添加导航到下一步的逻辑
    }
  };

  return (
    <div className="flyme-search">
      {/* 使用共通导航栏组件 */}
      <FlymeNavbar activePage="book" />

      {/* 主内容区域 */}
      <main className="flyme-main">
        <div className="flyme-outbound-container">
          {/* 面包屑导航 */}
          <div className="flyme-breadcrumb">
            <Link to="/" className="flyme-breadcrumb-link">Home</Link>
            <span className="flyme-breadcrumb-separator">/</span>
            <Link to="/search" className="flyme-breadcrumb-link">Flights</Link>
            <span className="flyme-breadcrumb-separator">/</span>
            <span className="flyme-breadcrumb-current">London to New York</span>
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
                <div className="flyme-flight-cell">{flight.departureTime}</div>
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