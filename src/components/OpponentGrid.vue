<template>
  <div class="grid">
    <h2>{{ title }}</h2>
    <div class="grid-container">
      <div class="row">
        <div class="corner"></div>
        <div v-for="label in columnLabels" :key="label" class="column-label">{{ label }}</div>
      </div>
      <div v-for="(row, rowIndex) in rows" :key="rowIndex" class="row">
        <div class="row-label">{{ rowLabels[rowIndex] }}</div>
        <div v-for="cell in row" :key="cell.id" :class="['cell', isShipCell(rowIndex, cell.id) ? 'ship-cell' : '']">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OpponentGrid',
  props: {
    title: {
      type: String,
      required: true
    },
    ships: {
      type: Array,
      default: () => []
    },
    showShips: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // eslint-disable-next-line
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
.grid-container {
  display: grid;
  grid-template-columns: 30px repeat(10, 30px);
  grid-template-rows: 30px repeat(10, 30px);
  gap: 2px;
}
.row {
  display: contents;
}
.cell, .column-label, .row-label {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cell {
  background-color: lightblue;
  border: 1px solid #333;
}
.ship-cell {
  background-color: darkblue;
}
.column-label, .row-label {
  background-color: #f0f0f0;
  font-weight: bold;
}
.corner {
  background-color: #f0f0f0;
}
</style>
