<template>
  <div id="app">
    <Header />
    <div class="content">
      <div class="language-switcher">
        <span @click="changeLanguage('en')" class="fi fi-gb" :title="$t('englishLanguage')"></span>
        <span @click="changeLanguage('pl')" class="fi fi-pl" :title="$t('polishLanguage')"></span>
      </div>
      <Menu v-if="!gameStarted" @startGame="startGame" />
      <div v-if="gameStarted" class="grids">
        <div class="phase">{{ $t(gamePhaseText) }}</div>
        <OpponentGrid :ships="opponentShips" :showShips=false :shots="playerShots" @cellSelected="handleUserShot"
          :disabled="currentPlayer !== 'player'" :feedbackMessage=$t(opponentGridFeedbackMessage) />
        <UserGrid :ships="playerShips" :shots="opponentShots" @shipPlaced="onShipPlaced"
          :feedbackMessage=$t(playerGridFeedbackMessage) :shipsCanTouch="shipsCanTouch" />
      </div>
      <Help />
      <div v-if="winner" class="modal">
        <div class="modal-content">
          <p>{{ $t(winnerMessage) }}</p>
          <button @click="resetGame">{{ $t('playAgain') }}</button>
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
      opponentGridFeedbackMessage: 'feedbackOpponentPlaceholder',
      playerGridFeedbackMessage: 'feedbackPlayerPlaceholder',
      sessionId: null,
      shipsCanTouch: false
    };
  },
  computed: {
    gamePhaseText() {
      switch (this.gamePhase) {
        case 'placingShips':
          return 'waitingForUserToDeployShips';
        case 'waitingOpponent':
          return 'waitingForOpponentToDeployShips';
        case 'playerTurn':
          return 'yourTurn';
        case 'opponentTurn':
          return 'opponentsTurn';
        default:
          return '';
      }
    },
    winnerMessage() {
      return this.winner === 'player' ? 'userWon' : 'aiWon';
    }
  },
  methods: {
    changeLanguage(lang) {
      this.$i18n.locale = lang;
    },
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
    async startGame(aiType, shipsCanTouch) {
      this.selectedAi = aiType;
      this.gameStarted = true;
      try {
        this.opponentShips = await GameApi.getOpponentShips();
        this.opponentShipsSet = true;
        this.shipsCanTouch = shipsCanTouch
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
        this.playerGridFeedbackMessage = move.isHit ? (move.isSunk ? 'feedbackOpponentSink' : 'feedbackOpponentHit') : 'feedbackOpponentMiss';

        this.checkIfWinner(move, 'opponent');
      } catch (error) {
        console.error('Failed to get opponent move:', error);
      }
    },
    async handleUserShot(x, y) {
      if (this.currentPlayer !== 'player') return;
      try {
        const move = await GameApi.userShot({ x, y });
        await this.updateGameState();
        this.opponentGridFeedbackMessage = move.isHit ? (move.isSunk ? 'feedbackPlayerSink' : 'feedbackPlayerHit') : 'feedbackPlayerMiss';

        this.checkIfWinner(move, 'player');
      } catch (error) {
        console.error('Failed to handle user shot:', error);
      }
    },
    async checkIfWinner(move, side) {
      if(move.win == true){
          this.winner = side;
        } else {
          this.switchTurn();
        }
    },
    async updateGameState() {
      try {
        const gameState = await GameApi.getGameState();

        this.playerShips.splice(0, this.playerShips.length, ...gameState.userShips);
        this.opponentShips.splice(0, this.opponentShips.length, ...gameState.opponentShips);
        this.playerShots.splice(0, this.playerShots.length, ...gameState.playerShots);
        this.opponentShots.splice(0, this.opponentShots.length, ...gameState.opponentShots);
        this.shipsCanTouch = gameState.shipsCanTouch;

      } catch (error) {
        console.error('Failed to update game state:', error);
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
  mounted() {
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

.language-switcher {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

.language-switcher img {
  cursor: pointer;
  margin: 0 10px;
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

.language-switcher .fi {
  margin-right: 8px; /* Add spacing between the span elements */
  width: 32px;
  height: 32px;
  cursor: pointer;
}

.language-switcher .fi:last-child {
  margin-right: 0; /* Remove right margin for the last element */
}
</style>
