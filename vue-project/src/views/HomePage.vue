<!-- src/views/HomePage.vue -->
 <script setup>
    import FocusComp from "./Focus.vue";
    import SearchComp from "./Search.vue";
    import {ref} from "vue";

    let Apply = ref("background-color: white");
    let ChangeColor=function(){
      Apply.value="background-color: #AAAAAA; font-weight: bold";
    };
    let ReturnColor=function(){
      Apply.value="background-color: white";
    };

    let Login = ref("background-color: white");
    let ChangeColorB=function(){
      Login.value="background-color: #AAAAAA; font-weight: bold";
    };
    let ReturnColorB=function(){
      Login.value="background-color: white";
    };
</script>
<template>
    <div class="TOP">
      <h1 class="TOPin">ETF-ERA</h1>
    </div>

    <div class="AL">
      <div class="member">會員專區</div>
      <router-link to="/ApplyLogin" class="Apply" @mouseover="ChangeColor" @mouseleave="ReturnColor" :style="Apply">申請帳號</router-link><br/>
      <router-link to="/ApplyLogin" class="Login" @mouseover="ChangeColorB" @mouseleave="ReturnColorB" :style="Login">前往登入</router-link>
    </div>

    <SearchComp></SearchComp>
    <FocusComp></FocusComp>
</template>
  
<script>
  export default {
    name: 'HomePage',
  };

</script>
  
<style scoped>
  .TOP{
      background-color: #dddddd; 
      border-style: double;
      border-width: 5px;
      font-size: 25px;
      display: flex;
      align-items: center;
      margin-top: 0px;
      }
  .AL{
      background-color: #dddddd;
      width: 300px;
      height: 300px;
      position: relative;
      top: 20px;
      left: 83.5%;
      border-style: double;
      border-width: 5px;
  }
  .member{
      background-color: #444444;
      color: white;
      font-size: 32px;
      font-weight: bold;
      text-align: center;
      line-height: 60px;
      height: 60px;
  }
  .Apply{
    font-size: 32px;
    color: inherit;
    text-decoration: none;
    border-radius: 10px;
    border-style: solid;
    border-width: 2px;
    position: relative;
    top: 40px;
    left: 60px;
    padding: 20px;
  }
  .Login{
    font-size: 32px;
    color: inherit;
    text-decoration: none;
    border-radius: 10px;
    border-style: solid;
    border-width: 2px;
    position: relative;
    top: 100px;
    left: 60px;
    padding: 20px;
  }
</style>