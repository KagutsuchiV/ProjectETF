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
  }catch(error){
    errorMessage.value="上傳失敗，請稍後再試";
  }
};

</script>

<template>
    <div>upload</div>
    <form @submit.prevent="uploadAvatar">
      <div><input type="file" @change="onFileChange" accept="image/png, image/jpeg,  image/jpg" /></div>
      <div v-if="errorMessage">{{ errorMessage }}</div>
      <button type="submit">上傳大頭貼</button>
    </form>
</template>
  
  <script>
  export default {
    name: 'MemberPage'
  }
</script>

<style scoped>

</style>