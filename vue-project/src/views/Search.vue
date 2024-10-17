<script setup>
import axios from 'axios';
import {ref} from 'vue';
import {onMounted,onUnmounted} from 'vue';

let styles ={
    first: ref("background-color: white"),
    second: ref("background-color: white"),
    third: ref("background-color: white"),
    fourth: ref("background-color: white"),
    fifth: ref("background-color: white"),
    sixth: ref("background-color: white"),
    bonus: ref("background-color: white")
}

let ChangeColor = function(key){
    styles[key].value="background-color: #AAAAAA; font-weight: bold";
}

let ReturnColor = function(key){
    styles[key].value="background-color: white";
}

// 爬蟲six
let sixLighting=ref(false);
let sixAsset=ref([]);
let sixDate=ref([]);
let sixPrice=ref([]);

const fetchsixETF = async() => {
    try{
        const response = await axios.get('http://localhost:3000/FourthServer/sixETF');
        console.log(response.data); // 檢查 API 返回的數據
        sixDate.value=response.data.sixDate;
        sixAsset.value=response.data.sixAsset;
    }catch(error){
        console.error('Faided to fetch sixETF', error);
    };
};

const fetchsixETFPrice = async() =>{
    sixLighting.value = true; 
    try{
        const response= await axios.get(`http://localhost:3000/FourthServer/sixETFPrice`);
        sixPrice.value=response.data.sixPrice;
        console.log("Latest price response:", response.data);
    }catch(error){
        console.error('Faided to fetch sixETF', error);
    }finally{
        setTimeout(() => {
            sixLighting.value = false;
        }, 1000);
    };
}

onMounted(() => {
    fetchsixETF(); // 先立即調用一次
    fetchsixETFPrice();

    const interval = setInterval(() => {
        fetchsixETF();
        fetchsixETFPrice();
    }, 10000); // 每 60 秒調用一次

    // 清除定時器以避免內存泄漏
    onUnmounted(() => {
        clearInterval(interval);
    });
});

</script>

