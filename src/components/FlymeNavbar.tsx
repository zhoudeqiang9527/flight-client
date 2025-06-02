import React from 'react';
import { Link } from 'react-router-dom';

// 导入SVG图标
import logoSvg from '../assets/figma/logo.svg';

interface FlymeNavbarProps {
  // 可以添加自定义属性，如当前活动页面等
  activePage?: 'book' | 'manage';
}

const FlymeNavbar: React.FC<FlymeNavbarProps> = ({ activePage = 'book' }) => {
  return (
    <header className="flyme-header">
      <div className="flyme-logo-container">
        <img src={logoSvg} alt="FlyMe Logo" className="flyme-logo" />
        <span>FlyMe</span>
      </div>
      
      <div className="flyme-nav">
        <div className="flyme-nav-links">
          <Link 
            to="/search" 
            className={`flyme-nav-link ${activePage === 'book' ? 'flyme-nav-link-active' : ''}`}
          >
            Book
          </Link>
          <Link 
            to="/my-bookings" 
            className={`flyme-nav-link ${activePage === 'manage' ? 'flyme-nav-link-active' : ''}`}
          >
            Manage
          </Link>
        </div>
        <Link to="/login" className="flyme-login-btn">Log in</Link>
      </div>
    </header>
  );
};

export default FlymeNavbar;