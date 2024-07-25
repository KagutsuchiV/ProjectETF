<!-- src/views/ApplyLogin.vue -->
<script setup>
import axios from 'axios';
import {ref} from 'vue';

// import { errorMessages } from 'vue/compiler-sfc';

  // 滑鼠事件
  let buttonA = ref("background-color: white");
  let ChangeColorA=function(){
    buttonA.value="background-color: #AAAAAA; font-weight: bold";
  };
  let ReturnColorA=function(){
    buttonA.value="background-color: white";
  };

  let back = ref("background-color: white");
  let ChangeColor=function(){
    back.value="background-color: #AAAAAA; font-weight: bold";
  };
  let ReturnColor=function(){
    back.value="background-color: white";
  };

  // 表單相關
  // 驗證碼
  const captcha = ref('');
  const usercaptcha = ref('');
  // const captchaError = ref('');

  const generateCaptcha = () => {
    const chars ='abcdefghijkmnpqrestuvwxyzABCDEFGHIJKLMNPQRSTUVWXYZ0123456789';
    let result='';
    for (let i=0; i<4; i++){
      result += chars.charAt(Math.floor(Math.random()*chars.length));
    }
    captcha.value=result;
  };
  // 初始驗證碼
  generateCaptcha();

  // 確認帳號與密碼
  const account=ref('');
  const password=ref('');
  const errorMessage=ref('');

  // 送出表單與驗證
  const submitForm = async () =>  {
    if(usercaptcha.value !== captcha.value){
      errorMessage.value = "驗證碼輸入錯誤，請重新輸入";
      generateCaptcha();
      return;
    }
    errorMessage.value="";

    try {
    const checkResponse = await axios.post("http://localhost:3000/checkAP", {
      account: account.value,
      password: password.value
    },{ withCredentials:true });

    if (checkResponse.data.exists === false) {
      errorMessage.value = "帳號不存在，請重新輸入";
      generateCaptcha();
    } else {
      if (!checkResponse.data.passwordCorrect) {
        errorMessage.value = "密碼輸入錯誤，請重新輸入";
        generateCaptcha();
      } else {
        // 驗證成功，導引至其他網站
        window.location.href = "http://localhost:5173/";
      }
    }
  } catch (error) {
    console.error(error);
  }
}

</script>

<template>
    <div class="package">
      <div class="title">ETF-ERA</div>
      <form @submit.prevent="submitForm">
          <div class="contentA">帳號:<input v-model="account" required placeholder="請輸入您的帳號" pattern="[a-zA-Z0-9]{8,16}" /></div>
          <div class="contentA">密碼:<input v-model="password" type="password" required placeholder="請輸入您的密碼" pattern="[a-zA-Z0-9]{8,16}" /></div>
          <div class="outer"><span class="contentB">驗證碼:<input v-model="usercaptcha" required /></span><span @click="generateCaptcha">{{ captcha }}</span></div>
          <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
          <!-- <div v-if="captchaError" class="error">{{ captchaError }}</div> -->
          <button type="submit" class="bottonA" :style="buttonA" @mouseover="ChangeColorA" @mouseleave="ReturnColorA">登入會員</button>
      </form>
    </div>
    <router-link to="/" class="back" :style="back" @mouseover="ChangeColor" @mouseleave="ReturnColor">回首頁</router-link>
  </template>
  
  <script>
  export default {
    name: 'LoginPage'
  }
</script>

<style scoped>
  .package{
     border-style: double;
     border-width: 5px;
     background-color: #dddddd;
     width: 500px;
     height: 410px;
     position: relative;
     left: 50%;
     transform: translateX(-50%);
     top: 100px;
  }
  .title{
      font-weight: bold;
      font-size: 40px;
      text-align: center;
      margin-top: 5px;
      margin-bottom: 30px;
  }
  .contentA{
    font-size: 24px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 30px;
  }
  .contentA>input{
    font-size: 16px;
    margin-left: 5px;
    height: 36px;
    border-radius: 10px;
  }
  .outer{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .contentB{
    font-size: 24px;
    font-weight: bold;
    /* margin: 30px; */
  }
  .contentB>input{
    font-size: 16px;
    margin-left: 5px;
    height: 36px;
    width: 100px;
    border-radius: 10px;
  }
  .bottonA{
    width: 200px;
    height: 50px;
    border-radius: 10px;
    font-size: 24px;
    font-weight: bold;
    position: relative;
    top:25px;
    left:165px;
    cursor: pointer; 
  }
  .back{
     position: relative;
     left: 48%;
     transform: translateX(-50%);
     top: 150px;
     color: inherit;
     text-decoration: none;
     font-size: 24px;
     border-radius: 10px;
     padding: 10px;
     border-style: solid;
  }
  .error{
    color: red;
    text-align: center;
    margin-top: 20px;
    font-weight: bold;
  }
</style>