<!-- src/views/ApplyLogin.vue -->
<script setup>
import axios from 'axios';
import {ref, onMounted,onUnmounted, watch} from 'vue';
import { useRouter } from 'vue-router';

  // 滑鼠事件
let buttonA = ref("background-color: white");
let back = ref("background-color: white");
let ChangeColor=function(){
  back.value="background-color: #AAAAAA; font-weight: bold";
};
let ReturnColor=function(){
   back.value="background-color: white";
};


const records=ref([]);

//建立年份選項
const years=ref(Array.from({length: 2030-1980+1},(v,i)=>1980+i));
const months=ref(Array.from({length: 12},(v,i)=>i+1));
const days=ref(Array.from({length:31}, (v,i)=>i+1));
//預設年月日
const selectyear=ref(years.value[0]);
const selectmonth=ref(months.value[0]);
const selectday=ref(days.value[0]);
//動態調整日期
function updateDays(){
    const maxDays=new Date(selectyear.value,selectmonth.value,0).getDate();
    days.value=Array.from({length: maxDays}, (v,i)=>i+1);
    if(selectday.value>maxDays){
        selectday.value=maxDays;
    }
}
//監聽年月變化
watch([selectyear,selectmonth],updateDays);

//送出表單
const code=ref('');
const price=ref('');
const errorMessage=ref('');

const router=useRouter();
const submitForm= async () =>{
    try{
        const date=`${selectyear.value}-${String(selectmonth.value).padStart(2, '0')}-${String(selectday.value).padStart(2, '0')}`;
        const response=await axios.post("http://localhost:3000/Dividend",{
            date: date,
            code: code.value,
            price: price.value
        })
        alert('表單以成功送出!');

        //重設表單
        code.value='';
        price.value='';
        errorMessage.value='';

        fetchRecords();
        router.push('/ERA');
    }catch(error){
        errorMessage.value='提交失敗，請稍後再試';
        console.error(error);
    }
}

//從後端獲取資料
const fetchRecords =async ()=>{
    try{
        const response=await axios.get('http://localhost:3000/getDividends');
        records.value=response.data.results;
    }catch(error){
        console.error('Failed to fetch getDividends', error);
    }
}

onMounted(()=>{
    fetchRecords();
});

</script>

<template>
    <div class="areaDividend">
        <div class="titleDividend">Dividend</div>
        <div class="forCenterDividend">
            <form @submit.prevent="submitForm">
        <div>年
            <select v-model="selectyear" >
                <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
            </select>
        </div>
        <div>月
            <select v-model="selectmonth">
                <option v-for="month in months" :key="month" :value="month">{{ month }}</option>
            </select>
        </div>
        <div>日
            <select v-model="selectday">
                <option v-for="day in days" :key="day" :value="day">{{ day }}</option>
            </select>
        </div>
        <div>代號<input  v-model="code" required pattern="[a-zA-Z0-9]{3,10}" placeholder="請輸入ETF代碼"/></div>
        <div>股利總額<input  v-model="price" required pattern="\d{1,12}" placeholder="總股利金額，含手續費" /></div>
        <button type="submit">送出</button>
    </form>
        </div>
    </div>


    <div class="areaDRecord">
        <div class="titleDRecord">Dividend Record</div>
        <div class="forCenterDRecord">
            <table>
                <thead>
                    <tr>
                        <th>日期</th>
                        <th>代號</th>
                        <th>股利</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="record in records">
                        <td>{{ record.date.split('T')[0] }}</td>
                        <td>{{ record.code }}</td>
                        <td>{{ record.price }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>


    <router-link to="/" class="back" :style="back" @mouseover="ChangeColor" @mouseleave="ReturnColor">回首頁</router-link>
</template>
  
  <script>
  export default {
    name: 'DividendPage'
  }
</script>

<style scoped>
    .areaDividend{
        background-color: #dddddd;
        width: 20%;
        height: 300px;
        position: relative;
        top: -612px;
        border-style: double;
        border-width: 5px;
    }

    .titleDividend{
        text-align: center;
        line-height: 40px;
        font-size: 24px;
        font-weight: bold;
        background-color: #444444;
        color: white;
        height: 40px;
    }

    .forCenterDividend{
        display: flex;
        flex-direction: column;
        align-items: center;  /* 垂直置中 */
    }

    .areaDRecord{
        background-color: #dddddd;
        width: 20%;
        height: 300px;
        position: relative;
        top: -921px;
        left: 21%;
        border-style: double;
        border-width: 5px;
    }

    .titleDRecord{
        text-align: center;
        line-height: 40px;
        font-size: 24px;
        font-weight: bold;
        background-color: #444444;
        color: white;
        height: 40px;
    }

    .forCenterDRecord{
        display: flex;
        flex-direction: column;
        align-items: center;  /* 垂直置中 */
    }

    .back{
        position: relative;
        left: 40%;
        top: -900px;
        color: inherit;
        text-decoration: none;
        font-size: 24px;
        border-radius: 10px;
        padding: 10px;
        border-style: solid;
    }
</style>