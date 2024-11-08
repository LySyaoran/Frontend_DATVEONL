import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BookingModal = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedCity, setSelectedCity] = useState('Hồ Chí Minh');
  const [selectedCinema, setSelectedCinema] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [times, setTimes] = useState([]);

  const dates = ['30 Wed', '31 Thu', '01 Fri', '02 Sat', '03 Sun', '04 Mon', '05 Tue'];
  const cities = ['Hồ Chí Minh', 'Hà Nội', 'Đà Nẵng', 'Cần Thơ', 'Đồng Nai'];
  const cinemasByCity = {
    'Hồ Chí Minh': ['CGV Hùng Vương Plaza', 'CGV Menas Mall (CGV CT Plaza)', 'CGV Crescent Mall', 'CGV Pandora City', 'CGV Aeon Tân Phú', 'CGV Thảo Điền Pearl'],
    'Hà Nội': ['CGV Vincom Center Bà Triệu', 'CGV Hồ Gươm Plaza', 'CGV Aeon Long Biên', 'CGV Vincom Nguyễn Chí Thanh', 'CGV Indochina Plaza Hà Nội', 'CGV Rice City', 'CGV Hà Nội Centerpoint', 'CGV Tràng Tiền Plaza', 'CGV Trương Định Plaza'],
    'Đà Nẵng': ['CGV Vĩnh Trung Plaza', 'CGV Vincom Đà Nẵng'],
    'Cần Thơ': ['CGV Sense City Cần Thơ'],
    'Đồng Nai': ['CGV Biên Hòa']
  };
  const timesByCinema = {
    'CGV Hùng Vương Plaza': ['20:30 PM', '21:50 PM', '22:50 PM'],
    'CGV Menas Mall (CGV CT Plaza)': ['20:30 PM', '21:50 PM', '22:50 PM'],
    'CGV Crescent Mall': ['20:30 PM', '21:50 PM', '22:50 PM'],
    'CGV Pandora City': ['20:30 PM', '21:50 PM', '22:50 PM'],
    'CGV Aeon Tân Phú': ['20:30 PM', '21:50 PM', '22:50 PM'],
    'CGV Thảo Điền Pearl': ['20:30 PM', '21:50 PM', '22:50 PM'],
    'CGV Vincom Center Bà Triệu': ['20:30 PM', '21:50 PM', '22:50 PM'],
    'CGV Hồ Gươm Plaza': ['20:30 PM', '21:50 PM', '22:50 PM'],
    'CGV Aeon Long Biên': ['18:30 PM', '20:20 PM', '22:30 PM'],
    'CGV Vincom Nguyễn Chí Thanh': ['20:30 PM', '21:50 PM', '22:50 PM'],
    'CGV Indochina Plaza Hà Nội': ['20:30 PM', '21:50 PM', '22:50 PM'],
    'CGV Rice City': ['20:30 PM', '21:50 PM', '22:50 PM'],
    'CGV Hà Nội Centerpoint': ['20:30 PM', '21:50 PM', '22:50 PM'],
    'CGV Tràng Tiền Plaza': ['20:30 PM', '21:50 PM', '22:50 PM'],
    'CGV Trương Định Plaza': ['20:30 PM', '21:50 PM', '22:50 PM'],
    'CGV Vĩnh Trung Plaza': ['20:30 PM', '21:50 PM', '22:50 PM'],
    'CGV Vincom Đà Nẵng': ['20:30 PM', '21:50 PM', '22:50 PM'],
    'CGV Sense City Cần Thơ': ['20:30 PM', '21:50 PM', '22:50 PM'],
    'CGV Biên Hòa': ['20:30 PM', '21:50 PM', '22:50 PM']
  };

  useEffect(() => {
    if (selectedCinema) {
      setTimes(timesByCinema[selectedCinema]);
    }
  }, [selectedCinema]);

  const handleSubmit = () => {
    console.log('Date:', selectedDate);
    console.log('City:', selectedCity);
    console.log('Cinema:', selectedCinema);
    console.log('Time:', selectedTime);
    onClose();
    navigate('/choose-chart');
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg shadow-lg w-11/12 lg:w-4/5 xl:w-3/5 p-4 md:p-6 relative max-h-[90%] overflow-y-auto">
          <button className="absolute top-2 right-2 text-gray-500" onClick={onClose}>X</button>

          {/* Ngày chiếu */}
          <div className="flex justify-between overflow-x-auto py-2 md:py-2">
            {dates.map((date, index) => (
              <button
                key={index}
                className={`mx-1 md:mx-2 px-3 py-2 md:px-4 md:py-2 border rounded-lg whitespace-nowrap ${selectedDate === date ? 'bg-black text-white' : 'bg-gray-200'}`}
                onClick={() => setSelectedDate(date)}
              >
                {date}
              </button>
            ))}
          </div>
          <hr className="my-2 md:my-4" />

          {/* Địa điểm */}
          <div className="flex justify-start my-4 overflow-x-auto px-4 py-2">
            {cities.map((city, index) => (
              <button
                key={index}
                className={`mx-1 md:mx-2 px-3 py-2 md:px-4 md:py-2 rounded-lg text-center whitespace-nowrap ${selectedCity === city ? 'bg-black text-white' : 'bg-gray-200'}`}
                onClick={() => setSelectedCity(city)}
              >
                {city}
              </button>
            ))}
          </div>
          <hr className="my-2 md:my-4" />

          {/* Rạp */}
          <div className="flex justify-start my-4 overflow-x-auto px-4 py-2">
            {cinemasByCity[selectedCity].map((cinema, index) => (
              <button
                key={index}
                className={`mx-1 md:mx-2 px-3 py-2 md:px-4 md:py-2 rounded-lg text-center whitespace-nowrap ${selectedCinema === cinema ? 'bg-black text-white' : 'bg-gray-200'}`}
                onClick={() => setSelectedCinema(cinema)}
              >
                {cinema}
              </button>
            ))}
          </div>
          <hr className="my-2 md:my-4" />

          {/* Giờ chiếu */}
          <div className="flex justify-center mb-2 md:mb-4 overflow-x-auto py-2">
            {times.map((time, index) => (
              <button
                key={index}
                className={`mx-1 md:mx-2 px-3 py-2 md:px-4 md:py-2 rounded-lg ${selectedTime === time ? 'bg-black text-white' : 'bg-gray-200'}`}
                onClick={() => setSelectedTime(time)}
              >
                {time}
              </button>
            ))}
          </div>

          <div className="flex justify-center">
            <button
              className="bg-blue-500 text-white w-full md:w-auto px-4 py-2 rounded-lg"
              onClick={handleSubmit}
            >
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default BookingModal;
