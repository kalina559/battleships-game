<template>
  <div class="menu">
    <h2>{{ $t('selectAiTypeHeader') }}</h2>
    <div v-if="aiTypes.length">
      <select id="ai-select" v-model="selectedAiType">
        <option disabled value=-1>{{ $t('selectAiTypeDefaultOption') }}</option>
        <option v-for="aiType in aiTypes" :key="aiType.type" :value="aiType.type">{{ getDescription(aiType) }}</option>
      </select>
    </div>

    <h2>{{ $t('ShipsCanTouchText') }}</h2>

    <input type="checkbox" id="shipsCanTouch" v-model="shipsCanTouch" @change="onCheckboxChange">

    <h2></h2>
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
      ruleTypes: [],
      selectedAiType: -1,
      shipsCanTouch: false
    };
  },
  async created() {
    this.loadAiTypes();
  },
  methods: {
    async startGame() {
      try {
        if (this.selectedAiType != -1) {
          await GameApi.clearGameState();
          await GameApi.selectAiType(this.selectedAiType);
          await GameApi.updateRules(this.shipsCanTouch);

          this.$emit('startGame', this.selectedAiType, this.shipsCanTouch);
        } else {
          alert(this.$t('selectAiTypeWarning'));
        }

      } catch (error) {
        console.error('Failed to start the game', error);
      }
    },
    async onCheckboxChange() {
      this.loadAiTypes();
    },
    async loadAiTypes() {
      try {
        this.aiTypes = await GameApi.getAiTypes(this.shipsCanTouch);

        if(!this.isSelectedAiTypeValid())
        {
          this.selectedAiType = -1;
        }
      } catch (error) {
        console.error('Failed to load AI types:', error);
      }
    },
    getDescription(aiType) {
      const locale = this.$i18n.locale;
      return aiType.description[locale] || aiType.description['en'];
    },
    isSelectedAiTypeValid() {
      return this.aiTypes.some(aiType => aiType.type === this.selectedAiType);
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
