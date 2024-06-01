<template>
    <div class="help">
      <h2>{{ $t('helpHeader') }}</h2>
      <p>{{ $t('helpMessage') }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Help'
  };
  </script>
  
  <style scoped>
  .help {
    margin: 20px;
  }
  </style>