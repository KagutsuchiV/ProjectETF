<!-- src/views/ApplyLogin.vue -->
<script setup>
import axios from 'axios';
import {ref, onMounted,onUnmounted} from 'vue';
import { eventBus } from './eventBus';

// 儲存資料庫的資料
const records =ref([]);

// 從後端獲取資料
const fetchRecords = async()=>{
    try{
        const response =await axios.get('http://localhost:3000/getRecords');
        records.value=response.data.results;
    }catch(error){
        console.error('Failed to fetch records:', error);
    }
};

onMounted(() => {
  fetchRecords(); // 首次加載數據

  // 監聽事件
  eventBus.value.addEventListener('updateRecords', fetchRecords);
});

onUnmounted(() => {
  // 組件卸載時移除事件監聽器
  eventBus.value.removeEventListener('updateRecords', fetchRecords);
});
</script>

<template>
    <div>ETF record</div>
    <table>
        <thead>
            <tr>
                <th>日期</th>
                <th>代號</th>
                <th>張數</th>
                <th>價格</th>
                <th>手續費</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="record in records">
                <td>{{ record.date.split('T')[0] }}</td>
                <td>{{ record.code }}</td>
                <td>{{ record.number }}</td>
                <td>{{ record.price }}</td>
                <td>{{ record.fee }}</td>
            </tr>
        </tbody>
    </table>

</template>
  
  <script>
  export default {
    name: 'RecordPage'
  }
</script>

<style scoped>

</style>