<!-- src/views/ApplyLogin.vue -->
<script setup>
import axios from 'axios';
import {ref, onMounted,onUnmounted, computed} from 'vue';
import { eventBus, eventBusSale } from './eventBus';

document.body.style.overflow = 'hidden';

// 儲存資料庫的資料
const records =ref([]);
const recordsales=ref([]);

// 買入分頁設置-當前頁數
const currentPageBuy = ref(1);
const itemsPerPageBuy = 10; // 每頁呈現10筆

// 賣出分頁設置-當前頁數
const currentPageSale = ref(1);
const itemsPerPageSale = 10;

// 從後端獲取資料
const fetchRecords = async()=>{
    try{
        const response =await axios.get('http://localhost:3000/getRecords');
        records.value=response.data.results;
    }catch(error){
        console.error('Failed to fetch records:', error);
    }
};

// 計算顯示的資料 (分頁) buy
const paginatedRecordsBuy = computed(()=>{
    const start = (currentPageBuy.value-1)*itemsPerPageBuy;
    const end = start + itemsPerPageBuy;
    return records.value.slice(start, end);
});

// 計算總頁數 buy
const totalPagesBuy = computed(()=>{
    return Math.ceil(records.value.length / itemsPerPageBuy);
});

// 切換上一頁 buy
const prevPageBuy = () =>{
    if (currentPageBuy.value > 1){
        currentPageBuy.value--;
    }
};

// 切換下一頁 buy
const nextPageBuy = ()=>{
    if(currentPageBuy.value < totalPagesBuy.value){
        currentPageBuy.value++;    
    }
};


const fetchRecordsales =async() =>{
    try{
        const response= await axios.get('http://localhost:3000/getRecordSales');
        recordsales.value=response.data.results;
    }catch(error){
        console.error('Faided to fetch recordsales', error);
    }
}

// 計算顯示的資料 (分頁) sale
const paginatedRecordsSale = computed(()=>{
    const start = (currentPageSale.value-1)*itemsPerPageSale;
    const end = start + itemsPerPageSale;
    console.log(`Start: ${start}, End: ${end}, Current Page: ${currentPageSale.value}`);
    return recordsales.value.slice (start, end);
});

// 計算總頁數 sale
const totalPagesSale = computed(()=>{
    return Math.ceil(recordsales.value.length / itemsPerPageSale);
})

// 切換上一頁 sale
const prevPageSale = ()=>{
    if(currentPageSale.value > 1){
        currentPageSale.value--;
    }
};

// 切換下一頁 sale
const nextPageSale = ()=>{
    if(currentPageSale.value < totalPagesSale.value){
        currentPageSale.value++;
    }
};

onMounted(() => {
  fetchRecords(); // 首次加載數據
  fetchRecordsales();

  // 監聽事件
  eventBus.value.addEventListener('updateRecords', fetchRecords);
  eventBusSale.value.addEventListener('updateRecordSales',fetchRecordsales);
});

onUnmounted(() => {
  // 組件卸載時移除事件監聽器
  eventBus.value.removeEventListener('updateRecords', fetchRecords);
  eventBusSale.value.removeEventListener('updateRecordSales', fetchRecordsales);
});
</script>

<template>
    <div class="areaBuy">
        <div class="titleBuy">ETF Buy Record</div>
        <div class="forCenterBuy">
            <table class="forCenterBuyT">
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
                <tr v-for="record in paginatedRecordsBuy" :key="record.id">
                    <td>{{ record.date.split('T')[0] }}</td>
                    <td>{{ record.code }}</td>
                    <td>{{ record.number }}</td>
                    <td>{{ Math.round(record.price) }}</td>
                    <td>{{ Math.round(record.fee) }}</td>
                </tr>
            </tbody>
        </table>
        </div>
        <button @click="prevPageBuy" :disabled="currentPageBuy===1" style="position: absolute; top: 91%; left: 5%">Prev</button>
        <button @click="nextPageBuy" :disabled="currentPageBuy===totalPagesBuy" style="z-index: 9999; position: absolute; top:91%; left: 82%">Next</button>
        <p style="position: absolute; top: 87%; left: 40%">Page {{ currentPageBuy }} of {{ totalPagesBuy }}</p>
    </div>

    <div class="areaSale">
        <div class="titleSale">ETF Sale Record</div>
        <div class="forCenterSale">
            <table class="forCenterSaleT">
                <thead>
                    <tr>
                        <th>日期</th>
                        <th>代號</th>
                        <th>張數</th>
                        <th>價格</th>
                        <th>收益</th>
                        <th>手續費</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="recordsale in paginatedRecordsSale" :key="recordsale.id">
                        <td>{{ recordsale.date.split('T')[0] }}</td>
                        <td>{{ recordsale.code }}</td>
                        <td>{{ recordsale.number }}</td>
                        <td>{{ Math.round(recordsale.price) }}</td>
                        <td>{{ Math.round(recordsale.revenue) }}</td>
                        <td>{{ Math.round(recordsale.fee) }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <button @click="prevPageSale" :disabled="currentPageSale===1" style="z-index: 9998; position: absolute; top:91%; left: 5%">Prev</button>
        <button @click="nextPageSale" :disabled="currentPageSale===totalPagesSale" style="z-index: 9998; position: absolute; top: 91%; left: 82%">Next</button>
        <p style="position: absolute; top: 87%; left: 40%">Page {{ currentPageSale }} of {{ totalPagesSale }}</p>
    </div>

</template>

<style>
/* 寬度: 1919-1920 */
  @media (max-width: 1910px) {
    .areaBuy{
        height: 300px !important;
        top: -314px !important;
    }
    .forCenterBuyT, .forCenterSaleT{
        font-size: 12px !important;
    }
    .areaSale{
        height: 300px !important;
        top: -624px !important;
    }
  }
</style>

<script>
  export default {
    name: 'RecordPage'
  }
</script>

<style scoped>
    .areaBuy{
        background-color: #dddddd;
        width: 20%;
        height: 350px;
        position: relative;
        top: -364px;
        left: 29%;
        border-style: double;
        border-width: 5px;
    }

    .titleBuy{
        text-align: center;
        line-height: 40px;
        font-size: 24px;
        font-weight: bold;
        background-color: #444444;
        color: white;
        height: 40px;
    }

    .forCenterBuy{
        display: flex;
        flex-direction: column;
        align-items: center;  /* 垂直置中 */        
    }

    .areaSale{
        background-color: #dddddd;
        width: 20%;
        height: 350px;
        position: relative;
        top: -724px;
        left: 51%;
        border-style: double;
        border-width: 5px;
    }

    .titleSale{
        text-align: center;
        line-height: 40px;
        font-size: 24px;
        font-weight: bold;
        background-color: #444444;
        color: white;
        height: 40px;
    }

    .forCenterSale{
        display: flex;
        flex-direction: column;
        align-items: center;  /* 垂直置中 */
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