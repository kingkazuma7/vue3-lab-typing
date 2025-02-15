<template>
  <div class="typing-game">
    <h2>タイピングゲーム</h2>
    <button v-if="startFlg != true" @click="gameStart()">スタート</button>
    <!-- trueのときのみ問題分を表示 -->
    <div v-if="startFlg">
      <div>残り時間: {{ remainingTime }}</div>
      <div class="question">{{ current_question }}</div>
      <div v-if="current_question_counts == question_counts" class="clear">Clear!</div>
      <input id="typeForm" v-model="typeBox" type="text" class="">
      <div class="gaugeWrapper">
        <div :style="styleObject()" class="gauge"></div>
      </div>
      <div>{{ current_question_counts }}/{{ question_counts }}</div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch, nextTick, onUnmounted } from 'vue'  // Note: Imported nextTick from 'vue'
import { questions } from '@js/questions.js'; // Add this line to import 'questions.js' module

const startFlg = ref(false); // 問題開始ステータス
const current_question = ref(''); // 現在のタイプ文字
const typeBox = ref('');
const current_question_counts = ref(0); // 現在の質問値
const question_counts = ref(0); // 質問数

// タイマー関連の状態変数を追加
const timeLimit = ref(60)
const remainingTime = ref(timeLimit.value)
const timerInterval = ref(null)

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

// タイマーを開始する関数
const startTimer = () => {
  remainingTime.value = timeLimit.value
  clearInterval(timerInterval.value)
  timerInterval.value = setInterval(() => {
    remainingTime.value--;
    if(remainingTime.value <= 0) {
      gameOver()
    }
  }, 1000);
}

const gameOver = () => {
  clearInterval(timerInterval.value)  // Cancel the existing timer
  startFlg.value = false;
  alert('時間切れです!')
}

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

    // 全問題クリア時の処理
    if (current_question_counts.value === question_counts.value) {
      clearInterval(timerInterval.value);
      alert(`クリア！ 残り時間: ${remainingTime.value}秒`)
    }
  }
});

const gameStart = () => {
  startFlg.value = true;
  startTimer();
  nextTick(() => {
    document.getElementById('typeForm').focus();
  })
}
</script>

<style scoped>
.gaugeWrapper {
  border: 1px solid #000;
}
.gauge {
  height: 12px;
  transition: all .3s ease;
}
</style>