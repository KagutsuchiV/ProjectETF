<!-- src/views/ApplyLogin.vue -->
<script setup>
import axios from 'axios';
import {ref, watch} from 'vue';

// 建立年份選項
const years =ref(Array.from({length: 2030 - 1980 + 1}, (v,i) => 1980 + i));
const months = ref(Array.from({length: 12}, (v,i) => i + 1));
const days= ref(Array.from({length: 31}, (v,i) => i + 1));
// 預設選項中的年月日
const selectYear = ref(years.value[0]);
const selectMonth= ref(months.value[0]);
const selectDay= ref(days.value[0]);
// 動態調整日期選項
function updateDays(){
  const maxDays = new Date(selectYear.value, selectMonth.value, 0).getDate();
  days.value = Array.from({ length: maxDays }, (v, i) => i + 1);
  if (selectDay.value> maxDays){
    selectDay.value = maxDays;
  }
}
// 監聽年月變化
watch([selectYear, selectMonth], updateDays);

</script>

<template>
    <div>
        <form>
            <sus>買</sus><sus>賣</sus>
            <div>年
              <select v-model="selectYear">
                <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
              </select>
            </div>
            <div>月
              <select v-model="selectMonth">
                <option v-for="month in months" :key="month" :value="month">{{ month }}</option>
              </select>
            </div>
            <div>日
              <select v-model="selectDay">
                <option v-for="day in days" :key="month" :value="day">{{ day }}</option>
              </select>
            </div>
            <div>代號<input/></div>
            <div>張數<input/></div>
            <div>價格<input/></div>
            <div>手續費<input/></div>
        </form>
    </div>
</template>
  
  <script>
  export default {
    name: 'MemberPage'
  }
</script>

<style scoped>

</style>