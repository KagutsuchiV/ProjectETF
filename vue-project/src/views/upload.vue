<!-- src/views/ApplyLogin.vue -->
<script setup>
import axios from 'axios';
import {ref} from 'vue';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';

// 大頭貼
const selectedFile = ref(null);
const errorMessage = ref("");
// 選擇檔案觸發
const onFileChange =(event)=>{
  selectedFile.value=event.target.files[0];
};
//上傳大頭貼
const uploadAvatar =async()=>{
  if(!selectedFile.value){
    errorMessage.value="請選擇一個檔案";
    return;
  }
  const formData= new FormData();
  formData.append('avatar', selectedFile.value);

  try{
    const response = await axios.post("http://localhost:3000/ThirdServer/uploadAvatar", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    alert('上傳成功');

    // 成功上傳後自動重整頁面
    window.location.reload();
  }catch(error){
    errorMessage.value="上傳失敗，請稍後再試";
  }
};


</script>

<template>
  <div class="upload">
    <div class="uploadphoto">上傳大頭貼</div>
    <div class="forCenter">
      <form @submit.prevent="uploadAvatar">
      <div><input type="file" @change="onFileChange" accept="image/png, image/jpeg,  image/jpg"  class="file"/></div>
      <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
      <button type="submit" class="uploadfile">上傳</button>
    </form>
    </div>
    <div style="font-weight: bold; position: absolute; top: 275px; left: 5px">※ 檔案類型僅接受jpg/ jpeg/ png</div>
  </div>

</template>
  
  <script>
  export default {
    name: 'MemberPage'
  }
</script>

<style scoped>
  .upload{
    background-color: #dddddd;
    border-style: double;
    border-width: 5px;

    position: relative;
    top: -625px;
    left: 72%;
    height: 300px;
    width: 27.5%;    
  }

  .uploadphoto{
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

  .file{
    font-size: 24px;
    font-weight: bold;
    margin-top: 15%;
    position: relative;
    left: 15%;
  }

  .uploadfile{
    font-size: 24px;
    font-weight: bold;
    margin-top: 20%;
    position: relative;
    left: 30%;
    top:-30px;
    border-radius: 10px;
    cursor: pointer; 
    width: 150px;
  }

  .error{
    position: relative;
    left: 80px;
  }
</style>