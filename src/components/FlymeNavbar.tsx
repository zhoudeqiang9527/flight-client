import React from 'react';
import { Link } from 'react-router-dom';

// 导入SVG图标
import logoSvg from '../assets/figma/logo.svg';

// 定义导航项接口
interface NavItem {
  id: string;
  label: string;
  path: string;
}

interface FlymeNavbarProps {
  // 当前活动页面
  activePage?: string;
  // 自定义导航项
  navItems?: NavItem[];
  // 是否显示登录按钮
  showLoginButton?: boolean;
}

const FlymeNavbar: React.FC<FlymeNavbarProps> = ({ 
  activePage = 'book',
  navItems = [
    { id: 'book', label: 'Book', path: '/search' },
    { id: 'manage', label: 'Manage', path: '/my-bookings' }
  ],
  showLoginButton = true
}) => {
  return (
    <header className="flyme-header">
      <div className="flyme-logo-container">
        <img src={logoSvg} alt="FlyMe Logo" className="flyme-logo" />
        <span>FlyMe</span>
      </div>
      
      <div className="flyme-nav">
        <div className="flyme-nav-links">
          {navItems.map(item => (
            <Link 
              key={item.id}
              to={item.path} 
              className={`flyme-nav-link ${activePage === item.id ? 'flyme-nav-link-active' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </div>
        {showLoginButton && (
          <Link to="/login" className="flyme-login-btn">Login</Link>
        )}
      </div>
    </header>
  );
};

export default FlymeNavbar;