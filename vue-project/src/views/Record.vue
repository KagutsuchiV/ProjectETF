<!-- src/views/ApplyLogin.vue -->
<script setup>
import axios from 'axios';
import {ref, onMounted,onUnmounted} from 'vue';
import { eventBus, eventBusSale } from './eventBus';

// 儲存資料庫的資料
const records =ref([]);
const recordsales=ref([]);

// 從後端獲取資料
const fetchRecords = async()=>{
    try{
        const response =await axios.get('http://localhost:3000/getRecords');
        records.value=response.data.results;
    }catch(error){
        console.error('Failed to fetch records:', error);
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
        </div>

    </div>

    <div class="areaSale">
        <div class="titleSale">ETF Sale Record</div>
        <div class="forCenterSale">
            <table>
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
                    <tr v-for="recordsale in recordsales">
                        <td>{{ recordsale.date.split('T')[0] }}</td>
                        <td>{{ recordsale.code }}</td>
                        <td>{{ recordsale.number }}</td>
                        <td>{{ recordsale.price }}</td>
                        <td>{{ recordsale.revenue }}</td>
                        <td>{{ recordsale.fee }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>

</template>
  
  <script>
  export default {
    name: 'RecordPage'
  }
</script>

<style scoped>
    .areaBuy{
        background-color: #dddddd;
        width: 20%;
        height: 300px;
        position: relative;
        top: -313.5px;
        left: 21%;
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
        height: 300px;
        position: relative;
        top: -623.5px;
        left: 42%;
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
</style>