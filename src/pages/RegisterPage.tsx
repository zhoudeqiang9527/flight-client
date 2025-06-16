import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../flyme.css';
import FlymeNavbar from '../components/FlymeNavbar';
import http from '../services/http';

// 移除未使用的 SVG 图标导入

const RegisterPage: React.FC = () => {
  // 状态管理
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
const navigate = useNavigate();
  // 处理表单提交
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password, firstName, lastName, country, phone });
    // 这里可以添加注册逻辑
    await http.post<CommonResponse>('/api/auth/register', { email, password,firstName,lastName,country,phone });
    navigate('/login');
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
          <div className="flex flex-col items-center flyme-register-container">
            {/* 创建账户标题 */}
            <div className="flyme-register-title-container">
              <h1 className="flyme-register-title">Create your account</h1>
            </div>

            {/* 注册表单 */}
            <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
              {/* 邮箱地址输入框 */}
              <div className="flyme-register-form-group">
                <div className="flyme-register-input-container">
                  <div className="flyme-register-label-container">
                    <label className="flyme-register-label">Email address</label>
                  </div>
                  <div className="flyme-register-input-wrapper">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="flyme-register-input"
                    />
                  </div>
                </div>
              </div>

              {/* 密码输入框 */}
              <div className="flyme-register-form-group">
                <div className="flyme-register-input-container">
                  <div className="flyme-register-label-container">
                    <label className="flyme-register-label">Password</label>
                  </div>
                  <div className="flyme-register-input-wrapper">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create a password"
                      className="flyme-register-input"
                    />
                  </div>
                </div>
              </div>

              {/* 名字输入框 */}
              <div className="flyme-register-form-group">
                <div className="flyme-register-input-container">
                  <div className="flyme-register-label-container">
                    <label className="flyme-register-label">First name</label>
                  </div>
                  <div className="flyme-register-input-wrapper">
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Enter your first name"
                      className="flyme-register-input"
                    />
                  </div>
                </div>
              </div>

              {/* 姓氏输入框 */}
              <div className="flyme-register-form-group">
                <div className="flyme-register-input-container">
                  <div className="flyme-register-label-container">
                    <label className="flyme-register-label">Last name</label>
                  </div>
                  <div className="flyme-register-input-wrapper">
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Enter your last name"
                      className="flyme-register-input"
                    />
                  </div>
                </div>
              </div>

              {/* 国家/地区选择框 */}
              <div className="flyme-register-form-group">
                <div className="flyme-register-input-container">
                  <div className="flyme-register-label-container">
                    <label className="flyme-register-label">Country/Region</label>
                  </div>
                  <div className="flyme-register-input-wrapper">
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="flyme-register-select"
                    >
                      <option value="" disabled>Select your country/region</option>
                      <option value="china">China</option>
                      <option value="usa">United States</option>
                      <option value="uk">United Kingdom</option>
                      <option value="canada">Canada</option>
                      <option value="australia">Australia</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 电话号码输入框 */}
              <div className="flyme-register-form-group">
                <div className="flyme-register-input-container">
                  <div className="flyme-register-label-container">
                    <label className="flyme-register-label">Phone number</label>
                  </div>
                  <div className="flyme-register-input-wrapper">
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Enter your phone number"
                      className="flyme-register-input"
                    />
                  </div>
                </div>
              </div>

              {/* 注册按钮 */}
              <div className="flyme-register-button-container">
                <button
                  type="submit"
                  className="flyme-register-button"
                >
                  <span className="flyme-register-button-text">Register</span>
                </button>
              </div>

              {/* 登录链接 */}
              <div className="flyme-register-login-container">
                <p className="flyme-register-login-text">Already have an account? <Link to="/login" className="text-[#6B7882]">Log in</Link></p>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RegisterPage;