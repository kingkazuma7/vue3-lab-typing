<template>
  <div class="typing-game">
    <h2>タイピングゲーム</h2>
    <button v-if="startFlg != true" @click="gameStart()">スタート</button>
    <!-- trueのときのみ問題分を表示 -->
    <div v-if="startFlg">
      <div class="question">{{ current_question }}</div>
      <div v-if="current_question_counts == question_counts" class="clear">Clear!</div>
      <input v-model="typeBox" type="text" class="">
      <div class="gaugeWrapper">
        <div :style="styleObject()" class="gauge"></div>
      </div>
      <div>{{ current_question_counts }}/{{ question_counts }}</div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
const startFlg = ref(false); // 問題開始ステータス
const current_question = ref(''); // 現在のタイプ文字
const typeBox = ref('');
const current_question_counts = ref(0); // 現在の質問値
const question_counts = ref(0); // 質問数
const styleObject = () => {
  const width = 20 * current_question_counts.value + "%";
  
  const color = (() => {
    if (current_question_counts.value >= 5) {
      return "#03a9f4";
    } else {
      return "orange";
    }
  })();

  return {
    'width': width,
    'background-color': color
  }
}

const questions = [
  'apple',
  'banana',
  'orange',
  'grape',
  'cherry'
];

onMounted(() => {
  current_question.value = questions[0];
  question_counts.value = questions.length;
})

// 入力値の判定
watch(typeBox, (newValue) => {
  if (newValue === current_question.value) {
    questions.splice(0, 1); // 配列の0番目を1つ削除
    current_question.value = questions[0]; // 再定義
    typeBox.value = "";
    current_question_counts.value++;
    // console.log(current_question.value);
  }
});


const gameStart = () => {
  startFlg.value = true;
  console.log(startFlg.value);
}

</script>

<style scoped>
.gaugeWrapper {
  border: 1px solid #000;
  .gauge {
    height: 12px;
  }
}
</style>