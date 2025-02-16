<template>
  <div class="typing-game">
    <h2>タイピングゲーム</h2>
    <button v-if="startFlg != true" @click="gameStart()">スタート</button>
    <!-- trueのときのみ問題分を表示 -->
    <div v-if="startFlg">
      <div class="timer" :data-time="remainingTime <= 10 ? 'low' : ''">
        残り時間: {{ remainingTime }}秒
      </div>
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
import { useTypingGame } from '@js/userTypingGame.js';
// const game = useTypingGame();
// console.log(game.test)

const {
  startFlg,
  current_question,
  typeBox,
  current_question_counts,
  question_counts,
  remainingTime,
  styleObject,
  gameStart,
  initialize
} = useTypingGame()

onMounted(() => {
  initialize()
})

</script>

<style scoped>
.gaugeWrapper {
  border: 1px solid #000;
}
.gauge {
  height: 12px;
  transition: all .3s ease;
}
.timer {
  font-size: 1.2em;
  font-weight: bold;
  margin: 10px 0;
  color: #333;
}
.timer[data-time="low"] {
  color: red;
  animation: blink 1s infinite;
}
@keyframes blink {
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
}
</style>