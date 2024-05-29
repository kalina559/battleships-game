<template>
    <div class="menu">
      <h2>Select AI Type</h2>
      <select v-model="selectedAi">
        <option disabled value="">Please select one</option>
        <option>Random</option>
        <option>Minimax</option>
        <option>Reinforcement Learning</option>
      </select>
      <button @click="startGame">Start Game</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Menu',
    data() {
      return {
        selectedAi: ''
      };
    },
    methods: {
      startGame() {
        if (this.selectedAi) {
          this.$emit('startGame', this.selectedAi);
        } else {
          alert('Please select an AI type.');
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .menu {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  select {
    margin: 10px 0;
  }
  button {
    padding: 10px 20px;
  }
  </style>
  