<template>
  <div id="app">
    <Header />
    <div class="content">
      <Menu v-if="!gameStarted" @startGame="startGame" />
      <div v-if="gameStarted" class="grids">
        <div class="phase">{{ gamePhaseText }}</div>
        <OpponentGrid title="Opponent's Grid" :ships="opponentShips" :showShips=false :shots="playerShots"
          @cellSelected="handleUserShot" :disabled="currentPlayer !== 'player'"
          :feedbackMessage="opponentGridFeedbackMessage" />
        <UserGrid title="Player's Grid" :ships="playerShips" :shots="opponentShots" @shipPlaced="onShipPlaced"
          :feedbackMessage="playerGridFeedbackMessage" />
      </div>
      <Help />
      <div v-if="winner" class="modal">
        <div class="modal-content">
          <p>{{ winnerMessage }}</p>
          <button @click="resetGame">Play Again</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import Header from './components/Header.vue';
import UserGrid from './components/UserGrid.vue';
import OpponentGrid from './components/OpponentGrid.vue';
import Help from './components/Help.vue';
import Menu from './components/Menu.vue';
import GameApi from './api/GameApi';

export default {
  name: 'App',
  components: {
    Header,
    UserGrid,
    OpponentGrid,
    Help,
    Menu
  },
  data() {
    return {
      gameStarted: false,
      selectedAi: null,
      gamePhase: 'placingShips',
      playerShips: [],
      opponentShips: [],
      playerShipsSet: false,
      opponentShipsSet: false,
      currentPlayer: null,
      opponentShots: [],
      playerShots: [],
      winner: null,
      opponentGridFeedbackMessage: '',
      playerGridFeedbackMessage: '',
      sessionId: null
    };
  },
  computed: {
    gamePhaseText() {
      switch (this.gamePhase) {
        case 'placingShips':
          return 'Waiting for user to deploy ships';
        case 'waitingOpponent':
          return 'Waiting for opponent to deploy ships';
        case 'playerTurn':
          return 'Your turn';
        case 'opponentTurn':
          return 'Opponent\'s turn';
        default:
          return '';
      }
    },
    winnerMessage() {
      return this.winner === 'player' ? 'User won!' : 'AI won!';
    }
  },
  methods: {
    generateOrRetrieveSessionId() {
      let sessionId = this.getCookie('sessionId');
      if (!sessionId) {
        sessionId = uuidv4();
        this.setCookie('sessionId', sessionId, 365); // Set cookie to expire in 1 year
      }
      this.sessionId = sessionId;
      GameApi.setSessionId(this.sessionId); // Set the session ID in the API client
    },
    getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    },
    setCookie(name, value, days) {
      const expires = new Date(Date.now() + days * 864e5).toUTCString();
      document.cookie = `${name}=${value}; expires=${expires}; path=/`;
    },
    async startGame(aiType) {
      this.selectedAi = aiType;
      this.gameStarted = true;
      try {
        this.opponentShips = await GameApi.getOpponentShips();
        this.opponentShipsSet = true;
        this.checkPhaseTransition();
      } catch (error) {
        console.error('Failed to get opponent ships:', error);
      }
    },
    async onShipPlaced(ships) {
      this.playerShips = ships;
      this.playerShipsSet = this.playerShips.length === 5;

      if (this.playerShipsSet) {
        try {
          await GameApi.setUserShips(ships);
          this.checkPhaseTransition();
        } catch (error) {
          console.error('Failed to set user ships:', error);
        }
      } else {
        this.checkPhaseTransition();
      }
    },
    checkPhaseTransition() {
      if (this.playerShipsSet && this.opponentShipsSet) {
        this.determineStartingPlayer();
      } else if (this.playerShipsSet) {
        this.gamePhase = 'waitingOpponent';
      } else if (this.opponentShipsSet) {
        this.gamePhase = 'placingShips';
      }
    },
    determineStartingPlayer() {
      const randomStart = Math.random() < 0.5;
      this.currentPlayer = randomStart ? 'player' : 'opponent';
      this.gamePhase = randomStart ? 'playerTurn' : 'opponentTurn';
      if (!randomStart) {
        this.opponentMove();
      }
    },
    async opponentMove() {
      if (this.currentPlayer !== 'opponent') return;
      try {
        const move = await GameApi.opponentShot();
        await this.updateGameState();
        this.playerGridFeedbackMessage = move.isHit ? (move.isSunk ? 'Opponent sunk your ship!' : 'Opponent hit!') : 'Opponent missed!';
      } catch (error) {
        console.error('Failed to get opponent move:', error);
      }
    },
    async handleUserShot(x, y) {
      if (this.currentPlayer !== 'player') return;
      try {
        const move = await GameApi.userShot({ x, y });
        await this.updateGameState();
        this.opponentGridFeedbackMessage = move.isHit ? (move.isSunk ? 'You sunk a ship!' : 'You hit!') : 'You missed!';
      } catch (error) {
        console.error('Failed to handle user shot:', error);
      }
    },
    async updateGameState() {
      try {
        const gameState = await GameApi.getGameState();

        // Update arrays reactively
        this.playerShips.splice(0, this.playerShips.length, ...gameState.userShips);
        this.opponentShips.splice(0, this.opponentShips.length, ...gameState.opponentShips);
        this.playerShots.splice(0, this.playerShots.length, ...gameState.playerShots);
        this.opponentShots.splice(0, this.opponentShots.length, ...gameState.opponentShots);

        this.checkWinCondition(gameState);
        this.switchTurn();
      } catch (error) {
        console.error('Failed to update game state:', error);
      }
    },
    checkWinCondition(gameState) {
      const allPlayerShipsSunk = gameState.userShips.every(ship => ship.isSunk);
      const allOpponentShipsSunk = gameState.opponentShips.every(ship => ship.isSunk);
      if (allPlayerShipsSunk) {
        this.winner = 'opponent';
      } else if (allOpponentShipsSunk) {
        this.winner = 'player';
      }
    },
    switchTurn() {
      this.currentPlayer = this.currentPlayer === 'player' ? 'opponent' : 'player';
      this.gamePhase = this.currentPlayer === 'player' ? 'playerTurn' : 'opponentTurn';
      if (this.currentPlayer === 'opponent') {
        setTimeout(() => {
          this.opponentMove();
        }, 1000);
      }
    },
    randomCoordinate() {
      return Math.floor(Math.random() * 10);
    },
    resetGame() {
      this.gameStarted = false;
      this.selectedAi = null;
      this.gamePhase = 'placingShips';
      this.playerShips = [];
      this.opponentShips = [];
      this.playerShipsSet = false;
      this.opponentShipsSet = false;
      this.currentPlayer = null;
      this.opponentShots = [];
      this.playerShots = [];
      this.winner = null;
      this.opponentGridFeedbackMessage = '';
      this.playerGridFeedbackMessage = '';
    }
  },
  mounted(){
    this.generateOrRetrieveSessionId();
  }
};
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.grids {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.phase {
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: bold;
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border: 1px solid #333;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.modal-content {
  text-align: center;
}
</style>
