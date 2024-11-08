// import React, { useEffect, useState } from 'react';
// import '../assets/styles/home.css';
// import { useNavigate } from 'react-router-dom';
// import YouTube from 'react-youtube';
// import BookingModal from '../components/BookingModal';

// const HomePage = () => {
//   const navigate = useNavigate();
//   const [trailer, setTrailer] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     const marker = document.querySelector('.marker');
//     const items = document.querySelectorAll('nav ul li');

//     function indicator(e) {
//       marker.style.left = e.offsetLeft + "px";
//       marker.style.width = e.offsetWidth + "px";
//     }

//     items.forEach(link => {
//       link.addEventListener("click", (e) => {
//         indicator(e.target);
//       });
//     });

//     const nav = document.querySelector('nav');
//     window.addEventListener("scroll", () => {
//       if (window.pageYOffset >= 20) {
//         nav.classList.add('nav');
//       } else {
//         nav.classList.remove('nav');
//       }

//       if (window.pageYOffset >= 700) {
//         nav.classList.add('navBlack');
//       } else {
//         nav.classList.remove('navBlack');
//       }
//     });

//     const menu = document.querySelector('#menu');
//     const menuBx = document.querySelector('#menu-box');
//     let a = true;

//     menu.addEventListener("click", () => {
//       if (a) {
//         menuBx.style.display = "block";
//         menu.classList.replace("fa-bars", "fa-remove");
//         a = false;
//       } else {
//         menuBx.style.display = "none";
//         menu.classList.replace("fa-remove", "fa-bars");
//         a = true;
//       }
//     });

//     const carousels = document.querySelectorAll('.carousel');
//     carousels.forEach(carousel => {
//       let isDown = false;
//       let startX;
//       let scrollLeft;

//       carousel.addEventListener('mousedown', (e) => {
//         isDown = true;
//         carousel.classList.add('active');
//         startX = e.pageX - carousel.offsetLeft;
//         scrollLeft = carousel.scrollLeft;
//       });

//       carousel.addEventListener('mouseleave', () => {
//         isDown = false;
//         carousel.classList.remove('active');
//       });

//       carousel.addEventListener('mouseup', () => {
//         isDown = false;
//         carousel.classList.remove('active');
//       });

//       carousel.addEventListener('mousemove', (e) => {
//         if (!isDown) return;
//         e.preventDefault();
//         const x = e.pageX - carousel.offsetLeft;
//         const walk = (x - startX) * 3; //scroll-fast
//         carousel.scrollLeft = scrollLeft - walk;
//       });

//       // Autoplay
//       let autoPlayInterval;
//       const startAutoPlay = () => {
//         autoPlayInterval = setInterval(() => {
//           carousel.scrollLeft += carousel.offsetWidth;
//           if (carousel.scrollLeft >= carousel.scrollWidth - carousel.offsetWidth) {
//             carousel.scrollLeft = 0;
//           }
//         }, 5000);
//       };

//       const stopAutoPlay = () => {
//         clearInterval(autoPlayInterval);
//       };

//       carousel.addEventListener('mouseenter', stopAutoPlay);
//       carousel.addEventListener('mouseleave', startAutoPlay);

//       startAutoPlay();
//     });

//     return () => {
//       items.forEach(link => {
//         link.removeEventListener("click", indicator);
//       });
//       window.removeEventListener("scroll", () => {});
//       menu.removeEventListener("click", () => {});
//     };
//   }, []);

//   const fetchTrailer = async (movieId) => {
//     try {
//       const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=70cdeab72720dc1a144f4d142a9189c6&language=vn-VN`);
//       const data = await response.json();
//       const trailers = data.results.filter(video => video.type === "Trailer" && video.site === "YouTube");
//       if (trailers.length > 0) {
//         setTrailer(trailers[0].key);
//         document.querySelector('.slide_trailer').style.display = 'block';
//       } else {
//         alert('Không tìm thấy trailer.');
//       }
//     } catch (error) {
//       console.error('Error fetching movie trailer:', error);
//     }
//   };

