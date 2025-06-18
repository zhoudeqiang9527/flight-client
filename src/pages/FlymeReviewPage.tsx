import React, { useEffect, useState } from 'react';
// 移除未使用的导入
import '../flyme.css';

// 导入组件
import FlymeNavbar from '../components/FlymeNavbar';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import http from '../services/http';



const FlymeReviewPage: React.FC = () => {
  
  const [flights, setFlights] = useState<Flight[]>([]);
 
  // 费用明细
  const [priceDetails, setPriceDetails] = useState<PriceDetail[]>([]);

  
  useEffect(()=>{
    const location = useLocation();
  
    // 使用 URLSearchParams 解析查询字符串
    const searchParams = new URLSearchParams(location.search);
    const flightNo = searchParams.get('flightNo');
    const fetchFlights = async () => {
        const response = await http.get<FlgihtResponse>('/flights/'+flightNo);
        const data = response.data;
        setFlights(data);
        setPriceDetails([
            {label: '机票', price: (data[0].price - 90)},
            {label: '机场建设费', price: 50},
            {label: '燃油费', price: 40}
    ])

    };
    fetchFlights();
    

  },[]);
  
  
  

  // 处理继续按钮点击
  const handleContinue = () => {
    //弹出窗口，显示支付功能暂不支持
    alert('支付功能暂不支持');
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
              
            </div>

            {/* 价格明细部分 */}
            <div className="flyme-review-section">
              <h2 className="flyme-review-section-title">价格明细</h2>
              
              <div className="flyme-review-fare-card">
                {priceDetails.map((item, index) => (
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