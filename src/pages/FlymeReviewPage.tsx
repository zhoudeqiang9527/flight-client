import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../flyme.css';

// 导入组件
import FlymeNavbar from '../components/FlymeNavbar';

interface Flight {
  id: string;
  type: 'outbound' | 'return';
  airline: string;
  route: string;
  dateTime: string;
  cabin: string;
  price: number;
}

const FlymeReviewPage: React.FC = () => {
  const navigate = useNavigate();
  
  // 模拟航班数据
  const flights: Flight[] = [
    {
      id: '1',
      type: 'outbound',
      airline: 'SkyBound Airways',
      route: '北京 (PEK) - 上海 (SHA)',
      dateTime: '2023年10月15日 · 08:30 - 10:45',
      cabin: '经济舱',
      price: 1280
    },
    {
      id: '2',
      type: 'return',
      airline: 'GreenAir',
      route: '上海 (SHA) - 北京 (PEK)',
      dateTime: '2023年10月22日 · 19:15 - 21:30',
      cabin: '经济舱',
      price: 1150
    }
  ];

  // 费用明细
  const fareDetails = [
    { label: '成人票价 x 1', price: 1280 + 1150 },
    { label: '税费', price: 120 },
    { label: '服务费', price: 50 },
    { label: '折扣', price: -100 },
  ];

  // 计算总价
  const totalPrice = fareDetails.reduce((sum, item) => sum + item.price, 0);

  // 处理继续按钮点击
  const handleContinue = () => {
    console.log('准备支付');
    // 这里可以添加导航到支付页面的逻辑
    // navigate('/payment');
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
        <div className="flyme-review-container">
          {/* 面包屑导航 */}
          <div className="flyme-breadcrumb">
            <span className="flyme-breadcrumb-item">搜索</span>
            <span className="flyme-breadcrumb-separator">&gt;</span>
            <span className="flyme-breadcrumb-item">选择航班</span>
            <span className="flyme-breadcrumb-separator">&gt;</span>
            <span className="flyme-breadcrumb-item flyme-breadcrumb-active">确认行程</span>
          </div>

          {/* 页面标题 */}
          <h1 className="flyme-page-title">确认您的行程</h1>

          {/* 航班信息部分 */}
          <div className="flyme-review-sections">
            {/* 航班信息部分 */}
            <div className="flyme-review-section">
              <h2 className="flyme-review-section-title">航班信息</h2>
              
              {/* 去程航班 */}
              <div className="flyme-review-flight-card">
                <div className="flyme-review-flight-airline-indicator"></div>
                <div className="flyme-review-flight-content">
                  <div className="flyme-review-flight-cabin">{flights[0].cabin} | {flights[0].airline}</div>
                  <div className="flyme-review-flight-route">{flights[0].route}</div>
                  <div className="flyme-review-flight-datetime">{flights[0].dateTime}</div>
                </div>
              </div>
              
              {/* 返程航班 */}
              <div className="flyme-review-flight-card">
                <div className="flyme-review-flight-airline-indicator green"></div>
                <div className="flyme-review-flight-content">
                  <div className="flyme-review-flight-cabin">{flights[1].cabin} | {flights[1].airline}</div>
                  <div className="flyme-review-flight-route">{flights[1].route}</div>
                  <div className="flyme-review-flight-datetime">{flights[1].dateTime}</div>
                </div>
              </div>
            </div>

            {/* 价格明细部分 */}
            <div className="flyme-review-section">
              <h2 className="flyme-review-section-title">价格明细</h2>
              
              <div className="flyme-review-fare-card">
                {fareDetails.map((item, index) => (
                  <div key={index} className="flyme-review-fare-item">
                    <span>{item.label}</span>
                    <span>¥{item.price}</span>
                  </div>
                ))}
                
                <div className="flyme-review-fare-divider"></div>
                
                <div className="flyme-review-fare-total">
                  <span>总价</span>
                  <span>¥{totalPrice}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 继续按钮 */}
          <div className="flyme-continue-button-container">
            <button 
              className="flyme-continue-button" 
              onClick={handleContinue}
            >
              继续支付
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FlymeReviewPage;