//   const handleWatchTrailerClick = async () => {
//     const movieName = document.querySelector('.popular-movie-slider-content .movie-name').textContent;
//     try {
//       const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=70cdeab72720dc1a144f4d142a9189c6&language=vn-VN&query=${movieName}&include_adult=false`);
//       const data = await response.json();
//       if (data.results && data.results.length > 0) {
//         const movieId = data.results[0].id;
//         fetchTrailer(movieId);
//       } else {
//         alert('Không tìm thấy phim.');
//       }
//     } catch (error) {
//       console.error('Error fetching movie details:', error);
//     }
//   };

//   const handleReadMoreClick = () => {
//     const movieName = document.querySelector('.popular-movie-slider-content .movie-name').textContent;
//     handleBuyTicketClick(movieName);
//   };

//   const handleBuyTicketClick = async (movieName) => {
//     try {
//       const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=70cdeab72720dc1a144f4d142a9189c6&language=vn-VN&query=${movieName}&include_adult=false`);
//       const data = await response.json();
//       if (data.results && data.results.length > 0) {
//         const movieId = data.results[0].id;
//         navigate(`/movie-detail?id=${movieId}`);
//       } else {
//         alert('Không tìm thấy phim.');
//       }
//     } catch (error) {
//       console.error('Error fetching movie details:', error);
//     }
//   };

//   const handleButtonClick = (event) => {
//     const movieName = event.target.closest('.card').querySelector('.movie-name').textContent;
//     handleBuyTicketClick(movieName);
//   };

//   const handleOutsideClick = (event) => {
//     const slideTrailer = document.querySelector('.slide_trailer');
//     const videoTrailer = document.querySelector('.video_trailer');
//     if (videoTrailer && !videoTrailer.contains(event.target)) {
//       slideTrailer.style.display = 'none';
//       setTrailer(null);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener('click', handleOutsideClick);
//     return () => {
//       document.removeEventListener('click', handleOutsideClick);
//     };
//   }, []);

//   const handleSearchInputChange = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   const handleSearchKeyPress = async (event) => {
//     if (event.key === 'Enter') {
//       try {
//         const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=70cdeab72720dc1a144f4d142a9189c6&language=vn-VN&query=${searchQuery}&include_adult=false`);
//         const data = await response.json();
//         if (data.results && data.results.length > 0) {
//           navigate('/search', { state: { movies: data.results } });
//         } else {
//           alert('Không tìm thấy phim.');
//         }
//       } catch (error) {
//         console.error('Error fetching movie details:', error);
//       }
//     }
//   };

//   const handleBuyTicketClick1 = () => {
//     setIsModalOpen(true);
//   };

