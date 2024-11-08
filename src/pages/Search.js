// import React, { useState } from 'react';
// import '../assets/styles/home.css';
// import { useLocation, useNavigate } from 'react-router-dom';

// const Search = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { movies } = location.state || { movies: [] };

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

//   return (
//     <div>
//       <section>
//         <div className="filter-search-box">
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
//           {movies.map(movie => (
//             <div className="card" key={movie.id} onClick={handleButtonClick}>
//               <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="Movie Poster" />
//               <div className="card-content mt-5">
//                 <p className="movie-name">{movie.title}</p>
//                 <button className="buy-ticket-button mt-5">Mua vé</button>
//               </div>
//             </div>
//           ))}
//         </div>
//         <div className="show">
//           <div className="show-bar">
//             <div className="bar"></div>
//           </div>
//           <button>Show more</button>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Search;




import React, { useState, useEffect } from 'react';
import '../assets/styles/home.css';
import { useLocation, useNavigate } from 'react-router-dom';
// import YouTube from 'react-youtube';
import BookingModal from '../components/BookingModal';
import { getMovieByName } from '../services/api';


const SearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  // const [trailer, setTrailer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const searchResults = location?.state?.movies || [];
        setMovies(searchResults);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, [location]);

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

  // Tìm kiếm phim
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchKeyPress = async (event) => {
    if (event.key === 'Enter' && searchQuery.trim() !== '') {
      try {
        setLoading(true);
        const result = await getMovieByName(searchQuery);
        if (result && result.length > 0) {
          setMovies(result);
          navigate('/search', { state: { movies: result } });
        } else {
          alert('Không tìm thấy phim.');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setLoading(false);
        alert('Có lỗi xảy ra khi tìm kiếm.');
      }
    }
  };

  const handleBuyTicketClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div>
      <section>
        <div className="filter-search-box">
          <div className="search-filters">
            <input
              id="searchInput"
              type="text"
              placeholder="Tìm theo tên..."
              value={searchQuery}
              onChange={handleSearchInputChange}
              onKeyPress={handleSearchKeyPress}
              aria-label="Search movies"
            />
            <i className="fa fa-search"></i>
          </div>
          <div className="search-bar">
            <div className="bar"></div>
          </div>
        </div>
        <div className="movie-card-section">
          {loading ? (
            <p>Đang tải dữ liệu...</p>
          ) : (
            movies.length > 0 ? (
              movies.map(movie => (
                <div className="card" key={movie.MAPHIM}>
                  <img onClick={handleButtonClick}
                    src={`${movie.POSTER}`}
                    alt="Movie Poster"
                    // style={{ width: '250px', height: '350px' }}
                  />
                  <div className="card-content">
                    <p onClick={handleButtonClick} className="movie-name">{movie.TENPHIM}</p>
                    <button onClick={handleBuyTicketClick} className="buy-ticket-button">Mua vé</button>
                  </div>
                </div>
              ))
            ) : (
              <p>Không tìm thấy phim phù hợp.</p>
            )
          )}
        </div>
      </section>

      {/* {trailer && (
        <div className="slide_trailer">
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw' }}>
            <YouTube videoId={trailer} opts={{ width: '800', height: '450' }} />
          </div>
        </div>
      )} */}

      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default SearchPage;
