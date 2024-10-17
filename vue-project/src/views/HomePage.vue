<!-- src/views/HomePage.vue -->
 <script setup>
    import axios from "axios";
    import FocusComp from "./Focus.vue";
    import SearchComp from "./Search.vue";
    import {onMounted, ref, onBeforeUnmount } from "vue";

    // let Apply = ref("background-color: white");
    // let ChangeColor=function(){
    //   Apply.value="background-color: #AAAAAA; font-weight: bold";
    // };
    // let ReturnColor=function(){
    //   Apply.value="background-color: white";
    // };

    // 設定滾動軸
    document.body.style.overflow = "hidden";

    let styles={
      Apply: ref("background-color: white"),
      Login: ref("background-color: white"),
      Logout: ref("background-color: white"),
      Center: ref("background-color: white"),
      ERA: ref("background-color: white")
    };

    let ChangeColor=function(key){
      styles[key].value="background-color: #AAAAAA; font-weight: bold";
    };

    let ReturnColor=function(key){
      styles[key].value="background-color: white";
    };


    // 用戶訊息
    const user = ref(null);

  

    // 獲取會話狀態
    const getSessionStatus =async() => {
      try{
        const response = await axios.get("http://localhost:3000/session-status", { withCredentials: true });
        if (response.data.message === 'Session exist'){
          user.value = response.data.user.username;
        }
      }catch(error){
        console.error(error);
      }
    };

    const logout = async () => {
      try {
        await axios.post("http://localhost:3000/logout", {}, { withCredentials: true });
        user.value = null;
        window.location.href = "http://localhost:5173/";
      } catch (error) {
        console.error(error);
      }
    };

    onMounted(() =>{
      getSessionStatus();
    });
</script>
<template>
    <div class="TOP">
      <h1 class="TOPin">ETF-ERA</h1>
    </div>

    <div class="AL">
      <div class="member">會員專區</div>
      <div class="CenterM">
        <router-link to="/ApplyLogin" v-if="!user" class="Apply" @mouseover="ChangeColor('Apply')" @mouseleave="ReturnColor('Apply')" :style="styles.Apply.value">申請帳號</router-link><br/>
        <router-link to="/Login" v-if="!user" class="Login" @mouseover="ChangeColor('Login')" @mouseleave="ReturnColor('Login')" :style="styles.Login.value">前往登入</router-link>
      
        <!-- 顯示用戶名與登出按鈕 -->
        <div v-if="user">
          <div class="welcome">歡迎 {{ user }}</div>
          <div>
          <router-link to="/member" class="center" @mouseover="ChangeColor('Center')" @mouseleave="ReturnColor('Center')" :style="styles.Center.value">會員中心</router-link><br/>
          <router-link to="/ERA" class="ERA" @mouseover="ChangeColor('ERA')" @mouseleave="ReturnColor('ERA')" :style="styles.ERA.value">ETF-ERA</router-link>
          </div>
          <button @click="logout" class="logout" @mouseover="ChangeColor('Logout')" @mouseleave="ReturnColor('Logout')" :style="styles.Logout.value">登出</button>
        </div>
      </div>
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
      width: 16%;
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
  .CenterM{
    display: flex;          /* 使用 Flexbox */
    flex-direction: column; /* 垂直排列元素 */
    align-items: center;    /* 水平置中 */
  }
  .Apply{
    font-size: 32px;
    color: inherit;
    text-decoration: none;
    border-radius: 10px;
    border-style: solid;
    border-width: 2px;
    position: relative;
    top: 20px;
    padding: 20px;
    z-index: 99;
  }
  .Login{
    font-size: 32px;
    color: inherit;
    text-decoration: none;
    border-radius: 10px;
    border-style: solid;
    border-width: 2px;
    position: relative;
    top: 30px;
    padding: 20px;
    z-index: 99;
  }
  .welcome{
    font-size: 20px;
    position: relative;
    top: -10px;
    margin-left: 10px;
  }
  .center
  {
    font-size: 28px;
    color: inherit;
    text-decoration: none;
    border-radius: 10px;
    border-style: solid;
    border-width: 2px;
    padding: 10px;
    position: relative;
    top: 10px
  }

  .ERA{
    font-size: 28px;
    color: inherit;
    text-decoration: none;
    border-radius: 10px;
    border-style: solid;
    border-width: 2px;
    padding: 10px;
    position: relative;
    top: 40px;
  }

  .ERA:hover{
    letter-spacing: -1px; /* 調整字母間距以彌補變粗的字體 */
  }

  .logout{
    font-size: 28px;
    color: inherit;
    text-decoration: none;
    border-radius: 10px;
    border-style: solid;
    border-width: 2px;
    cursor: pointer;
    position: relative;
    left: 25%;
    top: 60px;
  }
</style>