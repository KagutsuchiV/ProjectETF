// //載入createAPP函式
// import { createApp } from "vue";
// //載入根組件
// import App from "./App.vue";

// //建立vue app物件
// const app=createApp(App);

// //掛載到HTML標籤底下
// app.mount("#app");

// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios' // 確保正確引入 axios

axios.defaults.withCredentials = true;

createApp(App)
  .use(router)
  .mount('#app')

