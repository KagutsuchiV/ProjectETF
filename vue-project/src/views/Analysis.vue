<script setup>
import axios from 'axios';
import {ref, onMounted, onUnmounted} from 'vue';

import { eventBusAnalysis } from './eventBus';

const records =ref([]);

// 從後端獲取資料
const fetchRecords= async()=>{
    try{
        const response= await axios.get('http://localhost:3000/SecondServer/getPercentage');
        console.log(response.data); // 添加此行來檢查返回的數據
        console.log(response.data.results);
        records.value= response.data.results;
    }catch(error){
        console.error('fail to fetch getPercentage', error);
    }
}

onMounted(()=>{
    fetchRecords();
    eventBusAnalysis.value.addEventListener('updateAnalysis', fetchRecords);
});

onUnmounted(()=>{
    eventBusAnalysis.value.removeEventListener('updateAnalysis',fetchRecords);
})
</script>

<template>
<div>Analysis</div>
<div>計算你的存股百分比</div>
<table>
    <thead>
        <tr>
            <th>ETF</th>
            <th>百分比</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="record in records" :key="record.code">
            <td>{{ record.code }}</td>
            <td>{{ record.price_percentage }}</td>
        </tr>
    </tbody>
</table>
</template>

<style scoped>
</style>