<script setup>
import axios from 'axios';
import {ref, onMounted, onUnmounted, computed, nextTick} from 'vue';

import { eventBusAnalysis, eventBusPhoto, eventBusAllRevenue } from './eventBus';
import {Chart, registerables} from 'chart.js';

// 手動註冊所有必要的控制器、元素、插件等
Chart.register(...registerables);

const records = ref([]);
const chartRef = ref(null); // 圓餅圖的canvas參考
const price = ref('');

const recordRevenues = ref([]);

// 分頁設置-當前頁數
const currentPageAna = ref(1);
const itemsPerPageAna = 10; // 每頁呈現10筆

// 從後端獲取資料
// 重新計算總頁數並檢查當前頁數
const updatePagination = () => {
    const totalPages = Math.ceil(records.value.length / itemsPerPageAna);
    if (currentPageAna.value > totalPages) {
        currentPageAna.value = totalPages; // 防止頁數超過總頁數
    }
};

const fetchRecords = async () => {
    try {
        const response = await axios.get('http://localhost:3000/SecondServer/getPercentage');
        records.value = response.data.results || []; // 確保這是反應性的
        
        // 這裡不需要清空舊數據，直接更新即可
        console.log('Fetched Records:', records.value); // 確認獲取的新數據

        await nextTick(); // 確保 DOM 完全更新
        updatePagination(); // 更新分頁

    } catch (error) {
        console.error('Error fetching records:', error);
    }
};



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

        // 獲取最新的總收益數據
        await fetchRecordsRevenue(); // 確保在這裡獲取數據
    }catch(error){
        console.error('Failed to submit form', error);
    }
}

// 計算顯示的資料 (分頁)
const paginatedRecordsAna = computed(()=>{
    const start = (currentPageAna.value-1)*itemsPerPageAna;
    const end = start + itemsPerPageAna;
    return records.value.slice(start, end);
});

// 計算總頁數 
const totalPagesAna = computed(()=>{
    return Math.ceil(records.value.length / itemsPerPageAna);
});

// 切換上一頁 
const prevPageAna = () =>{
    if (currentPageAna.value > 1){
        currentPageAna.value--;
    }
};

// 切換下一頁 
const nextPageAna = ()=>{
    if(currentPageAna.value < totalPagesAna.value){
        currentPageAna.value++;
    }
};

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
let pieChartInstance;

const createPieChart = ()=>{ 
    if (pieChartInstance) {
        pieChartInstance.destroy(); // 銷毀舊的圖表實例
    }

    if (!chartRef.value){
        console.error('canvas element not found!');
        return;
    }

    const ctx = chartRef.value.getContext('2d');

    const data = {
        labels: records.value.map(record => record.code), // ETF code
        datasets : [{
            data: records.value.map(record => record.price_percentage), // 百分比data
            backgroundColor: [
                '#FF6384', // 顏色 1
                '#36A2EB', // 顏色 2
                '#FFCE56', // 顏色 3
                '#4BC0C0', // 顏色 4
                '#9966FF', // 顏色 5
                '#FF9F40', // 顏色 6
                '#4BC0C0', // 顏色 7
                '#FF6384', // 顏色 8
                '#36A2EB', // 顏色 9
                '#FFCE56'  // 顏色 10
            ],
        }]
    };

    pieChartInstance=new Chart(ctx, {
        type: 'pie', // 圓餅圖類型
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,  // 關閉寬高比保持
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                display: true,    // 顯示標題
                text: '存股百分比圓餅圖 (成本)',  // 設定標題文字
                font: {
                    size: 18      // 設定標題文字大小
                },
                padding: {
                    top: 0,
                    bottom: 0
                },
                margin: {
                    bottom: 10
                }
            }
            },
        },
    });
};

onMounted(async () => {
    await fetchRecords(); // 確保資料加載完畢
    createPieChart(); // 繪製圖表
    await fetchRecordsRevenue(); // 獲取收益紀錄

    // 監聽分析更新事件
    eventBusAnalysis.value.addEventListener('updateAnalysis', async () => {
        console.log('Update Analysis Event Triggered'); // 確認事件被觸發
        await fetchRecords(); // 獲取最新數據
        console.log('Fetched Records:', records.value); // 檢查是否成功更新
        updatePagination(); // 確保頁面數據更新
        createPieChart(); // 重新繪製圖表  
    });

    // 監聽所有收益更新事件
    eventBusAllRevenue.value.addEventListener('updateAllRevenue', async () => {
        console.log('Update All Revenue Event Triggered'); // 確認事件被觸發
        await fetchRecordsRevenue();
    });
});