//   return (
//     <div>
//       <div className="popular-movie-slider">
//         <img src="https://files.betacorp.vn/media%2fimages%2f2024%2f10%2f09%2fbeta%2D400x633%2D133538%2D091024%2D49.png" className="poster" alt="Poster" />
//         <div className="popular-movie-slider-content">
//           <p className="release">2024</p>
//           <h2 className="movie-name">Cô Dâu hào Môn</h2>
//           <ul className="category">
//             <p>tâm lý</p>
//             <li>drama</li>
//             <li>hài hước</li>
//           </ul>
//           <p className="desc">Phim lấy đề tài làm dâu hào môn và khai thác câu chuyện môn đăng hộ đối, lối sống và quy tắc của giới thượng lưu dưới góc nhìn hài hước và châm biếm..</p>
//           <div className="movie-info">
//             <i className="fa fa-clock-o"> &nbsp;&nbsp;&nbsp;<span>114 phút</span></i>
//             <i className="fa fa-volume-up"> &nbsp;&nbsp;&nbsp;<span>Tiếng Việt</span></i>
//             <i className="fa fa-circle"> &nbsp;&nbsp;&nbsp;<span>Đánh Giá: <b>9.1/10</b></span></i>
//           </div>
//           <div className="movie-btns">
//             <button className="w-50 border-none outline-none py-3.75 rounded-full text-1em bg-red-600 text-white cursor-pointer flex justify-center items-center gap-0.5 hover:bg-black" onClick={handleWatchTrailerClick}>
//               <i className="fa fa-play"></i> &nbsp; Watch trailer
//             </button>
//             <button className="w-50 border-none outline-none py-3.75 rounded-full text-1em bg-red-600 text-white cursor-pointer flex justify-center items-center gap-0.5 read-more hover:bg-black" onClick={handleReadMoreClick}>
//               <i className="fa fa-circle"></i> <i className="fa fa-circle"></i> <i className="fa fa-circle"></i>&nbsp; Chi tiết
//             </button>
//           </div>
//         </div>
//       </div>
//       <section>
//         <div className="filter-search-box">
//           <div className="filters-box">
//             <div className="all-filters filters">
//               Đang chiếu <i className="fa fa-angle-down"></i>
//             </div>
//             <div className="date-filters filters">
//               Sắp chiếu <i className="fa fa-angle-down"></i>
//             </div>
//           </div>
//           <div className="search-filters">
//             <input
//               type="text"
//               placeholder="Tìm theo tên..."
//               value={searchQuery}
//               onChange={handleSearchInputChange}
//               onKeyPress={handleSearchKeyPress}
//             />
//             <i className="fa fa-search"></i>
//           </div>
//           <div className="search-bar">
//             <div className="bar"></div>
//           </div>
//         </div>
//         <div className="movie-card-section">
//           <div className="card">
//             <img  onClick={handleButtonClick} src="https://iguov8nhvyobj.vcdn.cloud/media/catalog/product/cache/1/thumbnail/190x260/2e2b8cd282892c71872b9e67d2cb5039/r/s/rsz_vnm3_intl_online_1080x1350_tsr_01.jpg" alt="Movie Poster" />
//             <div className="card-content">
//               <p  onClick={handleButtonClick} className="movie-name">VENOM: KÈO CUỐI</p>
//               <div className="movie-info">
//               </div>
//               <button  onClick={handleBuyTicketClick1} className="buy-ticket-button">Mua vé</button>
//             </div>
//           </div>
//           <div className="card">
//             <img  onClick={handleButtonClick} src="https://iguov8nhvyobj.vcdn.cloud/media/catalog/product/cache/1/thumbnail/190x260/2e2b8cd282892c71872b9e67d2cb5039/t/f/tf1_intl_allspark_dgtl_online_payoff_keyart_vie_470x700.jpg" alt="Movie Poster" />
//             <div className="card-content">
//               <p  onClick={handleButtonClick} className="movie-name">TRANSFORMERS MỘT</p>
//               <div className="movie-info">
//               </div>
//               <button  onClick={handleBuyTicketClick1} className="buy-ticket-button">Mua vé</button>
//             </div>
//           </div>
//           <div className="card">
//             <img  onClick={handleButtonClick} src="https://iguov8nhvyobj.vcdn.cloud/media/catalog/product/cache/1/thumbnail/190x260/2e2b8cd282892c71872b9e67d2cb5039/2/x/2x3_1_.jpg" alt="Movie Poster" />
//             <div className="card-content">
//               <p  onClick={handleButtonClick} className="movie-name">VÙNG ĐẤT BỊ NGUYỀN RỦA</p>
//               <div className="movie-info">
//               </div>
//               <button  onClick={handleBuyTicketClick1} className="buy-ticket-button">Mua vé</button>
//             </div>
//           </div>
//           <div className="card">
//             <img  onClick={handleButtonClick} src="https://iguov8nhvyobj.vcdn.cloud/media/catalog/product/cache/1/thumbnail/190x260/2e2b8cd282892c71872b9e67d2cb5039/r/s/rsz_ty2-main-poster-printing.jpg" alt="Movie Poster" />
//             <div className="card-content">
//               <p  onClick={handleButtonClick} className="movie-name">TEE YOD: QUỶ ĂN TẠNG 2</p>
//               <div className="movie-info">
//               </div>
//               <button  onClick={handleBuyTicketClick1} className="buy-ticket-button">Mua vé</button>
//             </div>
//           </div>
//           <div className="card">
//             <img  onClick={handleButtonClick} src="https://iguov8nhvyobj.vcdn.cloud/media/catalog/product/cache/1/thumbnail/190x260/2e2b8cd282892c71872b9e67d2cb5039/w/r/wrb_intl1sht_headtouch4_rgb_700x1000.jpg" alt="Movie Poster" />
//             <div className="card-content">
//               <p  onClick={handleButtonClick} className="movie-name">ROBOT HOANG DÃ</p>
//               <div className="movie-info">
//               </div>
//               <button  onClick={handleBuyTicketClick1} className="buy-ticket-button">Mua vé</button>
//             </div>
//           </div>
//           <div className="card">
//             <img  onClick={handleButtonClick} src="https://iguov8nhvyobj.vcdn.cloud/media/catalog/product/cache/1/thumbnail/190x260/2e2b8cd282892c71872b9e67d2cb5039/p/o/poster_tin_hieu_cau_cuu_1.jpg" alt="Movie Poster" />
//             <div className="card-content">
//               <p  onClick={handleButtonClick} className="movie-name">TÍN HIỆU CẦU CỨU</p>
//               <div className="movie-info">
//               </div>
//               <button  onClick={handleBuyTicketClick1} className="buy-ticket-button">Mua vé</button>
//             </div>
//           </div>
//           <div className="card">
//             <img  onClick={handleButtonClick} src="https://iguov8nhvyobj.vcdn.cloud/media/catalog/product/cache/1/thumbnail/190x260/2e2b8cd282892c71872b9e67d2cb5039/4/0/406x600-exit.jpg" alt="Movie Poster" />
//             <div className="card-content">
//               <p  onClick={handleButtonClick} className="movie-name">TRÒ CHƠI NHÂN TÍNH</p>
//               <div className="movie-info">
//               </div>
//               <button  onClick={handleBuyTicketClick1} className="buy-ticket-button">Mua vé</button>
//             </div>
//           </div>
//           <div className="card">
//             <img  onClick={handleButtonClick} src="https://iguov8nhvyobj.vcdn.cloud/media/catalog/product/cache/1/thumbnail/190x260/2e2b8cd282892c71872b9e67d2cb5039/b/i/bi_t_i_hotgirl_-_payoff_poster_-_kc_25102024_1_.jpg" alt="Movie Poster" />
//             <div className="card-content">
//               <p  onClick={handleButtonClick} className="movie-name">BIỆT ĐỘI HOT GIRL</p>
//               <div className="movie-info">
//               </div>
//               <button  onClick={handleBuyTicketClick1} className="buy-ticket-button">Mua vé</button>
//             </div>
//           </div>
//         </div>
//         <div className="show">
//           <div className="show-bar">
//             <div className="bar"></div>
//           </div>
//           <button>Show more</button>
//         </div>
//       </section>
//       <div className="slide_trailer" style={{ display: 'none' }}>
//         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw' }}>
//           {trailer && <YouTube className="video_trailer" videoId={trailer} opts={{ height: '390', width: '640', playerVars: { autoplay: 1 } }} />}
//         </div>
//       </div>
//       <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
//     </div>
//   );
// };

