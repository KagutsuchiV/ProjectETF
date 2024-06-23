<!-- src/views/ApplyLogin.vue -->
<script setup>
  import {ref} from "vue";
  import axios from 'axios';
  import { useRouter } from "vue-router";

  const router = useRouter(); // 獲取vue router 實例

  // 滑鼠事件
  let back = ref("background-color: white");
  let ChangeColor=function(){
    back.value="background-color: #AAAAAA; font-weight: bold";
  };
  let ReturnColor=function(){
    back.value="background-color: white";
  };

  // 密碼確認與表單資料
  const password=ref("");
  const checkpassword=ref("");
  const errorMessage=ref("");

  const username=ref("");
  const account=ref("");

  const submitForm = async () => {
    if(password.value !== checkpassword.value){
      errorMessage.value="確認密碼與輸入密碼不相符，請重新輸入!";
      return;
    }
    errorMessage.value="";

    try {
      // 檢查帳號是否已存在
      const checkResponse = await axios.post("http://localhost:3000/checkAccount", {
        account: account.value
      });

      if (checkResponse.data.exists){
        errorMessage.value="帳號已存在，請創立新的帳號";
        return;
      }

      // 提交表單數據
      const response = await axios.post("http://localhost:3000/submit",{
        username: username.value,
        account: account.value,
        password: password.value,
      });
      
      console.log(response.data);
      alert("申請成功，網頁將自動導引至登入頁面");
      router.push('/Login'); // 導引至首頁或其他頁面
    } catch(error){
      console.error(error);
      errorMessage.value="提交失敗，請稍後再試";
    }
  };
</script>
<template>
    <div class="package">
      <div class="title">ETF-ERA</div>
      <form  @submit.prevent="submitForm">
          <div class="contentA">設定暱稱 <input v-model="username" required placeholder="僅限定英文，2至10個字元" pattern="[A-Za-z]*" minlength="2" maxlength="10" /></div>
          <div class="contentA">設定帳號 <input v-model="account" required placeholder="英文or數字，8至16個字元" /></div>
          <div class="contentA">設定密碼 <input v-model="password" type="password" required placeholder="英文or數字，8至16個字元" /></div>
          <div class="contentA">確認密碼 <input v-model="checkpassword" type="password" required placeholder="請再次輸入密碼" /></div>
          <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
          <button type="submit" class="bottonA">申請帳號</button>
      </form>
    </div>
    <div>
      <router-link to="/" class="back" :style="back" @mouseover="ChangeColor" @mouseleave="ReturnColor">回首頁</router-link>
    </div>
</template>
  
<script>
  export default {
    name: 'ApplyLoginPage',
  }
</script>
 <style scoped>
  .package{
      border-style: double;
      border-width: 5px;
      background-color: #dddddd;
      width: 500px;
      height: 500px;
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
  .bottonA{
    width: 200px;
    height: 50px;
    border-radius: 10px;
    font-size: 24px;
    font-weight: bold;
    position: relative;
    top:30px;
    left:165px;
  }
  .error{
    color: red;
    text-align: center;
    margin-top: 10px;
    font-weight: bold;
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
</style>
  