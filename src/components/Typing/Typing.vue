<template>
  <div class="typing-game">
    <h2>タイピングゲーム</h2>
    <button v-if="startFlg != true" @click="gameStart()">スタート</button>
    <!-- trueのときのみ問題分を表示 -->
    <div v-if="startFlg">
      <div class="question">apple</div>
      <div class="clear">Clear!</div>
      <input type="text" class="">
      <div class="gauge"></div>
      <div>1/5</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const startFlg = ref(false);

const gameStart = () => {
  startFlg.value = true;
  console.log(startFlg.value);
}

</script>

<style scoped>
</style>