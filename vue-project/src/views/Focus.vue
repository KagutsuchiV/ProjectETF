<script setup>
    import {ref} from 'vue';
    let styles={
        B: ref("background-color: #dddddd"),
        C: ref("background-color: #dddddd"),
        D: ref("background-color: #dddddd"),
        E: ref("background-color: #dddddd"),
        F: ref("background-color: #dddddd"),
        G: ref("background-color: #dddddd"),
    };
    let ChangeColor=function(key){
        styles[key].value="background-color: #AAAAAA";
    };
    let ReturnColor=function(key){
        styles[key].value="background-color: #dddddd";
    };

</script>

<template>
    <div class="focus">
        <div class="A">ETF-ERA (Exchange Traded Fund-Explore & Record & Analysis)：探索、紀錄與分析: 指數股票型基金</div>
        <div @mouseover="ChangeColor('B')" @mouseleave="ReturnColor('B')" :style="styles.B.value">★ ETF-ERA是專為投資新手設計的網站。我們的宗旨是幫助新手投資者了解ETF的基本概念和投資知識，並協助他們記錄投資標的，進行簡單的統計分析。透過ETF-ERA，新手投資者能夠更加輕鬆地掌握投資技巧，提升投資信心。</div>
        <div @mouseover="ChangeColor('C')" @mouseleave="ReturnColor('C')" :style="styles.C.value">★ 何謂ETF: ETF為指數股票型基金，性質介於股票與基金之間，其是可一次購買多種股票，降低單一股票的波動風險，而各式ETF有著不同的選股理念，投資者可審慎觀察後進行投入。</div>
        <div @mouseover="ChangeColor('D')" @mouseleave="ReturnColor('D')" :style="styles.D.value">★ 市值型vs高股息: ETF的種類可簡單分為市值型與高股息，前者主要是追蹤大盤指數，以長期報酬來講通常較佳；後者則是多由高現金股利殖利率的公司組成，可藉由月配或季配股利實現現金流，進行多種操作。</div>
        <div @mouseover="ChangeColor('E')" @mouseleave="ReturnColor('E')" :style="styles.E.value">★ 單筆投入vs定期定額: ETF投入的方式可分為單筆投入與定期定額，前者是一次性將資金投入，報酬結果通常較優；後者則是可分次入場，適合身上無大量存款者，可降低買高的風險。</div>
        <div @mouseover="ChangeColor('F')" @mouseleave="ReturnColor('F')" :style="styles.F.value">★ 年化殖利率vs年化報酬率: 要如何得知自己的投資績效，可藉由計算年化殖利率與年化報酬率得知。前者的計算公式為一年「股利/股價」之總比；後者則為「( (本金+報酬) / 本金) ^ (1 / 投資年數) -1」。</div>
        <div @mouseover="ChangeColor('G')" @mouseleave="ReturnColor('G')" :style="styles.G.value">★ 未來展望，持續更新中，敬啟期待...</div>
    </div>
</template>

<style scoped>
    .focus{
        background-color: #dddddd;
        width:99%;
        height: 240px;
        position: relative;
        top: -260px;
        border-style: double;
        border-width: 5px;
        font-size: 20px;
        padding: 5px;
    }
    .A{
        font-size: 28px;
        font-weight: bold;
        border-bottom:solid;
    }
</style>