// src/GameApi.js

import axios from 'axios';

const api = axios.create({
  baseURL: 'https://example.com'
});

export const getOpponentShips = async () => {
  try {
    const response = await api.get('/shipLocations/opponent');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch opponent ships:', error);
    throw error;
  }
};

// eslint-disable-next-line no-unused-vars
export const setUserShips = async (ships) => {
  try {
    //await api.post('/shipLocations/user', ships);
  } catch (error) {
    console.error('Failed to set user ships:', error);
    throw error;
  }
};

export const getAIMove = async () => {
  // Placeholder: Randomly generate a position
  return {
    x: Math.floor(Math.random() * 10),
    y: Math.floor(Math.random() * 10)
  };
};

export default {
  getOpponentShips,
  setUserShips,
  getAIMove
};
