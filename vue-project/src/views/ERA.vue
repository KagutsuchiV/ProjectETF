<!-- src/views/ApplyLogin.vue -->
<script setup>
import axios from 'axios';
import {ref} from 'vue';
import BuySaleComp from './BuySale.vue'
import RecordComp from './Record.vue';
import DividendComp from './Dividend.vue';
import AnalysisComp from './Analysis.vue';
</script>

<template>
    <h1 class="TOP">ERA</h1>
    <BuySaleComp></BuySaleComp>
    <RecordComp></RecordComp>
    <DividendComp></DividendComp>
    <AnalysisComp></AnalysisComp>
</template>
  
  <script>

</script>
  
<style scoped>
  .TOP{
    background-color: #dddddd; 
      border-style: double;
      border-width: 5px;
      font-size: 32px;
      display: flex;
      align-items: center;
      margin-top: 0px;
      align-items: center;  /* 垂直置中 */
      justify-content: center;  /* 水平置中 */
      padding: 5px;
  }
</style>