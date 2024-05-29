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
        <div v-for="cell in row" :key="cell.id" class="cell">{{ cell.label }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Grid',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      rows: Array.from({ length: 10 }, (_, rowIndex) =>
        Array.from({ length: 10 }, (_, cellIndex) => ({
          id: rowIndex * 10 + cellIndex,
          label: ''
        }))
      ),
      rowLabels: 'ABCDEFGHIJ'.split(''),
      columnLabels: Array.from({ length: 10 }, (_, i) => i + 1)
    };
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
.column-label, .row-label {
  background-color: #f0f0f0;
  font-weight: bold;
}
.corner {
  background-color: #f0f0f0;
}
</style>