</script>

<template>
    <!-- <div class="areaAnalysis">
        <div class="titleAnalysis">計算你的存股百分比 (成本)</div>
        <div class="forCenterAnalysis">
            <table>
                <thead>
                    <tr>
                        <th>ETF</th>
                        <th>百分比 (%)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="record in paginatedRecordsAna" :key="record.code">
                        <td>{{ record.code }}</td>
                        <td>{{ Number(record.price_percentage).toFixed(2) }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <button @click="prevPageAna" :disabled="currentPageAna===1" style="position: absolute; top: 320px; left: 10px; z-index: 9995;">Prev</button>
        <button @click="nextPageAna" :disabled="currentPageAna===totalPagesAna" style="position: absolute; top: 320px; left: 300px; z-index: 9994;">Next</button>
        <p style="position: absolute; top: 305px; left: 150px">Page {{ currentPageAna }} of {{ totalPagesAna }}</p>
    </div> -->


<!-- 添加canvas元素來顯示圓餅圖 -->
 <div>
    <canvas ref="chartRef" width="300" height="300" class="photo"></canvas>
 </div>


<div class="areaR">
    <div class="titleR">計算你目前的收益</div>
    <div class="forCenterR">
        <form @submit.prevent="submitForm">
            <div style="margin-top: 40px;">目前總價差 <input  v-model="price" required pattern="\d{1,12}" placeholder="" /></div>
            <button type="submit" style="margin-top: 10px;">計算收益</button>
        </form>
        <div style="margin-top: 20px;" class="titleAR">總收益紀錄</div>
        <table>
            <thead>
                <tr>
                    <th>日期</th>
                    <th>總收益</th>
                    <!-- <th>總收益百分比</th> -->
                </tr>
            </thead>
            <tbody>
                <tr v-for="recordRevenue in recordRevenues" :key="recordRevenue.code">
                    <td>{{ recordRevenue.Selected_date.split('T')[0]}}</td>
                    <td>{{ Math.round(recordRevenue.total_sum) }}</td>
                    <!-- <td>{{ Number(recordRevenue.ratio).toFixed(2) }}</td> -->
                </tr>
            </tbody>
        </table>
    </div>
</div>


</template>

<style scoped>
    .areaAnalysis{
        background-color: #dddddd;
        width: 20%;
        height: 350px;
        position: relative;
        top: -1452px;
        left: 51%;
        border-style: double;
        border-width: 5px;
    }

    .titleAnalysis{
        text-align: center;
        line-height: 40px;
        font-size: 24px;
        font-weight: bold;
        background-color: #444444;
        color: white;
        height: 40px;
    }

    .forCenterAnalysis{
        display: flex;
        flex-direction: column;
        align-items: center;  /* 垂直置中 */
    }

    .areaR{
        background-color: #dddddd;
        width: 20%;
        height: 350px;
        position: relative;
        top: -1753px;
        left: 51%;
        border-style: double;
        border-width: 5px;
    }

    .titleR{
        text-align: center;
        line-height: 40px;
        font-size: 24px;
        font-weight: bold;
        background-color: #444444;
        color: white;
        height: 40px;
    }

    .forCenterR{
        display: flex;
        flex-direction: column;
        align-items: center;  /* 垂直置中 */
    }

    .titleAR{
        text-align: center;
        line-height: 40px;
        font-size: 24px;
        font-weight: bold;
        background-color: #444444;
        color: white;
        height: 40px;
        width: 100%;        
    }

    .photo{
        position: relative;
        top: -1655px;
        left: 650px;

    }

    table {
        border-collapse: collapse; /* 避免重複邊框 */
        width: 100%; /* 可根據需求設定寬度 */
    }

    th, td {
        border: 1px solid black; /* 設定表格框線 */
        padding: 2px; /* 設定表格內邊距 */
        text-align: center; /* 調整文字對齊方式，可選 */
    }

    th {
        background-color: #f2f2f2; /* 可選，設置表頭背景色 */
    } 
</style>