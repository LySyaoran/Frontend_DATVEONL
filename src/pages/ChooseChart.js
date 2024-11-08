import React, { useState } from 'react';
import '../assets/styles/chooseChart.css';
import chairImage from '../assets/images/chair.png'; // Hình ảnh ghế thường
import chairImageVip from '../assets/images/chairvip.png'; // Hình ảnh ghế VIP
import chairImageCouple from '../assets/images/chaircouple.png'; // Hình ảnh ghế đôi
import manhinhImage from '../assets/images/manhinh.png'; // Hình ảnh màn hình

const seats = [
    { id: 'A1', type: 'regular', status: 'available' }, { id: 'A2', type: 'regular', status: 'available' }, { id: 'A3', type: 'regular', status: 'available' }, { id: 'A4', type: 'regular', status: 'available' },{ id: 'A5', type: 'regular', status: 'available' }, { id: 'A6', type: 'regular', status: 'available' },{ id: 'A7', type: 'regular', status: 'available' },{ id: 'A8', type: 'regular', status: 'available' }, { id: 'A9', type: 'regular', status: 'available' }, { id: 'A10', type: 'regular', status: 'available' },{ id: 'A11', type: 'regular', status: 'available' },{ id: 'A12', type: 'regular', status: 'available' },
    { id: 'A13', type: 'regular', status: 'available' },{ id: 'A14', type: 'regular', status: 'available' },{ id: 'A15', type: 'regular', status: 'available' },{ id: 'A16', type: 'regular', status: 'available' },{ id: 'A17', type: 'regular', status: 'available' },{ id: 'A18', type: 'regular', status: 'available' },{ id: 'A19', type: 'regular', status: 'available' },{ id: 'A20', type: 'regular', status: 'available' },
    { id: 'B1', type: 'vip', status: 'available' }, { id: 'B2', type: 'vip', status: 'available' }, { id: 'B3', type: 'vip', status: 'available' },  { id: 'B4', type: 'vip', status: 'available' }, { id: 'B5', type: 'vip', status: 'available' }, { id: 'B6', type: 'vip', status: 'available' }, { id: 'B7', type: 'vip', status: 'available' }, { id: 'B8', type: 'vip', status: 'available' }, { id: 'B9', type: 'vip', status: 'available' }, { id: 'B10', type: 'vip', status: 'available' }, 
    { id: 'B11', type: 'vip', status: 'available' }, { id: 'B12', type: 'vip', status: 'available' }, { id: 'B13', type: 'vip', status: 'available' }, { id: 'B14', type: 'vip', status: 'available' }, { id: 'B15', type: 'vip', status: 'available' }, { id: 'B16', type: 'vip', status: 'available' }, { id: 'B17', type: 'vip', status: 'available' }, { id: 'B18', type: 'vip', status: 'available' }, { id: 'B19', type: 'vip', status: 'available' }, { id: 'B20', type: 'vip', status: 'available' },
    { id: 'C1', type: 'couple', status: 'available' }, { id: 'C2', type: 'couple', status: 'available' }, { id: 'C3', type: 'couple', status: 'available' }, { id: 'C4', type: 'couple', status: 'available' }, { id: 'C5', type: 'couple', status: 'available' }, { id: 'C6', type: 'couple', status: 'available' }, { id: 'C7', type: 'couple', status: 'available' }, { id: 'C8', type: 'couple', status: 'available' }, { id: 'C9', type: 'couple', status: 'available' }, { id: 'C10', type: 'couple', status: 'available' },
    { id: 'C11', type: 'couple', status: 'available' }, { id: 'C12', type: 'couple', status: 'available' }, { id: 'C13', type: 'couple', status: 'available' }, { id: 'C14', type: 'couple', status: 'available' }, { id: 'C15', type: 'couple', status: 'available' }, { id: 'C16', type: 'couple', status: 'available' }, { id: 'C17', type: 'couple', status: 'available' }, { id: 'C18', type: 'couple', status: 'available' }, { id: 'C19', type: 'couple', status: 'available' }, { id: 'C20', type: 'couple', status: 'available' }
];

