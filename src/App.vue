<template>
  <div id="app">
    <Header />
    <div class="content">
      <Menu v-if="!gameStarted" @startGame="startGame" />
      <div v-if="gameStarted" class="grids">
        <div class="phase">{{ gamePhaseText }}</div>
        <OpponentGrid
          title="Opponent's Grid"
          :ships="opponentShips"
          :showShips="gamePhase !== 'placingShips'"
          :shots="playerShots"
          @cellSelected="handleUserShot"
          :disabled="currentPlayer !== 'player'"
          :feedbackMessage="opponentFeedbackMessage"
        />
        <UserGrid
          title="Player's Grid"
          :ships="playerShips"
          :shots="opponentShots"
          @shipPlaced="onShipPlaced"
          :feedbackMessage="playerFeedbackMessage"
        />
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
import Header from './components/Header.vue';
import UserGrid from './components/UserGrid.vue';
import OpponentGrid from './components/OpponentGrid.vue';
import Help from './components/Help.vue';
import Menu from './components/Menu.vue';
import GameApi from './api/GameApi';

//TODO remove once we start using backend for AI moves
const previousShots = [];

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
      availableShips: [
        { size: 5 },
        { size: 4 },
        { size: 3 },
        { size: 2 },
        { size: 1 }
      ],
      currentPlayer: null,
      opponentShots: [],
      playerShots: [],
      winner: null,
      opponentFeedbackMessage: '',
      playerFeedbackMessage: ''
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
    async startGame(aiType) {
      this.selectedAi = aiType;
      this.gameStarted = true;

      // Reset previous shots for a new game
      previousShots.length = 0;

      // Fetch opponent's ships
      try {
        this.opponentShips = await GameApi.getOpponentShips();
        this.opponentShipsSet = true;
        this.checkPhaseTransition();
      } catch (error) {
        // Mock data for now
        this.opponentShips = this.generateMockShips();
        this.opponentShipsSet = true;
        this.checkPhaseTransition();
      }
    },
    onShipPlaced(ships, placedShipSize) {
      this.playerShips = ships;
      this.availableShips = this.availableShips.filter(ship => ship.size !== placedShipSize);
      this.playerShipsSet = this.availableShips.length === 0;

      if (this.playerShipsSet) {
        GameApi.setUserShips(ships)
          .then(() => {
            this.checkPhaseTransition();
          })
          .catch(error => {
            console.error('Failed to set user ships:', error);
          });
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
      const move = await GameApi.getAIMove();
      const hit = this.playerShips.some(ship =>
        ship.coordinates.some(coord => coord.x === move.x && coord.y === move.y)
      );
      this.opponentShots.push({ ...move, hit });
      this.playerFeedbackMessage = hit ? 'Opponent hit!' : 'Opponent missed!';
      this.checkWinCondition();
      if (!this.winner) {
        this.switchTurn();
      }
    },
    handleUserShot(x, y) {
      if (this.currentPlayer !== 'player') return;
      const hit = this.opponentShips.some(ship =>
        ship.coordinates.some(coord => coord.x === x && coord.y === y)
      );
      this.playerShots.push({ x, y, hit });
      this.opponentFeedbackMessage = hit ? 'You hit!' : 'You missed!';
      this.checkWinCondition();
      if (!this.winner) {
        this.switchTurn();
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
    checkWinCondition() {
      const allPlayerShipsSunk = this.playerShips.every(ship =>
        ship.coordinates.every(coord =>
          this.opponentShots.some(shot => shot.x === coord.x && shot.y === coord.y)
        )
      );
      const allOpponentShipsSunk = this.opponentShips.every(ship =>
        ship.coordinates.every(coord =>
          this.playerShots.some(shot => shot.x === coord.x && shot.y === coord.y)
        )
      );
      if (allPlayerShipsSunk) {
        this.winner = 'opponent';
      } else if (allOpponentShipsSunk) {
        this.winner = 'player';
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
      this.availableShips = [
        { size: 5 },
        { size: 4 },
        { size: 3 },
        { size: 2 },
        { size: 1 }
      ];
      this.currentPlayer = null;
      this.opponentShots = [];
      this.playerShots = [];
      this.winner = null;
      this.opponentFeedbackMessage = '';
      this.playerFeedbackMessage = '';
      previousShots.length = 0; // Reset previous shots
    },
    generateMockShips() {
      // Generate mock ship locations for the opponent
      return [
        { size: 5, coordinates: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 3 }, { x: 0, y: 4 }] },
        { size: 4, coordinates: [{ x: 2, y: 2 }, { x: 2, y: 3 }, { x: 2, y: 4 }, { x: 2, y: 5 }] },
        { size: 3, coordinates: [{ x: 5, y: 5 }, { x: 5, y: 6 }, { x: 5, y: 7 }] },
        { size: 2, coordinates: [{ x: 7, y: 8 }, { x: 7, y: 9 }] },
        { size: 1, coordinates: [{ x: 9, y: 0 }] }
      ];
    }
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
.ship-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}
.ship {
  margin: 10px;
  padding: 10px;
  background-color: lightgray;
  border: 1px solid #333;
  cursor: grab;
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