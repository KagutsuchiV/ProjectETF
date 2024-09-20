<script setup>
import {ref} from 'vue';

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
</script>

<template>
    <div class="search">
        <div class="hot">人氣ETF-排行榜-2024.09.17</div>

        <div class="first">
            <div class="forCenter">
                <div style="font-size: 30px; font-weight: bold; padding-bottom: 5px; padding-top: 10px;">0050</div>
                <div style="font-size: 24px; font-weight: bold; padding-bottom: 10px;">元大台灣50</div>
                <div style="padding-bottom: 5px;">成交價: 178.75</div>
                <div style="padding-bottom: 5px;">資產規模: 395,428.00百萬</div>
                <div style="padding-bottom: 20px;">成立日: 2017/01/11</div>
                <div class="link" :style="styles.first.value" @mouseover="ChangeColor('first')" @mouseleave="ReturnColor('first')"><a href="https://tw.stock.yahoo.com/quote/0050.TW" target="blank">相關連結-外部網站</a></div>
            </div>
        </div>

        <div class="second">
            <div class="forCenter">
                <div style="font-size: 30px; font-weight: bold; padding-bottom: 5px; padding-top: 10px;">00878</div>
                <div style="font-size: 24px; font-weight: bold; padding-bottom: 10px;">國泰永續高股息</div>
                <div style="padding-bottom: 5px;">成交價: 22.31</div>
                <div style="padding-bottom: 5px;">資產規模: 317,918.00百萬</div>
                <div style="padding-bottom: 20px;">成立日: 2020/07/10</div>
                <div class="link" :style="styles.second.value" @mouseover="ChangeColor('second')" @mouseleave="ReturnColor('second')"><a href="https://tw.stock.yahoo.com/quote/00878.TW" target="blank">相關連結-外部網站</a></div>
            </div>
        </div>
   
        <div class="third">
            <div class="forCenter">
                <div style="font-size: 30px; font-weight: bold; padding-bottom: 5px; padding-top: 10px;">0056</div>
                <div style="font-size: 24px; font-weight: bold; padding-bottom: 10px;">元大高股息</div>
                <div style="padding-bottom: 5px;">成交價: 37.98</div>
                <div style="padding-bottom: 5px;">資產規模: 313,300.00百萬</div>
                <div style="padding-bottom: 20px;">成立日: 2007/12/13</div>
                <div class="link" :style="styles.third.value" @mouseover="ChangeColor('third')" @mouseleave="ReturnColor('third')"><a href="https://tw.stock.yahoo.com/quote/0056.TW" target="blank">相關連結-外部網站</a></div>
            </div>
        </div>

        <div class="fourth">
            <div class="forCenter">
                <div style="font-size: 30px; font-weight: bold; padding-bottom: 5px; padding-top: 10px;">00679B</div>
                <div style="font-size: 24px; font-weight: bold; padding-bottom: 10px;">元大美債20年</div>
                <div style="padding-bottom: 5px;">成交價: 31.70</div>
                <div style="padding-bottom: 5px;">資產規模: 285,076.00百萬</div>
                <div style="padding-bottom: 20px;">成立日: 2017/01/11</div>
                <div class="link" :style="styles.fourth.value" @mouseover="ChangeColor('fourth')" @mouseleave="ReturnColor('fourth')"><a href="https://tw.stock.yahoo.com/quote/00679B.TW" target="blank">相關連結-外部網站</a></div>
            </div>
        </div>

        <div class="fifth">
            <div class="forCenter">
                <div style="font-size: 30px; font-weight: bold; padding-bottom: 5px; padding-top: 10px;">00929</div>
                <div style="font-size: 24px; font-weight: bold; padding-bottom: 10px;">復華台灣科技優息</div>
                <div style="padding-bottom: 5px;">成交價: 19.09</div>
                <div style="padding-bottom: 5px;">資產規模: 276,851.00百萬</div>
                <div style="padding-bottom: 20px;">成立日: 2023/06/01</div>
                <div class="link" :style="styles.fifth.value" @mouseover="ChangeColor('fifth')" @mouseleave="ReturnColor('fifth')"><a href="https://tw.stock.yahoo.com/quote/00929.TW" target="blank">相關連結-外部網站</a></div>
            </div>
        </div>

        <div class="sixth">
            <div class="forCenter">
                <div style="font-size: 30px; font-weight: bold; padding-bottom: 5px; padding-top: 10px;">00919</div>
                <div style="font-size: 24px; font-weight: bold; padding-bottom: 10px;">群益台灣精選高息</div>
                <div style="padding-bottom: 5px;">成交價: 24.09</div>
                <div style="padding-bottom: 5px;">資產規模: 260,741.00百萬</div>
                <div style="padding-bottom: 20px;">成立日: 2022/10/13</div>
                <div class="link" :style="styles.sixth.value" @mouseover="ChangeColor('sixth')" @mouseleave="ReturnColor('sixth')"><a href="https://tw.stock.yahoo.com/quote/00919.TW" target="blank">相關連結-外部網站</a></div>
            </div>
        </div>

        <div class="bonus">
            <div class="forCenter">
                <div style="font-size: 30px; font-weight: bold; padding-bottom: 5px; padding-top: 10px; color: red;">★00915★</div>
                <div style="font-size: 24px; font-weight: bold; padding-bottom: 10px; color: red">凱基優選高股息30</div>
                <div style="padding-bottom: 5px;">成交價: 26.33 -- 2024.09.20</div>
                <div style="padding-bottom: 5px;">資產規模: 27,153.00百萬</div>
                <div style="padding-bottom: 20px;">成立日: 2022/08/01</div>
                <div class="link" :style="styles.bonus.value" @mouseover="ChangeColor('bonus')" @mouseleave="ReturnColor('bonus')"><a href="https://tw.stock.yahoo.com/quote/00915.TW" target="blank">相關連結-外部網站</a></div>
            </div>
        </div>

    </div>
</template>

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
        width: 220px;
        height: 240px;
        border-right: 2px solid black;
    }

    .second{
        position: relative;
        top: -240px;
        left: 220px;
        width: 220px;
        height: 240px;
        border-right: 2px solid black;
    }

    .third{
        position: relative;
        top: -480px;
        left: 440px;
        width: 220px;
        height: 240px;
        border-right: 2px solid black;
    }

    .fourth{
        position: relative;
        top: -720px;
        left: 660px;
        width: 220px;
        height: 240px;
        border-right: 2px solid black;
    }

    .fifth{
        position: relative;
        top: -960px;
        left: 880px;
        width: 220px;
        height: 240px;
        border-right: 2px solid black;
    }

    .sixth{
        position: relative;
        top: -1200px;
        left: 1100px;
        width: 220px;
        height: 240px;
        border-right: 2px solid black;
    }

    .bonus{
        position: relative;
        top: -1447px;
        left: 1320px;
        width: 240px;
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
