<!-- src/views/ApplyLogin.vue -->
<template>
    <div class="package">
      <div class="title">ETF-ERA</div>
      <form  @submit.prevent="submitForm">
          <div class="contentA">設定暱稱 <input required placeholder="僅限定英文，2至10個字元" pattern="[A-Za-z]*" minlength="2" maxlength="10" /></div>
          <div class="contentA">設定帳號 <input placeholder="請輸入您的帳號" /></div>
          <div class="contentA">設定密碼 <input placeholder="請輸入您的密碼" /></div>
          <div class="contentA">確認密碼 <input placeholder="請再次輸入密碼" /></div>
          <button type="submit" class="bottonA">申請帳號</button>
      </form>
    </div>
    <div>
      <router-link to="/" class="back">回首頁</router-link>
    </div>
</template>
  
<script>
  export default {
    name: 'ApplyLoginPage'
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
  .back{
    position: relative;
    left: 48%;
    transform: translateX(-50%);
    top: 150px;
    color: inherit;
    text-decoration: none;
    font-size: 24px;
    background-color: #dddddd;
    border-radius: 10px;
    padding: 10px;
    border-style: solid;
  }
</style>
  