// export default HomePage;

import React, { useEffect, useState } from 'react';
import '../assets/styles/home.css';
import { useNavigate } from 'react-router-dom';
import YouTube from 'react-youtube';
import BookingModal from '../components/BookingModal';
import { getAllMovies, getMovieByName } from '../services/api';

const HomePage = () => {
  const navigate = useNavigate();
  const [trailer, setTrailer] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movies, setMovies] = useState([]);
  // const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getAllMovies();
        setMovies(data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    const marker = document.querySelector('.marker');
    const items = document.querySelectorAll('nav ul li');

    function indicator(e) {
      marker.style.left = e.offsetLeft + "px";
      marker.style.width = e.offsetWidth + "px";
    }

    items.forEach(link => {
      link.addEventListener("click", (e) => {
        indicator(e.target);
      });
    });

    const nav = document.querySelector('nav');
    window.addEventListener("scroll", () => {
      if (window.pageYOffset >= 20) {
        nav.classList.add('nav');
      } else {
        nav.classList.remove('nav');
      }

      if (window.pageYOffset >= 700) {
        nav.classList.add('navBlack');
      } else {
        nav.classList.remove('navBlack');
      }
    });

    const menu = document.querySelector('#menu');
    const menuBx = document.querySelector('#menu-box');
    let a = true;

    menu.addEventListener("click", () => {
      if (a) {
        menuBx.style.display = "block";
        menu.classList.replace("fa-bars", "fa-remove");
        a = false;
      } else {
        menuBx.style.display = "none";
        menu.classList.replace("fa-remove", "fa-bars");
        a = true;
      }
    });

    const carousels = document.querySelectorAll('.carousel');
    carousels.forEach(carousel => {
      let isDown = false;
      let startX;
      let scrollLeft;

      carousel.addEventListener('mousedown', (e) => {
        isDown = true;
        carousel.classList.add('active');
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
      });

      carousel.addEventListener('mouseleave', () => {
        isDown = false;
        carousel.classList.remove('active');
      });

      carousel.addEventListener('mouseup', () => {
        isDown = false;
        carousel.classList.remove('active');
      });

      carousel.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 3; //scroll-fast
        carousel.scrollLeft = scrollLeft - walk;
      });

      // Autoplay
      let autoPlayInterval;
      const startAutoPlay = () => {
        autoPlayInterval = setInterval(() => {
          carousel.scrollLeft += carousel.offsetWidth;
          if (carousel.scrollLeft >= carousel.scrollWidth - carousel.offsetWidth) {
            carousel.scrollLeft = 0;
          }
        }, 5000);
      };

      const stopAutoPlay = () => {
        clearInterval(autoPlayInterval);
      };

      carousel.addEventListener('mouseenter', stopAutoPlay);
      carousel.addEventListener('mouseleave', startAutoPlay);

      startAutoPlay();
    });

    return () => {
      items.forEach(link => {
        link.removeEventListener("click", indicator);
      });
      window.removeEventListener("scroll", () => {});
      menu.removeEventListener("click", () => {});
    };
  }, []);

  const handleWatchTrailerClick = async () => {
    const movieName = document.querySelector('.popular-movie-slider-content .movie-name').textContent;
    try {
      const data = await getMovieByName(movieName);
      if (data && data.length > 0) {
        const IdTrailer = data[0].TRAILER;
        if(IdTrailer.length){
          setTrailer(IdTrailer);
          document.querySelector('.slide_trailer').style.display = 'block';
        }
        else{
          alert('Không tìm thấy trailer.');
        }
      } else {
        alert('Không tìm thấy phim.');
      }
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  const handleReadMoreClick = () => {
    const movieName = document.querySelector('.popular-movie-slider-content .movie-name').textContent;
    handleDetailClick(movieName);
  };

  const handleDetailClick = async (movieName) => {
    try {
      const data = await getMovieByName(movieName);
      if (data && data.length > 0) {
        const maphim = data[0].MAPHIM;
        const id = maphim.slice(12);
        navigate(`/movie-detail?id=${id}`);
      } else {
        alert('Không tìm thấy phim.');
      }
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  const handleButtonClick = (event) => {
    const movieName = event.target.closest('.card').querySelector('.movie-name').textContent;
    handleDetailClick(movieName);
  };

  const handleOutsideClick = (event) => {
    const slideTrailer = document.querySelector('.slide_trailer');
    const videoTrailer = document.querySelector('.video_trailer');
    if (videoTrailer && !videoTrailer.contains(event.target)) {
      slideTrailer.style.display = 'none';
      setTrailer(null);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  // Hàm xử lý thay đổi giá trị trong input tìm kiếm
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Hàm xử lý khi người dùng nhấn phím Enter để tìm kiếm
  const handleSearchKeyPress = async (event) => {
    if (event.key === 'Enter') {
      try {
        const result = await getMovieByName(searchQuery);
        if (result && result.length > 0) {
          // Cập nhật kết quả tìm kiếm vào state
          setMovies(result);
          // Điều hướng đến trang tìm kiếm và truyền kết quả tìm kiếm
          navigate('/search', { state: { movies: result } });
        } else {
          alert('Không tìm thấy phim.');
        }
      } catch (error) {
        console.error('Error fetching movie details:', error);
        alert('Có lỗi xảy ra khi tìm kiếm.');
      }
    }
  };

  const handleBuyTicketClick = () => {
    setIsModalOpen(true);
  };

  const handleUpcomingClick = () => {
    navigate('/upcoming-movie');
  };

  const handleIsShowingClick = () => {
    navigate('/isshowing-movie');
  }

  return (
    <div>
      <div className="popular-movie-slider">
        <img src="https://files.betacorp.vn/media%2fimages%2f2024%2f10%2f09%2fbeta%2D400x633%2D133538%2D091024%2D49.png" className="poster" alt="Poster" />
        <div className="popular-movie-slider-content">
          <p className="release">2024</p>
          <h2 className="movie-name">Cô Dâu hào Môn</h2>
          <ul className="category">
            <p>tâm lý</p>
            <li>drama</li>
            <li>hài hước</li>
          </ul>
          <p className="desc">Phim lấy đề tài làm dâu hào môn và khai thác câu chuyện môn đăng hộ đối, lối sống và quy tắc của giới thượng lưu dưới góc nhìn hài hước và châm biếm..</p>
          <div className="movie-info">
            <i className="fa fa-clock-o"> &nbsp;&nbsp;&nbsp;<span>114 phút</span></i>
            <i className="fa fa-volume-up"> &nbsp;&nbsp;&nbsp;<span>Tiếng Việt</span></i>
            <i className="fa fa-circle"> &nbsp;&nbsp;&nbsp;<span>Đánh Giá: <b>9.1/10</b></span></i>
          </div>
          <div className="movie-btns">
            <button className="w-50 border-none outline-none py-3.75 rounded-full text-1em bg-red-600 text-white cursor-pointer flex justify-center items-center gap-0.5 hover:bg-black" onClick={handleWatchTrailerClick}>
              <i className="fa fa-play"></i> &nbsp; Watch trailer
            </button>
            <button className="w-50 border-none outline-none py-3.75 rounded-full text-1em bg-red-600 text-white cursor-pointer flex justify-center items-center gap-0.5 read-more hover:bg-black" onClick={handleReadMoreClick}>
              <i className="fa fa-circle"></i> <i className="fa fa-circle"></i> <i className="fa fa-circle"></i>&nbsp; Chi tiết
            </button>
          </div>
        </div>
      </div>
      <section>
        <div className="filter-search-box">
          <div className="filters-box">
            <div className="all-filters filters" onClick={handleIsShowingClick}>
              Đang chiếu <i className="fa fa-angle-down"></i>
            </div>
            <div className="date-filters filters" onClick={handleUpcomingClick}>
              Sắp chiếu <i className="fa fa-angle-down"></i>
            </div>
          </div>
          <div className="search-filters">
            <input
              type="text"
              placeholder="Tìm theo tên..."
              value={searchQuery}
              onChange={handleSearchInputChange}
              onKeyPress={handleSearchKeyPress}
            />
            <i className="fa fa-search"></i>
          </div>
          <div className="search-bar">
            <div className="bar"></div>
          </div>
        </div>
        <div className="movie-card-section">
          {movies.map(movie => (
            <div className="card" key={movie.MAPHIM}>
              <img onClick={handleButtonClick} src={`${movie.POSTER}`} alt="Movie Poster" />
              <div className="card-content">
                <p onClick={handleButtonClick} className="movie-name">{movie.TENPHIM}</p>
                <button onClick={handleBuyTicketClick} className="buy-ticket-button">Mua vé</button>
              </div>
            </div>
          ))}
        </div>
        <div className="show">
          <div className="show-bar">
            <div className="bar"></div>
          </div>
          <button>Show more</button>
        </div>
      </section>
      <div className="slide_trailer" style={{ display: 'none' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw' }}>
          {trailer && <YouTube className="video_trailer" videoId={trailer} opts={{ height: '390', width: '640', playerVars: { autoplay: 1 } }} />}
        </div>
      </div>
      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default HomePage;