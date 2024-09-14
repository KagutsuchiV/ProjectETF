<script setup>
import axios from 'axios';
import {ref, onMounted, onUnmounted} from 'vue';

import { eventBusAnalysis } from './eventBus';
import {Chart, registerables} from 'chart.js';

// 手動註冊所有必要的控制器、元素、插件等
Chart.register(...registerables);

const records = ref([]);
const chartRef = ref(null); // 圓餅圖的canvas參考
const price = ref('');

const recordRevenues = ref([]);

// 從後端獲取資料
const fetchRecords= async()=>{
    try{
        const response= await axios.get('http://localhost:3000/SecondServer/getPercentage');
        console.log(response.data); // 添加此行來檢查返回的數據
        console.log(response.data.results);
        records.value= response.data.results;

        // 在獲取數據後生成圓餅圖
        createPieChart();
    }catch(error){
        console.error('fail to fetch getPercentage', error);
    }
}

// 提交表單-計算收益
const submitForm = async()=>{
    const CurrentDate=new Date(); //獲得當前的日期與時間
    const FormattedDate=CurrentDate.toISOString().split('T')[0]; //格式化YYYY-MM-DD
    console.log(FormattedDate);
    try{
        const response= await axios.post("http://localhost:3000/SecondServer/revenue",{
            date: FormattedDate,
            price: price.value
        });
        alert('表單已成功送出！');
        console.log('successfully submit', response.data);
    }catch(error){
        console.error('Failed to submit form', error);
    }
}

// 從後端獲取資料-總收益
const fetchRecordsRevenue = async()=>{
    try{
        const response = await axios.get("http://localhost:3000/SecondServer/getRevenue");
        recordRevenues.value=response.data.data;
        console.log('getrevenue');
        console.log(response.data.data);
        console.log(response.data.data.results);
    }catch(error){
        console.error(error);
    }
}

// 創建圓餅圖
const createPieChart = ()=>{
    if (!chartRef.value){
        console.error('canvas element not found!');
        return;
    }

    const ctx = chartRef.value.getContext('2d');

    const data = {
        labels: records.value.map(record => record.code), // ETF code
        datasets : [{
            data: records.value.map(record => record.price_percentage), // 百分比data
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],

        }]
    };

    new Chart(ctx, {
        type: 'pie', // 圓餅圖類型
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,  // 關閉寬高比保持
            plugins: {
                legend: {
                    position: 'top',
                },
            },
        },
    });
};

onMounted(()=>{
    fetchRecords().then(()=>{
        createPieChart(); // 在數據加載完成後生成圓餅圖
    });
    fetchRecordsRevenue();
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

<!-- 添加canvas元素來顯示圓餅圖 -->
 <div>
    <canvas ref="chartRef" width="300" height="300"></canvas>
 </div>

<div>計算你目前的收益</div>
<form @submit.prevent="submitForm">
    <div>目前總價差 <input  v-model="price" required pattern="\d{1,12}" placeholder="" /></div>
    <button type="submit">計算收益</button>
</form>
<div>總收益紀錄</div>
<table>
    <thead>
        <tr>
            <th>日期</th>
            <th>總收益</th>
            <th>總收益百分比</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="recordRevenue in recordRevenues" :key="recordRevenue.code">
            <td>{{ recordRevenue.Selected_date}}</td>
            <td>{{ recordRevenue.total_sum }}</td>
            <td>{{ recordRevenue.ratio }}</td>
        </tr>
    </tbody>
</table>
</template>

<style scoped>
</style>