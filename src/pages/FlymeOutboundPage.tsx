import React, { use, useEffect, useRef, useState } from 'react';
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
  // 添加 from 和 to 状态
  const [from, setFrom] = useState<string>('');
  const [to, setTo] = useState<string>('');

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const seletedFlightNumber = useRef<string | null>(null);
  
  useEffect(() => {
    const fetchFlights = async () => {
        const fromParam = searchParams.get('from') || '';
        const toParam = searchParams.get('to') || '';
        const departDate = searchParams.get('departDate') || '';
        const returnDate = searchParams.get('returnDate') || '';
        
        // 更新状态
        setFrom(fromParam);
        setTo(toParam);

        // 构建查询参数对象
        const params = {
            from: fromParam,
            to: toParam,
            departureDate: departDate,
            returnDate: returnDate
        };
        
        const response = await http.get<FlgihtResponse>('/flights', { params });
        const data = response.data;
        console.log(data);
        setFlights(data);
    };
    fetchFlights();
  }, []);
  // 处理航班选择
  const handleFlightSelect = (id: string) => {
    setFlights(flights.map(flight => {
      const isSelected = flight.id === id;
      if (isSelected) {
        seletedFlightNumber.current = flight.flight_number;
      }
      return {
        ...flight,
        selected: isSelected
      };
    }));
    
  };

  // 处理继续按钮点击
  const handleContinue = () => {
    if (flights.some(flight => flight.selected)) {
        const url = `/review?flightNo=${seletedFlightNumber.current}`;
      // 导航到Review页面
      navigate(url);
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
              <div className="flyme-flight-header-item">航班</div>
              <div className="flyme-flight-header-item">起飞时间</div>
              <div className="flyme-flight-header-item">到达时间</div>
              <div className="flyme-flight-header-item">航行时间</div>
              <div className="flyme-flight-header-item">经停</div>
              <div className="flyme-flight-header-item">价格</div>
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
                  <span>{flight.flight_number}</span>
                </div>
                <div className="flyme-flight-cell">
                    {flight.departureTime}
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