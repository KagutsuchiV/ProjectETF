<!-- src/views/ApplyLogin.vue -->
<script setup>
import axios from 'axios';
import {ref} from 'vue';
import uploadComp from './upload.vue';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';

const router =useRouter();

// 會員名
const nickname=ref("");

// 大頭貼Url
const avatarUrl =ref("");

// 取得 cookie 並解析暱稱
const getCookie = (nickname) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${nickname}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return '';
};

// 當元件載入時，從 cookie 中取得暱稱與大頭貼
onMounted(async () => {
  nickname.value = getCookie('nickname') || '訪客';  // 如果找不到暱稱，顯示「訪客」

  try{
    const response = await axios.get("http://localhost:3000/ThirdServer/getAvatar");
    if(response.status===200){
      avatarUrl.value=response.data.avatarUrl; //獲得大頭貼Url
      console.log("get photo");
    }
  }catch(error){
    console.error("無法獲得大頭貼", error);
    avatarUrl.value = "/uploads/user.png" //預設大頭貼
  }
});

// 設定滾動軸
document.body.style.overflow = "hidden";

// 變更密碼
const password=ref("");
const newpassword=ref("");
const surenewpassword=ref("");

const errorMessage=ref(" ");

const submitForm= async () => {
  if(newpassword.value != surenewpassword.value){
    errorMessage.value="確認密碼與輸入密碼不相符，請重新輸入!";
    return;
  }
  errorMessage.value=" ";
  if(password.value == newpassword.value){
    errorMessage.value="新密碼不可與原密碼相同，請重新輸入";
    return;
  }
  errorMessage.value=" ";

try{
  const response = await axios.post("http://localhost:3000/ThirdServer/changepassword",{
    password: password.value,
    newpassword: newpassword.value
  });

  if (response.status===200){
    alert("申請成功，帳號將自動登出，網頁將自動導引至登入頁面");

    // 清除與 session 相關的 cookie
    document.cookie = 'session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    
    router.push('Login');
  };
}catch(error){
  if(error.response && error.response.status===401){
    errorMessage.value=error.response.data.message;
  }else{
    errorMessage.value="變更密碼發生錯誤，請稍後再試";
  }
}
};

// 滑鼠事件
let back = ref("background-color: white");
let ChangeColor = function(){
  back.value = "background-color: #AAAAAA; font-weight: bold";
};

let ReturnColor = function(){
  back.value="background-color: white";
};

</script>

<template>
    <h1 class="TOP">會員中心</h1>

    <div class="self">
      <div class="information">個人資訊</div>
      <div class="forCenter">
        <div class="name">會員名: {{ nickname }}</div>
        <div class="photoArea">頭像區</div>
        <img :src="`/uploads/${avatarUrl}`" alt="User Avatar" style="width: 120px; height: 120px; border-radius: 50%;  border-style: solid;" />
      </div>
    </div>

    <div class="selfb">
      <div class="change">變更密碼</div>
      <div class="forCenter">
        <form @submit.prevent="submitForm">
        <div class="contentA">輸入原密碼: <input v-model="password" type="password" required placeholder="英文or數字，8至16個字元" pattern="[a-zA-Z0-9]{8,16}" /></div>
        <div class="contentA">輸入新密碼: <input v-model="newpassword" type="password" required placeholder="英文or數字，8至16個字元" pattern="[a-zA-Z0-9]{8,16}" /></div>
        <div class="contentA">確認新密碼: <input v-model="surenewpassword" type="password" required placeholder="英文or數字，8至16個字元" pattern="[a-zA-Z0-9]{8,16}" /></div>
        <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
        <button type="submit" class="buttonA">變更密碼</button>
      </form> 
      </div>   
    </div>


    <uploadComp></uploadComp>

    <router-link to="/" class="back" :style="back" @mouseover="ChangeColor" @mouseleave="ReturnColor">回首頁</router-link>
</template>
  
  <script>
  export default {
    name: 'MemberPage'
  }
</script>

<style scoped>
  .TOP{
      background-color: #dddddd; 
      border-style: double;
      border-width: 5px;
      font-size: 32px;
      display: flex;
      align-items: center;
      margin-top: 0px;
      align-items: center;  /* 垂直置中 */
      justify-content: center;  /* 水平置中 */
      padding: 5px;
      }

  .back{
     position: relative;
     left: 48%;
     transform: translateX(-50%);
     top: -600px;
     color: inherit;
     text-decoration: none;
     font-size: 24px;
     border-radius: 10px;
     padding: 10px;
     border-style: solid;
  }

  /* 寬度: 1919-1920 */
  @media (max-width: 1800px) {
    .back{
        position: relative !important;
        top: -600px !important;
        left: 48% !important;
    }
  }

  .self{
    background-color: #dddddd;
    width: 20%;
    height: 300px;
    position: relative;
    top: -5px;
    border-style: double;
    border-width: 5px;
  }

  .information{
    text-align: center;
    line-height: 40px;
    font-size: 24px;
    font-weight: bold;
    background-color: #444444;
    color: white;
    height: 40px;
  }

  .forCenter{
    display: flex;
    flex-direction: column;
    align-items: center;  /* 垂直置中 */
  }

  .name{
    font-size: 24px;
    font-weight: bold;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .photoArea{
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .selfb{
    background-color: #dddddd;
    border-style: double;
    border-width: 5px;

    position: relative;
    top: -315px;
    left: 21%;
    height: 300px;
    width: 50%;
  }

  .change{
    text-align: center;
    line-height: 40px;
    font-size: 24px;
    font-weight: bold;
    background-color: #444444;
    color: white;
    height: 40px;
  }

  .contentA{
    font-size: 24px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 15px;
  }

  .contentA>input{
    font-size: 16px;
    margin-left: 5px;
    height: 36px;
    border-radius: 10px;
  }

  .buttonA{
    width: 200px;
    height: 40px;
    border-radius: 10px;
    font-size: 24px;
    font-weight: bold;
    position: relative;
    left: 100px;
    cursor: pointer; 
  }

  .error{
    position: relative;
    left: 35px;
  }
</style>