import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  withCredentials: true, // Include credentials (cookies) with requests
  headers: {
    'Content-Type': 'application/json'
  }
});

export default {
  async getOpponentShips() {
    const response = await apiClient.get('/ShipLocations/opponent');
    return response.data;
  },
  async setUserShips(shipData) {
    await apiClient.post('/ShipLocations/user', shipData);
  },
  async userShot(position) {
    const response = await apiClient.post('shot/user', position);
    return response.data;
  },
  async opponentShot() {
    const response = await apiClient.post('shot/opponent');
    return response.data;
  },
  async getGameState() {
    const response = await apiClient.get('gamestate/get');
    return response.data;
  },
  async clearGameState() {
    await apiClient.get('gamestate/clear');
  }
};
