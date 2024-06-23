<!-- src/App.vue -->
<template>
    <div id="app">
      <nav>
        <router-link to="/"></router-link>
        <router-link to="/Applylogin"></router-link>
        <router-link to="/Login"></router-link>
      </nav>
      <StockChart />
      <router-view/>
    </div>
  </template>
  
  <script>
  export default {
    name: 'App'

  };
  </script>

<style scoped>
</style>
  