const ChooseChart = () => {
    const [selectedSeats, setSelectedSeats] = useState([]);

    const handleSeatClick = (seatId) => {
        setSelectedSeats(prevSelectedSeats =>
            prevSelectedSeats.includes(seatId)
                ? prevSelectedSeats.filter(id => id !== seatId) // Bỏ chọn ghế
                : [...prevSelectedSeats, seatId] // Chọn ghế
        );
    };

    // Hàm để lấy màu sắc filter dựa trên ghế
    const getFilterColor = (seatId) => {
        if (selectedSeats.includes(seatId)) {
            return 'brightness(0.5) sepia(1) hue-rotate(180deg)'; // Màu sắc mặc định
        }
        return 'none';
    };

    // Hàm để lấy hình ảnh ghế dựa trên loại ghế
    const getChairImage = (type) => {
        switch (type) {
            case 'regular':
                return chairImage; // Ghế thường
            case 'vip':
                return chairImageVip; // Ghế VIP
            case 'couple':
                return chairImageCouple; // Ghế đôi
            default:
                return chairImage; // Mặc định
        }
    };

    // Hàm để lấy giá ghế
    const getSeatPrice = (type) => {
        switch (type) {
            case 'regular':
                return 60000; // Giá ghế thường
            case 'vip':
                return 70000; // Giá ghế VIP
            case 'couple':
                return 100000; // Giá ghế đôi
            default:
                return 0; // Mặc định
        }
    };

    // Tính tổng tiền
    const totalPrice = selectedSeats.reduce((total, seatId) => {
        const seat = seats.find(s => s.id === seatId);
        return total + getSeatPrice(seat.type);
    }, 0);

    return (
        <div className="flex flex-col items-center">
            <img src={manhinhImage} alt="Màn hình" className="w-100 mb-10 mt-20" />
            <div className="grid grid-cols-10 gap-2">
                {seats.map(seat => (
                    <div
                        key={seat.id}
                        onClick={() => handleSeatClick(seat.id)}
                        className={`w-10 h-10 cursor-pointer ${selectedSeats.includes(seat.id) ? 'selected' : ''}`} // Thay đổi kích thước ghế
                        style={{
                            backgroundImage: `url(${getChairImage(seat.type)})`, // Sử dụng hình ảnh ghế phù hợp
                            backgroundSize: 'cover',
                            filter: getFilterColor(seat.id),
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <span className="text-white font-semibold text-xs">{seat.id}</span> {/* Thay đổi kích thước chữ */}
                    </div>
                ))}
            </div>
            <div className="mt-4">
                  <div className="flex flex-row justify-center items-center"> {/* Sử dụng flex-row để căn chỉnh ngang */}
                      <div className="flex flex-row justify-center items-center mx-2"> {/* Thêm margin để tạo khoảng cách giữa các ghế */}
                          <img src={chairImage} alt="Ghế Thường" className="w-10 mb-2" /> {/* Thay đổi kích thước nếu cần */}
                          <label>Ghế Thường</label>
                      </div>
                      <div className="border-l-2 border-gray-400 h-10 mx-2"></div>
                      <div className="flex flex-row justify-center items-center mx-2">
                          <img src={chairImageVip} alt="Ghế VIP" className="w-9 mb-2" />
                          <label>Ghế VIP</label>
                      </div>
                      <div className="border-l-2 border-gray-400 h-10 mx-2"></div>
                      <div className="flex flex-row justify-center items-center mx-2">
                          <img src={chairImageCouple} alt="Ghế Đôi" className="w-14 mb-2" />
                          <label>Ghế Đôi</label>
                      </div>
                  </div>
                  <h3 className="text-lg mt-4 mb-10">Tổng tiền: {totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</h3>
              </div>
        </div>
    );
};

export default ChooseChart;
