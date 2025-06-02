import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../flyme.css';

// 导入组件
import FlymeNavbar from '../components/FlymeNavbar';

interface TripType {
  value: string;
  label: string;
}

interface Location {
  code: string;
  name: string;
}

const FlymeSearchPage: React.FC = () => {
  const navigate = useNavigate();
  
  // 定义状态
  const [tripType, setTripType] = useState<string>('roundtrip');
  const [fromLocation, setFromLocation] = useState<string>('');
  const [toLocation, setToLocation] = useState<string>('');
  const [departDate, setDepartDate] = useState<string>('');
  const [returnDate, setReturnDate] = useState<string>('');
  const [passengers, setPassengers] = useState<number>(1);

  // 模拟数据
  const tripTypes: TripType[] = [
    { value: 'roundtrip', label: '往返' },
    { value: 'oneway', label: '单程' },
    { value: 'multicity', label: '多城市' }
  ];

  const locations: Location[] = [
    { code: 'PEK', name: '北京' },
    { code: 'SHA', name: '上海' },
    { code: 'CAN', name: '广州' },
    { code: 'SZX', name: '深圳' },
    { code: 'CTU', name: '成都' }
  ];

  // 处理搜索表单提交
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      tripType,
      fromLocation,
      toLocation,
      departDate,
      returnDate,
      passengers
    });
    // 导航到航班选择页面
    navigate('/outbound');
  };

  return (
    <div className="flyme-search">
      {/* 使用共通导航栏组件 */}
      <FlymeNavbar activePage="book" />

      {/* 主内容区域 */}
      <main className="flyme-main">
        <div className="flyme-search-container">
          {/* 搜索卡片 */}
          <div className="flyme-search-card">
            <h1 className="flyme-search-title">Book flights</h1>
            <p className="flyme-search-subtitle">Find the best fares for your next trip</p>
            
            {/* 搜索表单 */}
            <form className="flyme-search-form" onSubmit={handleSearchSubmit}>
              {/* 第一行：行程类型 */}
              <div className="flyme-form-row">
                <div className="flyme-form-group">
                  <label htmlFor="trip-type" className="flyme-form-label">Trip type</label>
                  <select 
                    id="trip-type" 
                    className="flyme-form-select"
                    value={tripType}
                    onChange={(e) => setTripType(e.target.value)}
                  >
                    {tripTypes.map((type) => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* 第二行：出发地/目的地 */}
              <div className="flyme-form-row">
                <div className="flyme-form-group">
                  <label htmlFor="from-location" className="flyme-form-label">From/To</label>
                  <input 
                    type="text" 
                    id="from-location" 
                    className="flyme-form-input" 
                    placeholder="From"
                    value={fromLocation}
                    onChange={(e) => setFromLocation(e.target.value)}
                  />
                </div>
                <div className="flyme-form-group">
                  <label htmlFor="to-location" className="flyme-form-label" style={{ visibility: 'hidden' }}>To</label>
                  <input 
                    type="text" 
                    id="to-location" 
                    className="flyme-form-input" 
                    placeholder="To"
                    value={toLocation}
                    onChange={(e) => setToLocation(e.target.value)}
                  />
                </div>
              </div>
              
              {/* 第三行：出发日期/返回日期 */}
              <div className="flyme-form-row">
                <div className="flyme-form-group">
                  <label htmlFor="depart-date" className="flyme-form-label">Depart/Return</label>
                  <input 
                    type="date" 
                    id="depart-date" 
                    className="flyme-form-input" 
                    placeholder="Depart"
                    value={departDate}
                    onChange={(e) => setDepartDate(e.target.value)}
                  />
                </div>
                <div className="flyme-form-group">
                  <label htmlFor="return-date" className="flyme-form-label" style={{ visibility: 'hidden' }}>Return</label>
                  <input 
                    type="date" 
                    id="return-date" 
                    className="flyme-form-input" 
                    placeholder="Return"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    disabled={tripType === 'oneway'}
                  />
                </div>
              </div>
              
              {/* 第四行：乘客数量 */}
              <div className="flyme-form-row">
                <div className="flyme-form-group">
                  <label htmlFor="passengers" className="flyme-form-label">Passengers</label>
                  <select 
                    id="passengers" 
                    className="flyme-form-select"
                    value={passengers}
                    onChange={(e) => setPassengers(Number(e.target.value))}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Passenger' : 'Passengers'}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* 搜索按钮 */}
              <div className="flyme-form-row">
                <button type="submit" className="flyme-search-button">Search flights</button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FlymeSearchPage;