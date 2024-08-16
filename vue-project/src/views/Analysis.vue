<script setup>
import axios from 'axios';
import {ref, onMounted} from 'vue';

const records =ref([]);

// 從後端獲取資料
const fetchRecords= async()=>{
    try{
        const response= await axios.get('http://localhost:3000/getPercentage');
        records= response.data.results;
    }catch(error){
        console.error('fail to fetch getPercentage', error);
    }
}
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
        <tr v-for="record in records">
            <td>{{ record.code }}</td>
            <td>{{ record.percentage }}</td>
        </tr>
    </tbody>
</table>
</template>

<style scoped>
</style>