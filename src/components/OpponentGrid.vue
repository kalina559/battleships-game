<template>
  <div class="grid">
    <h2>{{ $t('opponentsGrid') }}</h2>
    <div class="feedback" v-if="feedbackMessage">{{ feedbackMessage }}</div>
    <div class="grid-container">
      <div class="row">
        <div class="corner"></div>
        <div v-for="label in columnLabels" :key="label" class="column-label">{{ label }}</div>
      </div>
      <div v-for="(row, rowIndex) in rows" :key="rowIndex" class="row">
        <div class="row-label">{{ rowLabels[rowIndex] }}</div>
        <div v-for="cell in row" :key="cell.id" :class="['cell', getCellClass(rowIndex, cell.id)]"
          @click="selectCell(rowIndex, cell.id)">
          <span v-if="isMissCell(rowIndex, cell.id)" class="miss-marker">X</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OpponentGrid',
  props: {
    ships: {
      type: Array,
      default: () => []
    },
    showShips: {
      type: Boolean,
      default: false
    },
    shots: {
      type: Array,
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: false
    },
    feedbackMessage: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // eslint-disable-next-line no-unused-vars
      rows: Array.from({ length: 10 }, (_, rowIndex) =>
        Array.from({ length: 10 }, (__, cellIndex) => ({
          id: cellIndex,
          label: ''
        }))
      ),
      rowLabels: 'ABCDEFGHIJ'.split(''),
      columnLabels: Array.from({ length: 10 }, (_, i) => i + 1),
    };
  },
  methods: {
    isShipCell(rowIndex, cellIndex) {
      if (!this.showShips) return false;
      return this.ships.some(ship =>
        ship.coordinates.some(coord => coord.x === rowIndex && coord.y === cellIndex)
      );
    },
    getCellClass(rowIndex, cellIndex) {
      const shot = this.shots.find(shot => shot.x === rowIndex && shot.y === cellIndex);
      if (shot) {
        return shot.isHit ? 'hit-cell' : 'miss-cell';
      }
      if (this.isShipCell(rowIndex, cellIndex)) {
        return this.showShips ? 'ship-cell' : '';
      }
      return '';
    },
    isHitCell(rowIndex, cellIndex) {
      return this.shots.some(shot => shot.x === rowIndex && shot.y === cellIndex && shot.isHit);
    },
    isMissCell(rowIndex, cellIndex) {
      const shot = this.shots.find(shot => shot.x === rowIndex && shot.y === cellIndex);
      return shot && !shot.isHit;
    },
    selectCell(rowIndex, cellIndex) {
      if (this.disabled) return;
      if (this.shots.some(shot => shot.x === rowIndex && shot.y === cellIndex)) return;
      this.$emit('cellSelected', rowIndex, cellIndex);
    }
  }
};
</script>

<style scoped>
.grid {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.feedback {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.grid-container {
  display: grid;
  grid-template-columns: 30px repeat(10, 30px);
  grid-template-rows: 30px repeat(10, 30px);
  gap: 2px;
}

.row {
  display: contents;
}

.cell,
.column-label,
.row-label {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cell {
  background-color: lightblue;
  border: 1px solid #333;
  cursor: pointer;
}

.hit-cell {
  background-color: red;
}

.miss-cell {
  background-color: white;
  position: relative;
}

.miss-marker {
  color: black;
  font-size: 24px;
  position: absolute;
}

.ship-cell {
  background-color: darkblue;
}

.column-label,
.row-label {
  background-color: #f0f0f0;
  font-weight: bold;
}

.corner {
  background-color: #f0f0f0;
}
</style>
