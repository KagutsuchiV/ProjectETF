<script setup>
</script>

<template>
    <div class="search">
        <div class="hot">人氣ETF-排行榜-2024.09.17</div>
        <div>0050/元大台灣50/178.75/資產規模395,428.00百萬/成立日2017/01/11</div>
        <div>00878/國泰永續高股息/22.31/資產規模317,918.00百萬/成立日2020/07/10</div>
        <div>0056/元大高股息/37.98/資產規模313,300.00百萬/成立日2007/12/13</div>
        <div>00679B/元大美債20年/31.70/資產規模285,076.00百萬/成立日2017/01/11</div>
        <div>00929/復華台灣科技優息/19.09/資產規模276,851.00百萬/成立日2023/06/01</div>
        <div>00919/群益台灣精選高息/24.09/資產規模260,741.00百萬/成立日2022/10/13</div>
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
</style>
