import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../flyme.css';
import FlymeNavbar from '../components/FlymeNavbar';
import http from '../services/http';

// 导入SVG图标
import flymeLogoSvg from '../assets/figma/flyme-logo.svg';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  // 状态管理
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // 处理表单提交
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const { data } = await http.post<{ token: string }>('/auth/login', {
        username,
        password
      });
      
      // 保存token并跳转到首页
      localStorage.setItem('token', data.token);
      navigate('/');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flyme-search">
      {/* 使用共通导航栏组件 */}
      <FlymeNavbar 
        navItems={[
          { id: 'book', label: 'Book', path: '/search' },
          { id: 'manage', label: 'Manage', path: '/my-bookings' },
          { id: 'help', label: 'Help', path: '/help' }
        ]}
      />

      {/* 主内容区域 */}
      <main className="flyme-main">
        <div className="flex justify-center items-stretch w-full flyme-content-padding">
          <div className="flex flex-col items-center flyme-login-container">
            {/* 欢迎标题 */}
            <div className="flyme-login-title-container">
              <h1 className="flyme-login-title">Welcome back</h1>
            </div>

            {/* 登录表单 */}
            <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
              {/* 用户名/邮箱输入框 */}
              <div className="flyme-login-form-group">
                <div className="flyme-login-input-container">
                  <div className="flyme-login-label-container">
                    <label className="flyme-login-label">Username or email</label>
                  </div>
                  <div className="flyme-login-input-wrapper">
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter your username or email"
                      className="flyme-login-input"
                    />
                  </div>
                </div>
              </div>

              {/* 密码输入框 */}
              <div className="flyme-login-form-group">
                <div className="flyme-login-input-container">
                  <div className="flyme-login-label-container">
                    <label className="flyme-login-label">Password</label>
                  </div>
                  <div className="flyme-login-input-wrapper">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="flyme-login-input"
                    />
                  </div>
                </div>
              </div>

              {/* 忘记用户名或密码链接 */}
              <div className="flyme-login-forgot-container">
                <Link to="/forgot-password" className="flyme-login-forgot-link">Forgot username or password?</Link>
              </div>

              {/* 错误信息显示 */}
              {error && (
                <div className="flyme-login-error">
                  {error}
                </div>
              )}

              {/* 登录按钮 */}
              <div className="flyme-login-button-container">
                <button
                  type="submit"
                  className="flyme-login-button"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flyme-login-button-loading">Logging in...</span>
                  ) : (
                    <span className="flyme-login-button-text">Log in</span>
                  )}
                </button>
              </div>

              {/* 注册链接 */}
              <div className="flyme-login-signup-container">
                <p className="flyme-login-signup-text">Don't have an account? <Link to="/register" className="text-[#6B7882]">Sign up</Link></p>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;