<template>
  <div id="app">
    <Header />
    <div class="content">
      <Menu v-if="!gameStarted" @startGame="startGame" />
      <div v-if="gameStarted" class="grids">
        <div class="phase">{{ gamePhaseText }}</div>
        <OpponentGrid title="Opponent's Grid" :ships="opponentShips" :showShips="true" />
        <UserGrid title="Player's Grid" :ships="playerShips" @shipPlaced="onShipPlaced" />
      </div>
      <Help />
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import UserGrid from './components/UserGrid.vue';
import OpponentGrid from './components/OpponentGrid.vue';
import Help from './components/Help.vue';
import Menu from './components/Menu.vue';
import axios from 'axios';

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
      ]
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
          return 'User\'s turn';
        case 'opponentTurn':
          return 'Opponent\'s turn';
        default:
          return '';
      }
    }
  },
  methods: {
    async startGame(aiType) {
      this.selectedAi = aiType;
      this.gameStarted = true;

      // Placeholder for calling backend to get opponent's ships
      // In a real app, you would call an endpoint like `shipLocations/opponent`
      try {
        const response = await axios.get('https://example.com/shipLocations/opponent');
        this.opponentShips = response.data; // Assuming the response contains the ship locations
        this.opponentShipsSet = true;
        this.checkPhaseTransition();
      } catch (error) {
        console.error('Failed to fetch opponent ships:', error);
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

      // Placeholder for calling backend to set user ships
      // In a real app, you would call an endpoint like `shipLocations/user`
      axios.post('https://example.com/shipLocations/user', ships)
        .then(() => {
          this.checkPhaseTransition();
        })
        .catch(error => {
          console.error('Failed to set user ships:', error);
        });
    },
    checkPhaseTransition() {
      if (this.playerShipsSet && this.opponentShipsSet) {
        this.gamePhase = 'playerTurn';
      } else if (this.playerShipsSet) {
        this.gamePhase = 'waitingOpponent';
      }
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
</style>
