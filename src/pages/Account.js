import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext

const Account = () => {
  const navigate = useNavigate();
  const { account, logout } = useContext(AuthContext); // Sử dụng context
  const [activeSection, setActiveSection] = useState('general'); // State để quản lý phần nội dung đang hiển thị

  useEffect(() => {
    if (!account) {
      navigate('/login');
    }
  }, [account, navigate]);

  const handleLogout = () => {
    logout(); // Gọi hàm logout từ context
    navigate('/login'); // Điều hướng đến trang đăng nhập
  };

  if (!account) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4 flex">
      <div className="w-1/4 p-4">
        <ul className="space-y-2">
          <li
            className={`text-center p-2 cursor-pointer ${activeSection === 'general' ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveSection('general')}
          >
            Thông tin chung
          </li>
          <li
            className={`text-center p-2 cursor-pointer ${activeSection === 'account' ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveSection('account')}
          >
            Thông tin tài khoản
          </li>
          <li
            className={`text-center p-2 cursor-pointer ${activeSection === 'history' ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveSection('history')}
          >
            Lịch sử giao dịch
          </li>
          <li
            className={`text-center p-2 cursor-pointer ${activeSection === 'tickets' ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveSection('tickets')}
          >
            Vé đã đặt
          </li>
        </ul>
      </div>
      <div className="w-3/4 p-4">
        {activeSection === 'general' && (
          <div>
            <h1 className="text-2xl font-bold mb-4">Thông tin chung</h1>
            <p>Chào mừng bạn đến với trang thông tin tài khoản của bạn.</p>
            <div className="flex justify-center mt-10">
              <button className='bg-red-500 text-white p-3 rounded-lg' onClick={handleLogout}>Đăng xuất</button>
            </div>
          </div>
        )}
        {activeSection === 'account' && (
          <div>
            <h1 className="text-2xl font-bold mb-4">Thông tin tài khoản</h1>
            <p><strong>Email:</strong> {account.EMAIL}</p>
            <p><strong>Tên:</strong> {account.TENKH}</p>
            <p><strong>Số điện thoại:</strong> {account.SDT}</p>
          </div>
        )}
        {activeSection === 'history' && (
          <div>
            <h1 className="text-2xl font-bold mb-4">Lịch sử giao dịch</h1>
            <p>Hiển thị lịch sử giao dịch của bạn ở đây.</p>
          </div>
        )}
        {activeSection === 'tickets' && (
          <div>
            <h1 className="text-2xl font-bold mb-4">Vé đã đặt</h1>
            <p>Hiển thị các vé đã đặt của bạn ở đây.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;