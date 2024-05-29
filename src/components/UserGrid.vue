<template>
    <div class="grid">
      <h2>{{ title }}</h2>
      <div class="grid-container" @keydown="handleKeydown" tabindex="0">
        <div class="row">
          <div class="corner"></div>
          <div v-for="label in columnLabels" :key="label" class="column-label">{{ label }}</div>
        </div>
        <div v-for="(row, rowIndex) in rows" :key="rowIndex" class="row">
          <div class="row-label">{{ rowLabels[rowIndex] }}</div>
          <div v-for="cell in row" :key="cell.id" :class="['cell', getCellClass(rowIndex, cell.id)]">
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'UserGrid',
    props: {
      title: {
        type: String,
        required: true
      },
      ships: {
        type: Array,
        default: () => []
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
        placedShips: [],
        currentShip: { size: 5, coordinates: [] },
        currentShipDirection: 'horizontal',
        currentShipPosition: { x: 5, y: 5 },
      };
    },
    mounted() {
      this.initCurrentShip();
      this.$el.focus();
    },
    methods: {
      initCurrentShip() {
        this.updateCurrentShipCoordinates();
      },
      handleKeydown(event) {
        const key = event.key;
        switch (key) {
          case 'ArrowUp':
            this.moveShip(-1, 0);
            break;
          case 'ArrowDown':
            this.moveShip(1, 0);
            break;
          case 'ArrowLeft':
            this.moveShip(0, -1);
            break;
          case 'ArrowRight':
            this.moveShip(0, 1);
            break;
          case 'r':
          case 'R':
            this.rotateShip();
            break;
          case 'Enter':
            this.placeShip();
            break;
        }
      },
      moveShip(dx, dy) {
        const newPosition = { x: this.currentShipPosition.x + dx, y: this.currentShipPosition.y + dy };
        this.currentShipPosition = newPosition;
        this.updateCurrentShipCoordinates();
      },
      rotateShip() {
        const newDirection = this.currentShipDirection === 'horizontal' ? 'vertical' : 'horizontal';
        this.currentShipDirection = newDirection;
        this.updateCurrentShipCoordinates();
      },
      isValidPosition(position, size, direction) {
        for (let i = 0; i < size; i++) {
          const x = direction === 'horizontal' ? position.x : position.x + i;
          const y = direction === 'horizontal' ? position.y + i : position.y;
          if (x < 0 || x >= 10 || y < 0 || y >= 10 || this.isOccupied(x, y)) {
            return false;
          }
        }
        return true;
      },
      isOccupied(x, y) {
        return this.placedShips.some(ship =>
          ship.coordinates.some(coord => coord.x === x && coord.y === y)
        );
      },
      updateCurrentShipCoordinates() {
        this.currentShip.coordinates = Array.from({ length: this.currentShip.size }, (_, i) => {
          return this.currentShipDirection === 'horizontal'
            ? { x: this.currentShipPosition.x, y: this.currentShipPosition.y + i }
            : { x: this.currentShipPosition.x + i, y: this.currentShipPosition.y };
        });
      },
      placeShip() {
        if (this.isValidPosition(this.currentShipPosition, this.currentShip.size, this.currentShipDirection)) {
          this.placedShips.push({ ...this.currentShip });
          this.$emit('shipPlaced', this.placedShips, this.currentShip.size);
          this.updateNextShip();
        }
      },
      updateNextShip() {
        if (this.currentShip.size > 1) {
          this.currentShip.size--;
        } else {
          this.currentShip = { size: 0, coordinates: [] }; // No more ships to place
        }
        this.currentShipPosition = { x: 5, y: 5 }; // Reset to middle
        this.updateCurrentShipCoordinates();
      },
      getCellClass(rowIndex, cellIndex) {
        if (this.isShipCell(rowIndex, cellIndex)) {
          return 'ship-cell';
        }
        if (this.isCurrentShipCell(rowIndex, cellIndex)) {
          return this.isValidPosition(this.currentShipPosition, this.currentShip.size, this.currentShipDirection) ? 'valid-ship' : 'invalid-ship';
        }
        return '';
      },
      isShipCell(rowIndex, cellIndex) {
        return this.placedShips.some(ship =>
          ship.coordinates.some(coord => coord.x === rowIndex && coord.y === cellIndex)
        );
      },
      isCurrentShipCell(rowIndex, cellIndex) {
        return this.currentShip.coordinates.some(coord => coord.x === rowIndex && coord.y === cellIndex);
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
  .valid-ship {
    background-color: lightgreen;
  }
  .invalid-ship {
    background-color: lightcoral;
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
  