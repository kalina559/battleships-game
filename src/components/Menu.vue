<template>
  <div class="menu">
    <h2>{{ $t('selectAiTypeHeader') }}</h2>
    <div v-if="aiTypes.length">
      <select id="ai-select" v-model="selectedAiType">
        <option disabled value=-1>{{ $t('selectAiTypeDefaultOption') }}</option>
        <option v-for="aiType in aiTypes" :key="aiType.id" :value="aiType.id">{{ aiType.name }}</option>
      </select>
    </div>
    <button @click="startGame">{{ $t('startGame') }}</button>
  </div>
</template>


<script>
import GameApi from '../api/GameApi';

export default {
  name: 'Menu',
  data() {
    return {
      aiTypes: [],
      selectedAiType: -1
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
        if (this.selectedAiType != -1) {
          await GameApi.clearGameState();
          await GameApi.selectAiType(this.selectedAiType);
          this.$emit('startGame', this.selectedAiType);
        } else {
          alert(this.$t('selectAiTypeWarning'));
        }

      } catch (error) {
        console.error('Failed to select AI type:', error);
      }
    }
  },
};
</script>

<style scoped>
.menu {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>