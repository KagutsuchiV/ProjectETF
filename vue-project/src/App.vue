<!-- src/App.vue -->
<template>
    <div id="app">
      <nav>
        <router-link to="/"></router-link>
        <router-link to="/about"></router-link>
      </nav>
      <router-view/>
    </div>
  </template>
  
  <script>
  export default {
    name: 'App'
  }
  </script>
  