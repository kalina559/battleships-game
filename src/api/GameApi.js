// // src/GameApi.js

// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'https://example.com'
// });

// export const getOpponentShips = async () => {
//   try {
//     const response = await api.get('/shipLocations/opponent');
//     return response.data;
//   } catch (error) {
//     console.error('Failed to fetch opponent ships:', error);
//     throw error;
//   }
// };

// // eslint-disable-next-line no-unused-vars
// export const setUserShips = async (ships) => {
//   try {
//     //await api.post('/shipLocations/user', ships);
//   } catch (error) {
//     console.error('Failed to set user ships:', error);
//     throw error;
//   }
// };

// export const getAIMove = async () => {
//   // Placeholder: Randomly generate a position
//   return {
//     x: Math.floor(Math.random() * 10),
//     y: Math.floor(Math.random() * 10)
//   };
// };

// export default {
//   getOpponentShips,
//   setUserShips,
//   getAIMove
// };


// src/GameApi.js

const previousShots = [];

const api = {
  getOpponentShips: async () => {
    // Mocked opponent ships
    return [
      { size: 5, coordinates: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 3 }, { x: 0, y: 4 }] },
      { size: 4, coordinates: [{ x: 2, y: 2 }, { x: 2, y: 3 }, { x: 2, y: 4 }, { x: 2, y: 5 }] },
      { size: 3, coordinates: [{ x: 5, y: 5 }, { x: 5, y: 6 }, { x: 5, y: 7 }] },
      { size: 2, coordinates: [{ x: 7, y: 8 }, { x: 7, y: 9 }] },
      { size: 1, coordinates: [{ x: 9, y: 0 }] }
    ];
  },
  setUserShips: async (ships) => {
    // Mock set user ships
    console.log('User ships set:', ships);
    return;
  },
  getAIMove: async () => {
    let move;
    do {
      move = {
        x: Math.floor(Math.random() * 10),
        y: Math.floor(Math.random() * 10)
      };
    } while (previousShots.some(shot => shot.x === move.x && shot.y === move.y));
    previousShots.push(move);
    return move;
  }
};

export default api;