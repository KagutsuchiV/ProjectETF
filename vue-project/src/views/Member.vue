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


// 變更密碼
const password=ref("");
const newpassword=ref("");
const surenewpassword=ref("");

const errorMessage=ref("");

const submitForm= async () => {
  if(newpassword.value != surenewpassword.value){
    errorMessage.value="確認密碼與輸入密碼不相符，請重新輸入!";
    return;
  }
  errorMessage.value="";
  if(password.value == newpassword.value){
    errorMessage.value="新密碼不可與原密碼相同，請重新輸入";
    return;
  }
  errorMessage.value="";

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

</script>

<template>
    <div>member</div>
    <div>會員名: {{ nickname }}</div>
    <div>頭像區</div>
    <img :src="`/uploads/${avatarUrl}`" alt="User Avatar" style="width: 100px; height: 100px;" />
    <div>Change your password</div>
    <form @submit.prevent="submitForm">
      <div>輸入原密碼: <input v-model="password" type="password" required placeholder="英文or數字，8至16個字元" pattern="[a-zA-Z0-9]{8,16}" /></div>
      <div>輸入新密碼: <input v-model="newpassword" type="password" required placeholder="英文or數字，8至16個字元" pattern="[a-zA-Z0-9]{8,16}" /></div>
      <div>確認新密碼: <input v-model="surenewpassword" type="password" required placeholder="英文or數字，8至16個字元" pattern="[a-zA-Z0-9]{8,16}" /></div>
      <div v-if="errorMessage">{{ errorMessage }}</div>
      <button type="submit">變更密碼</button>
    </form>

    <uploadComp></uploadComp>
</template>
  
  <script>
  export default {
    name: 'MemberPage'
  }
</script>

<style scoped>

</style>