<template>
    <div class="search">
        <div class="hot">六大人氣ETF-排行榜 (Bonus 績優推薦)</div>

        <div class="first">
            <div class="forCenter">
                <div class="media1" style="font-size: 30px; font-weight: bold; padding-bottom: 5px; padding-top: 10px;">0050</div>
                <div class="media11" style="font-size: 24px; font-weight: bold; padding-bottom: 10px;">元大台灣50</div>
                <div style="padding-bottom: 5px;" :style="{ color: sixLighting ? 'red' : 'black', fontWeight: sixLighting ? 'bold' : 'normal' }">成交價: {{ sixPrice[0] }}</div>
                <div style="padding-bottom: 5px;">資產規模: {{ sixAsset[0] ? sixAsset[0].slice(0, -3) : '無效數據'}}百萬</div>
                <div style="padding-bottom: 20px;">成立日: {{ sixDate[0] }}</div>
                <div class="link" :style="styles.first.value" @mouseover="ChangeColor('first')" @mouseleave="ReturnColor('first')"><a href="https://tw.stock.yahoo.com/quote/0050.TW" target="blank">相關連結-外部網站</a></div>
            </div>
        </div>

        <div class="second">
            <div class="forCenter">
                <div class="media2" style="font-size: 30px; font-weight: bold; padding-bottom: 5px; padding-top: 10px;">0056</div>
                <div class="media22" style="font-size: 24px; font-weight: bold; padding-bottom: 10px;">元大高股息</div>
                <div style="padding-bottom: 5px;" :style="{ color: sixLighting ? 'red' : 'black', fontWeight: sixLighting ? 'bold' : 'normal' }">成交價: {{ sixPrice[1] }}</div>
                <div style="padding-bottom: 5px;">資產規模: {{ sixAsset[1] ? sixAsset[1].slice(0, -3) : '無效數據'  }}百萬</div>
                <div style="padding-bottom: 20px;">成立日: {{ sixDate[1] }}</div>
                <div class="link" :style="styles.second.value" @mouseover="ChangeColor('second')" @mouseleave="ReturnColor('second')"><a href="https://tw.stock.yahoo.com/quote/0056.TW" target="blank">相關連結-外部網站</a></div>
            </div>
        </div>
   
        <div class="third">
            <div class="forCenter">
                <div class="media3" style="font-size: 30px; font-weight: bold; padding-bottom: 5px; padding-top: 10px;">00878</div>
                <div class="media33" style="font-size: 24px; font-weight: bold; padding-bottom: 10px;">國泰永續高股息</div>
                <div style="padding-bottom: 5px;" :style="{ color: sixLighting ? 'red' : 'black', fontWeight: sixLighting ? 'bold' : 'normal' }">成交價: {{ sixPrice[2] }}</div>
                <div style="padding-bottom: 5px;">資產規模: {{ sixAsset[2] ? sixAsset[2].slice(0, -3) : '無效數據'  }}百萬</div>
                <div style="padding-bottom: 20px;">成立日: {{ sixDate[2] }}</div>
                <div class="link" :style="styles.third.value" @mouseover="ChangeColor('third')" @mouseleave="ReturnColor('third')"><a href="https://tw.stock.yahoo.com/quote/00878.TW" target="blank">相關連結-外部網站</a></div>
            </div>
        </div>

        <div class="fourth">
            <div class="forCenter">
                <div class="media4" style="font-size: 30px; font-weight: bold; padding-bottom: 5px; padding-top: 10px;">00679B</div>
                <div class="media44" style="font-size: 24px; font-weight: bold; padding-bottom: 10px;">元大美債20年</div>
                <div style="padding-bottom: 5px;" :style="{ color: sixLighting ? 'red' : 'black', fontWeight: sixLighting ? 'bold' : 'normal' }">成交價: {{ sixPrice[3] }}</div>
                <div style="padding-bottom: 5px;">資產規模: {{ sixAsset[3] ? sixAsset[3].slice(0, -3) : '無效數據'  }}百萬</div>
                <div style="padding-bottom: 20px;">成立日: {{ sixDate[3] }}</div>
                <div class="link" :style="styles.fourth.value" @mouseover="ChangeColor('fourth')" @mouseleave="ReturnColor('fourth')"><a href="https://tw.stock.yahoo.com/quote/00679B.TW" target="blank">相關連結-外部網站</a></div>
            </div>
        </div>

        <div class="fifth">
            <div class="forCenter">
                <div class="media5" style="font-size: 30px; font-weight: bold; padding-bottom: 5px; padding-top: 10px;">00929</div>
                <div class="media55" style="font-size: 24px; font-weight: bold; padding-bottom: 10px;">復華台灣科技優息</div>
                <div style="padding-bottom: 5px;" :style="{ color: sixLighting ? 'red' : 'black', fontWeight: sixLighting ? 'bold' : 'normal' }">成交價: {{ sixPrice[4] }}</div>
                <div style="padding-bottom: 5px;">資產規模: {{ sixAsset[4] ? sixAsset[4].slice(0, -3) : '無效數據'  }}百萬</div>
                <div style="padding-bottom: 20px;">成立日: {{ sixDate[4] }}</div>
                <div class="link" :style="styles.fifth.value" @mouseover="ChangeColor('fifth')" @mouseleave="ReturnColor('fifth')"><a href="https://tw.stock.yahoo.com/quote/00929.TW" target="blank">相關連結-外部網站</a></div>
            </div>
        </div>

        <div class="sixth">
            <div class="forCenter">
                <div class="media6" style="font-size: 30px; font-weight: bold; padding-bottom: 5px; padding-top: 10px;">00919</div>
                <div class="media66" style="font-size: 24px; font-weight: bold; padding-bottom: 10px;">群益台灣精選高息</div>
                <div style="padding-bottom: 5px;" :style="{ color: sixLighting ? 'red' : 'black', fontWeight: sixLighting ? 'bold' : 'normal' }">成交價: {{ sixPrice[5] }}</div>
                <div style="padding-bottom: 5px;">資產規模: {{ sixAsset[5] ? sixAsset[5].slice(0, -3) : '無效數據' }}百萬</div>
                <div style="padding-bottom: 20px;">成立日: {{ sixDate[5] }}</div>
                <div class="link" :style="styles.sixth.value" @mouseover="ChangeColor('sixth')" @mouseleave="ReturnColor('sixth')"><a href="https://tw.stock.yahoo.com/quote/00919.TW" target="blank">相關連結-外部網站</a></div>
            </div>
        </div>

        <div class="bonus">
            <div class="forCenter">
                <div class="media7" style="font-size: 30px; font-weight: bold; padding-bottom: 5px; padding-top: 10px; color: red;">★00915★</div>
                <div class="media77" style="font-size: 24px; font-weight: bold; padding-bottom: 10px; color: red">凱基優選高股息30</div>
                <div style="padding-bottom: 5px;" :style="{ color: sixLighting ? 'red' : 'black', fontWeight: sixLighting ? 'bold' : 'normal' }">成交價: {{ sixPrice[6] }}</div>
                <div style="padding-bottom: 5px;">資產規模: {{ sixAsset[6] ? sixAsset[6].slice(0, -3) : '無效數據'  }}百萬</div>
                <div style="padding-bottom: 20px;">成立日: {{ sixDate[6] }}</div>
                <div class="link" :style="styles.bonus.value" @mouseover="ChangeColor('bonus')" @mouseleave="ReturnColor('bonus')"><a href="https://tw.stock.yahoo.com/quote/00915.TW" target="blank">相關連結-外部網站</a></div>
            </div>
        </div>

    </div>
