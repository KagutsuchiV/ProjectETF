<!-- src/views/ApplyLogin.vue -->
<script setup>
import axios from 'axios';
import {ref, watch} from 'vue';
import { useRouter } from 'vue-router';

import { eventBus,eventBusSale,eventBusAnalysis,eventBusPhoto,eventBusAllRevenue } from './eventBus';

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

// 切換買or賣
let Buy = ref("color: red; font-weight: bold; font-size: 36px;");
let Sale = ref("color: black; font-weight: normal; font-size: 24px;");

const mode=ref("buy");
let buttonA=ref("background-color: red");

function modeBuy(){
  Buy.value="color: red; font-weight: bold; font-size: 36px;";
  Sale.value="color: black; font-weight: normal; font-size: 24px;";

  mode.value="buy";
  buttonA.value="background-color: red";
}

function modeSale(){
  Buy.value="color: black; font-weight: normal; font-size: 24px;";
  Sale.value="color: green; font-weight: bold; font-size: 36px;";

  mode.value="sale";
  buttonA.value="background-color: green";
}

// 送出表單
const code=ref('');
const number=ref('');
const price=ref('');
const revenue=ref('');
const fee=ref('');
const errorMessage = ref('');

const router =useRouter();
const submitForm =async () =>{
  try{
    const date = `${selectYear.value}-${String(selectMonth.value).padStart(2, '0')}-${String(selectDay.value).padStart(2, '0')}`;
    if(mode.value==="buy"){
      const ERAresponse = await axios.post("http://localhost:3000/ERAbuy", {
      date: date,
      code: code.value,
      number: number.value,
      price: price.value,
      fee: fee.value
    })
    }else{
      const ERAresponse = await axios.post("http://localhost:3000/ERAsale", {
      date: date,
      code: code.value,
      number: number.value,
      price: price.value,
      revenue: revenue.value,
      fee: fee.value
    })
    }

      // 顯示完成送出的提示視窗
      alert('表單已成功送出！');

      // 重設表單內容
      code.value = '';
      number.value = '';
      price.value = '';
      fee.value = '';
      revenue.value='';
      errorMessage.value = ''; // 重設錯誤訊息

      
      eventBus.value.dispatchEvent(new Event('updateRecords'));
      eventBusSale.value.dispatchEvent(new Event('updateRecordSales'));
      eventBusAnalysis.value.dispatchEvent(new Event('updateAnalysis'));
      // eventBusPhoto.value.dispatchEvent(new Event('updatePhoto'));
      eventBusAllRevenue.value.dispatchEvent(new Event('updateAllRevenue'));
      console.log('updateAnalysis event dispatched');

      router.push('/ERA');

  }catch (error){
    errorMessage.value = '提交失敗，請稍後再試';
    console.error(error);
  }
}
</script>

<template>
    <div class="areaA">
      <div class="titleA">Buy & Sale</div>
      <div class="forCenterA">
        <form @submit.prevent="submitForm">
            <sus>模式:   </sus><sus @click="modeBuy" :style="Buy" class="Buy">買</sus><sus @click="modeSale" :style="Sale" class="Sale">賣</sus>
            <div></div>
            <sus>年 
              <select v-model="selectYear" required>
                <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
              </select>
            </sus>
            <sus>月 
              <select v-model="selectMonth" required>
                <option v-for="month in months" :key="month" :value="month">{{ month }}</option>
              </select>
            </sus>
            <sus>日 
              <select v-model="selectDay" required>
                <option v-for="day in days" :key="day" :value="day">{{ day }}</option>
              </select>
            </sus>
            <div>代號 <input v-model="code" required pattern="[a-zA-Z0-9]{3,10}" placeholder="請輸入ETF代碼" style="border-radius: 5px; margin-top: 10px; height: 20px;"/></div>
            <div>張數 <input v-model="number" required pattern="\d{1,5}" style="border-radius: 5px; margin-top: 10px; height: 20px;"/></div>
            <div>價格 <input v-model="price" required pattern="\d{1,12}" placeholder="單張交易金額，不含手續費" style="border-radius: 5px; margin-top: 10px; height: 20px;"/></div>
            <div v-if="mode=='sale'">收益<input v-model="revenue" required pattern="-?\d{1,12}" placeholder="總收益金額" style="border-radius: 5px; margin-top: 10px; height: 20px;"/></div>
            <div>手續費 <input v-model="fee" required pattern="\d{1,10}" style="border-radius: 5px; margin-top: 10px; height: 20px;"/></div>
            <button type="submit" class="buttonBS" :style="buttonA" style="cursor: pointer; margin-top: 15px;">送出</button>
        </form>
      </div>

    </div>
</template>

<style>
/* 寬度: 1919-1920 */
  @media (max-width: 1910px) {
    .areaA{
        height: 300px !important;
    }
    .forCenterA{
      font-size: 12px;
    }
    .buttonBS{
      position: fixed;
      top: 14%;
      left: 18%;
    }
  }
</style>

<script>
  export default {
    name: 'ERAPage'
  }
</script>
  
<style scoped>
  .areaA{
    background-color: #dddddd;
    width: 20%;
    height: 350px;
    position: relative;
    top: -4px;
    left: 7%;
    border-style: double;
    border-width: 5px;
  }

  .titleA{
    text-align: center;
    line-height: 40px;
    font-size: 24px;
    font-weight: bold;
    background-color: #444444;
    color: white;
    height: 40px;
  }

  .forCenterA{
    display: flex;
    flex-direction: column;
    align-items: center;  /* 垂直置中 */
  }

</style>