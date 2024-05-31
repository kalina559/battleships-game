<template>
  <div class="menu">
    <h2>Select AI Type</h2>
    <div v-if="aiTypes.length">
      <select id="ai-select" v-model="selectedAiType">
        <option disabled value="">Please select one</option>
        <option v-for="aiType in aiTypes" :key="aiType.id" :value="aiType.id">{{ aiType.name }}</option>
      </select>
    </div>
    <button @click="startGame">Start Game</button>
  </div>
</template>


<script>
import GameApi from '../api/GameApi';

export default {
  name: 'Menu',
  data() {
    return {
      aiTypes: [],
      selectedAiType: ""
    };
  },
  async created() {
    try {
      this.aiTypes = await GameApi.getAiTypes();
      console.log(this.aiTypes)
    } catch (error) {
      console.error('Failed to load AI types:', error);
    }
  },
  methods: {
    async startGame() {
      try {
        if (this.selectedAiType) {
          await GameApi.selectAiType(this.selectedAiType);
          this.$emit('startGame', this.selectedAiType);
        } else {
          alert('Please select an AI type.');
        }

      } catch (error) {
        console.error('Failed to select AI type:', error);
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
</style>