</template>

<style>
/* 寬度: 1919-1920 */
  @media (max-width: 1800px) {
    .first,.second,.third,.fourth,.fifth,.sixth, .bonus {
      font-size: 14px;
    }
    .media1, .media11, .media2, .media22, .media3, .media33, .media4, .media44, .media5, .media55, .media6, .media66, .media7, .media77{
        font-size: 20px !important;
    }
  }
</style>

<style scoped>
    html, body{
        margin: 0;
        padding: 0;
        height: calc(100% - 100000px);  /* 確保頁面高度與視窗一致 */
        overflow: hidden;  
    }    

    .search{
        background-color: #dddddd;
        width: 82%;
        height: 300px;
        position: relative;
        top: -290px;
        border-style: double;
        border-width: 5px;

    }
    
    .hot{
        text-align: center;
        line-height: 60px;
        font-size: 28px;
        font-weight: bold;
        background-color: #444444;
        color: white;
        height: 60px;
    }

    .first{
        position: relative;
        top: 0px;
        left: 0%;
        width: 14%;
        height: 240px;
        border-right: 2px solid black;
    }

    .second{
        position: relative;
        top: -240px;
        left: 14%;
        width: 14%;
        height: 240px;
        border-right: 2px solid black;
    }

    .third{
        position: relative;
        top: -480px;
        left: 28%;
        width: 14%;
        height: 240px;
        border-right: 2px solid black;
    }

    .fourth{
        position: relative;
        top: -720px;
        left: 42%;
        width: 14%;
        height: 240px;
        border-right: 2px solid black;
    }

    .fifth{
        position: relative;
        top: -960px;
        left: 56%;
        width: 14%;
        height: 240px;
        border-right: 2px solid black;
    }

    .sixth{
        position: relative;
        top: -1200px;
        left: 70%;
        width: 14%;
        height: 240px;
        border-right: 6px double black;
    }

    .bonus{
        position: relative;
        top: -1447px;
        left: 84%;
        width: 16%;
        height: 240px;
    }

    .forCenter{
        text-align: center; /* 將文字內容在forCenter中置中 */
    }

    a{
        text-decoration: none;
        color: black;
    }

    .link{
        border-radius: 10px;
        border-style: solid;
        border-width: 1px;
        width: 160px;
        height: 30px;
        display: flex;
        justify-content: center;  /* 水平置中 */
        align-items: center;      /* 垂直置中 */
        margin: 0 auto;
    }
</style>
