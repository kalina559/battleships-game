<template>
  <div id="app">
    <Header />
    <div class="content">
      <Menu v-if="!gameStarted" @startGame="startGame" />
      <div v-if="gameStarted" class="grids">
        <Grid title="Opponent's Grid" />
        <Grid title="Player's Grid" />
      </div>
      <Rules />
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Grid from './components/Grid.vue';
import Rules from './components/Rules.vue';
import Menu from './components/Menu.vue';

export default {
  name: 'App',
  components: {
    Header,
    Grid,
    Rules,
    Menu
  },
  data() {
    return {
      gameStarted: false,
      selectedAi: null
    };
  },
  methods: {
    startGame(aiType) {
      this.selectedAi = aiType;
      this.gameStarted = true;
      // Here you would also initialize the game state and make API calls if needed.
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.grids {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}
</style>
