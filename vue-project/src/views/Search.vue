<script setup>
</script>

<template>
    <div class="search">
        <div class="hot">人氣ETF-走勢圖</div>
        <div>Search-依資產規模: 0050 0056 00878 00929 00919</div>
        <!-- https://tw.stock.yahoo.com/tw-etf/total-assets -->
        <div ref="chart" style="width: 100%; height: 400px;"></div>
    </div>
</template>

<style scoped>
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
