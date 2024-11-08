import axios from 'axios';

const API_URL = 'http://localhost:5000/api/movies'; // Đường dẫn đến API movies
const API_URL_ACCOUNT = 'http://localhost:5000/api/accounts'; // Đường dẫn đến API movies

// Hàm lấy tất cả các phim
export const getAllMovies = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

// Hàm tạo phim mới
export const createMovie = async (movie) => {
  try {
    const response = await axios.post(API_URL, movie);
    return response.data;
  } catch (error) {
    console.error('Error creating movie:', error);
    throw error;
  }
};

// Hàm cập nhật phim
export const updateMovie = async (id, movie) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, movie);
    return response.data;
  } catch (error) {
    console.error('Error updating movie:', error);
    throw error;
  }
};

// Hàm xóa phim
export const deleteMovie = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting movie:', error);
    throw error;
  }
};

// Hàm tìm phim theo tên
export const getMovieByName = async (name) => {
  try {
    const response = await axios.get(`${API_URL}/search/${encodeURIComponent(name)}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie by name:', error);
    throw error;
  }
};

// Hàm lấy thông tin phim theo ID
export const getOneMovie = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie by id:', error);
    throw error;
  }
};

export const getUpcomingMovies = async () => {
  try {
    const response = await axios.get(`${API_URL}/upcoming`);
    return response.data;
  } catch (error) {
    console.error('Error fetching upcoming movies:', error);
    throw error;
  }
}

export const getIsShowing = async () => {
  try {
    const response = await axios.get(`${API_URL}/isshowing`);
    return response.data;
  } catch (error) {
    console.error('Error fetching is showing movies:', error);
    throw error;
  }
}

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const register = async (account) => {
  try {
    const response = await axios.post(`${API_URL_ACCOUNT}/register`, account);
    return response.data;
  } catch (error) {
    console.error('Error registering:', error);
    throw error;
  }
}