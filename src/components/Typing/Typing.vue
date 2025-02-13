<template>
  <div class="typing-game">
    <h2>タイピングゲーム</h2>
    <button v-if="startFlg != true" @click="gameStart()">スタート</button>
    <!-- trueのときのみ問題分を表示 -->
    <div v-if="startFlg">
      <div class="question">{{ current_question }}</div>
      <div class="clear">Clear!</div>
      <input v-model="typeBox" type="text" class="">
      <div class="gauge"></div>
      <div>1/5</div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
const startFlg = ref(false); // 問題開始ステータス
const current_question = ref(''); // 現在のタイプ文字
const typeBox = ref('');

const questions = [
  'apple',
  'banana',
  'orange',
  'grape',
  'cherry',
  'pear',
  'pineapple'
];

onMounted(() => {
  current_question.value = questions[2]
})

watch(typeBox, (newValue) => {
  if (newValue === current_question.value) {
    alert("一致した!");
  }
});


const gameStart = () => {
  startFlg.value = true;
  console.log(startFlg.value);
}

</script>

<style scoped>
</style>