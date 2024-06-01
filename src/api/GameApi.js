import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  withCredentials: true, // Include credentials (cookies) with requests
  headers: {
    'Content-Type': 'application/json'
  }
});

let sessionId = null;

function setSessionId(id) {
  sessionId = id;
}

apiClient.interceptors.request.use(config => {
  if (sessionId) {
    config.headers['X-Session-Id'] = sessionId;
  }
  return config;
});

export default {
  setSessionId,
  async getAiTypes() {
    const response = await apiClient.get('/AiType/list');
    return response.data;
  },
  async selectAiType(type) {
    await apiClient.post('/AiType/select', type);
  },
  async updateRules(shipsCanTouch) {
    await apiClient.post('/Rules/update', shipsCanTouch);
  },
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
