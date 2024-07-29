<template>
  <div class="menu">
    <div v-if="isLocalEnvironment">
      <h2>{{ $t('selectAiTypeHeader') }}</h2>
      <div v-if="aiTypes.length">
        <select id="ai-select" v-model="selectedAiType" class="responsive-select">
          <option :value="chooseRandomAlgorithm">{{ $t('chooseRandomAlgorithm') }}</option>
          <option v-for="aiType in aiTypes" :key="aiType.type" :value="aiType.type">{{ getDescription(aiType) }}
          </option>
        </select>
      </div>
    </div>

    <h2>{{ $t('ShipsCanTouchText') }}</h2>

    <input type="checkbox" id="shipsCanTouch" v-model="shipsCanTouch" @change="onCheckboxChange">

    <h2></h2>
    <button @click="startGame">{{ $t('startGame') }}</button>
  </div>
</template>


<script>
import GameApi from '../api/GameApi';
// eslint-disable-next-line
const CHOOSE_RANDOM_ALGORITHM = -1;

export default {
  name: 'Menu',
  data() {
    return {
      aiTypes: [],
      ruleTypes: [],
      selectedAiType: CHOOSE_RANDOM_ALGORITHM,
      shipsCanTouch: false,
      environment: process.env.NODE_ENV,
      chooseRandomAlgorithm: CHOOSE_RANDOM_ALGORITHM
    };
  },
  computed: {
    isLocalEnvironment() {
      console.log('env ' + this.environment)
      return this.environment === 'development';
    }
  },
  async created() {
    this.loadAiTypes();
  },
  methods: {
    async startGame() {
      try {
        var aiType = this.selectedAiType;

        if (aiType == CHOOSE_RANDOM_ALGORITHM) {
          var randomIndex = Math.floor(Math.random() * this.aiTypes.length);
          aiType = this.aiTypes[randomIndex].type
          console.log('Randomly selected ' + aiType)
        }

        await GameApi.clearGameState();
        await GameApi.selectAiType(aiType);
        await GameApi.updateRules(this.shipsCanTouch);

        this.$emit('startGame', this.shipsCanTouch);
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

        if (!this.isSelectedAiTypeValid()) {
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

.responsive-select {
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  font-size: 1em;
}
</style>
